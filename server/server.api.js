const jwt = require("jsonwebtoken");
const mysql = require("mysql2");
require("dotenv").config();

let connection;

function handleDisconnect() {
  connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });

  connection.connect((err) => {
    if (err) {
      console.log("Error connecting to database");
      setTimeout(handleDisconnect, 2000);
    } else {
      console.log("Connected to database");
    }
  });

  connection.on("error", (err) => {
    console.log("Database error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect();
    } else if (err.code === "ECONNRESET") {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

const cookie = {
  exists: function (cookie, name) {
    if (cookie.split(";").find((e) => e.includes(name))) return true;
    else return false;
  },
  get: function (cookie, name) {
    if (!cookie) return null;
    return cookie
      .split(";")
      .find((e) => e.includes(name))
      .split("=")[1];
  },
  check: function (cookie) {
    if (this.exists(cookie, "token") && !loggedIN) {
      setLoggedIN(true);
    } else if (!this.exists("token") && loggedIN) {
      setLoggedIN(false);
    }
  },
};

function callProcedure(query) {
  const promise = new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) reject(err);
      else {
        resolve(results);
      }
      setTimeout(() => {
        reject("Database timeout");
      }, 5000);
    });
  });
  return promise;
}

module.exports = {
  // Get products endpoint
  products: (req, res) => {
    const procedurePromise = callProcedure("call getAllProducts()");

    procedurePromise.then((results) => {
      const obj = {};
      results[0].forEach((product, index) => {
        if (!obj[product.categoryName]) {
          obj[product.categoryName] = [];
          obj[product.categoryName].push(product);
        } else {
          obj[product.categoryName].push(product);
        }
      });
      res.json(obj);
    });
    procedurePromise.catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    });
  },
  // Get user endpoint
  getUser: (req, res, next) => {
    const { userName, password } = req.body;
    const procedurePromise = callProcedure(`call getUser("${userName}")`);

    procedurePromise.then((results) => {
      if (results[0].length === 0) {
        next();
      } else {
        res.status(400).json({ message: "User already exists" });
      }
    });
    procedurePromise.catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
  },
  // Signup endpoint
  signup: (req, res) => {
    const { email, firstName, lastName, userName, password } = req.body;
    const procedurePromise = callProcedure(
      `call SignUp("${email}", "${firstName}", "${lastName}", "${userName}", "${password}")`
    );

    procedurePromise.then((results) => {
      res.status(201).json({ message: "Signed Up", redirect: "/login" });
    });
    procedurePromise.catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
  },
  // Login endpoint
  login: (req, res) => {
    const { username, password } = req.body;
    const procedurePromise = callProcedure(
      `call Login("${username}", "${password}")`
    );

    procedurePromise.then((results) => {
      if (results[0].length === 0) {
        res.status(400).json({ message: "Invalid Username or Password" });
      } else {
        const admin = results[0][0].admin;
        const token = jwt.sign(
          { username: username, password: password },
          process.env.SECRET_KEY,
          { expiresIn: "1h" }
        );
        res.cookie("token", token, { httpOnly: false, secure: true });
        res.status(200).json({
          message: "Logged In",
          redirect: `${admin ? "/admin" : "/home"}`,
        });
      }
    });
    procedurePromise.catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
  },
  // Logout endpoint
  logout: (req, res) => {
    const token = cookie.get(req.headers.cookie, "token");
    if (token) {
      res.clearCookie("token");
      res.status(200).json({ message: "Logged out" });
    } else {
      res.status(400).json({ message: "Already logged out" });
    }
  },
  // Verify admin middleware
  verifyAdmin: (req, res, next) => {
    const token = cookie.get(req.headers.cookie, "token");
    if (!token) {
      return res.redirect("/home");
    } else {
      try {
        jwt.verify(token, process.env.SECRET_KEY);
      } catch (err) {
        res.clearCookie("token");
        return res.status(400).json({ message: "Please login" });
      }

      const { username, password } = jwt.decode(token);
      connection.query(
        `call findAdmin('${username}', '${password}')`,
        (err, results) => {
          if (err) {
            console.log(err);
            res.redirect("/home");
          } else {
            if (results[0].length > 0) {
              next();
            } else {
              res.redirect("/home");
            }
          }
        }
      );
    }
  },
  // Verify token middleware
  verifyToken: (req, res, next) => {
    const token = cookie.get(req.headers.cookie, "token");
    if (!token) {
      return res.status(400).json({ message: "Please login" });
    } else {
      try {
        jwt.verify(token, process.env.SECRET_KEY);
        next();
      } catch (err) {
        res.clearCookie("token");
        return res.status(400).json({ message: "Please login" });
      }
    }
  },
  // Add Que endpoint
  addQue: (req, res) => {
    const { firstName, lastName, email, subject, comment } = req.body;
    connection.query(
      `call createContact('${firstName}', '${lastName}', '${email}', '${subject}', '${comment}')`,
      (err, results) => {
        if (err) {
          res.status(500).json({ message: "Internal server error" });
        } else {
          res.status(200).json({ message: "Sent" });
        }
      }
    );
  },
  // Delete Que endpoint
  deleteQue: (req, res) => {
    const id = req.params.id;
    connection.query(`call deleteContact('${id}')`, (err, results) => {
      if (err) {
        res.status(500).json({ message: "Internal server error" });
      } else {
        res.status(200).json({ message: "Deleted" });
      }
    });
  },
  // Get all Ques endpoint
  getQue: (req, res) => {
    connection.query(`call getContacts()`, (err, results) => {
      if (err) {
        res.status(500).send;
      } else {
        res.status(200).json({ message: "retrieved", results: results[0] });
      }
    });
  },
  // Get Que by ID endpoint
  getQueById: (req, res) => {
    const id = req.params.id;
    connection.query(`call getContactById('${id}')`, (err, results) => {
      if (err) {
        res.status(500).send;
      } else {
        res.status(200).send(results[0]);
      }
    });
  },

  // Add to Cart endpoint
  addToCart: (req, res) => {
    const { productID } = req.body;
    if (!productID) {
      return res.status(400).json({ message: "Invalid productID" });
    }
    const token = cookie.get(req.headers.cookie, "token");
    const { username, password } = jwt.decode(token);
    const Promise = callProcedure(`call GetUser('${username}')`);

    Promise.then((results) => {
      const userID = results[0][0].userID;
      connection.query(
        `call addToCart('${userID}', '${productID}')`,
        (err, results) => {
          if (err) {
            res.status(500).json({ message: "Internal server error" });
          } else {
            res.status(200).json({ message: "Added to cart" });
          }
        }
      );
    });
    Promise.catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
  },

  // Get Cart endpoint
  getCart: (req, res) => {
    const token = cookie.get(req.headers.cookie, "token");
    const { username, password } = jwt.decode(token);
    const Promise = callProcedure(`call GetUser('${username}')`);

    Promise.then((results) => {
      const userID = results[0][0].userID;
      connection.query(`call getCart('${userID}')`, (err, results) => {
        if (err) {
          res.status(500).json({ message: "Internal server error" });
        } else {
          res.status(200).json({ message: "Retrieved", results: results[0] });
        }
      });
    });
    Promise.catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
  },

  // Delete Cart endpoint
  deleteCart: (req, res) => {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Invalid productID" });
    }
    const token = cookie.get(req.headers.cookie, "token");
    const { username, password } = jwt.decode(token);
    const Promise = callProcedure(`call GetUser('${username}')`);

    Promise.then((results) => {
      const userID = results[0][0].userID;
      connection.query(
        `call deleteFromCart('${userID}','${id}')`,
        (err, results) => {
          if (err) {
            res.status(500).json({ message: "Internal server error" });
          } else {
            res.status(200).json({ message: "Deleted", results: results[0] });
          }
        }
      );
    });
  },
};
