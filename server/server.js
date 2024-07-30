const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;
const mysql = require("mysql2");
require("dotenv").config();
const api = require("./server.api");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/dist")));
app.use("/api", router);

app.use("/images", express.static(path.join(__dirname, "/dist", "/images")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./dist", "/index.html"));
});

router.get("/products", api.products);

router.post("/signup", api.getUser, api.signup);

router.post("/login", api.login);

router.get("/logout", api.logout);

// cart routes
router.post("/addToCart", api.verifyToken, api.addToCart);

router.get("/getCart", api.verifyToken, api.getCart);

router.delete("/deleteCart/:id", api.verifyToken, api.deleteCart);

// Que routes
router.post("/addQue", api.addQue);

router.get("/getQue", api.verifyAdmin, api.getQue);

router.get("/getQueById/:id", api.verifyAdmin, api.getQueById);

router.delete("/deleteQue/:id", api.verifyAdmin, api.deleteQue);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
