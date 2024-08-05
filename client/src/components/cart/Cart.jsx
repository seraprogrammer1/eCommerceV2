import React, { useEffect, useState } from "react";

export default function Cart() {
  const [amount, setAmount] = useState(0);
  const [products, setProducts] = useState([]);

  // Component to add items to cart
  function AddItems({ items }) {
    const [show, setShow] = useState(false);
    function handleClick() {
      setShow(!show);
    }

    const cookie = {
      exists: function (name) {
        if (document.cookie.split(";").find((e) => e.includes(name)))
          return true;
        else return false;
      },
      check: function () {
        if (this.exists("token")) {
          return true;
        } else {
          return false;
        }
      },
    };

    function deleteFromCart() {
      if (!cookie.check()) {
        alert("Please login to add to cart");
        return;
      }
      const productPromise = new Promise((resolve, reject) => {
        fetch(`/api/deleteCart/${items.productID}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productID: items.productID,
          }),
        })
          .then((res) => {
            if (!res.ok) {
              return res.json().then((err) => {
                throw err;
              });
            }
            return res.json();
          })
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });

      productPromise.then((data) => {
        let currentAmount = 0;
        let results = data.results;
        console.log(data, results);
        results.forEach((e) => {
          currentAmount += parseInt(e.price);
        });
        setAmount(currentAmount);
        setProducts(results);
      });

      productPromise.catch((err) => {
        console.log(err);
        alert(err.message);
      });
    }
    return (
      <>
        <div className="flex flex-col tablet:flex-row border-[1px] mx-6 my-1 border-[#ccc] p-2">
          <img
            src={items.image}
            alt={items.name}
            className="object-contain h-40 w-40 mr-2"
          />
          <div className="flex flex-col flex-grow justify-center mr-2 md:w-[300px] lg:w-[500px] *:mx-1 *:my-2">
            <p className="">{items.name}</p>
            <ul>
              <li className="flex">
                <p className="text-gray-300 text-sm">Product #:</p>
                <p className="text-gray-500 text-sm ml-1">{items.productID}</p>
              </li>
              <li className="flex flex-col">
                <button
                  onClick={handleClick}
                  className="bg-dark-navy text-sm mt-1 text-white rounded-md max-w-fit px-2 py-0.5"
                >
                  {!show ? "VIEW DETAILS" : "HIDE DETAILS"}
                </button>
                <p className={`${!show ? "hidden" : ""}`}>
                  {items.description}
                </p>
              </li>
            </ul>
          </div>
          <div className="flex flex-col justify-center tablet:border-l-[1px] border-[#ccc] pl-2 w-full tablet:w-[7.5rem]">
            <p className="text-xl text-center">${items.price}</p>
            <button
              className="bg-dark-navy max-w-fit m-auto text-white ph-1.5 px-2 mt-0.5 rounded-md"
              onClick={() => {
                deleteFromCart();
              }}
            >
              Remove
            </button>
          </div>
        </div>
      </>
    );
  }

  // Component to display empty items in cart
  function EmptyItems() {
    return (
      <>
        <div className="flex flex-col tablet:flex-row border-[1px] mx-6 my-1 border-[#ccc] p-2">
          <img className="object-contain h-40 w-40 mr-2" />
          <div className="flex flex-col flex-grow justify-center mr-2 md:w-[300px] lg:w-[500px] *:mx-1 *:my-2">
            <p className=""></p>
            <ul>
              <li className="flex">
                <p className="text-gray-300 text-sm">Product #:</p>
                <p className="text-gray-500 text-sm ml-1"></p>
              </li>
              <li className="flex flex-col">
                <button className="bg-dark-navy text-sm mt-1 text-white rounded-md max-w-fit px-2 py-0.5"></button>
                <p></p>
              </li>
            </ul>
          </div>
          <div className="flex flex-col justify-center tablet:border-l-[1px] border-[#ccc] pl-2 w-full tablet:w-[7.5rem]">
            <p className="text-xl text-center"></p>
            <button
              className="bg-dark-navy max-w-fit m-auto text-white ph-1.5 px-2 mt-0.5 rounded-md invisible"
              onClick={() => {}}
            >
              Remove
            </button>
          </div>
        </div>
      </>
    );
  }

  // Component to update products in cart
  function updateProducts() {
    if (!products) return;

    const productPromise = new Promise((resolve, reject) => {
      fetch("/api/getCart")
        .then((res) => {
          if (!res.ok) {
            return res.json().then((err) => {
              throw err;
            });
          }
          return res.json();
        })
        .then((data) => {
          resolve(data.results);
        })
        .catch((err) => {
          reject(err);
        });
    });

    productPromise.then((data) => {
      let currentAmount = 0;
      data.forEach((e) => {
        currentAmount += parseInt(e.price);
      });
      setAmount(currentAmount);
      setProducts(data);
    });

    productPromise.catch((err) => {
      console.log(err);
      alert(err.message);
    });
  }

  // Component to add products to cart
  function AddProducts({ loadProducts }) {
    return (
      <>
        {loadProducts.map((e, i) => {
          return <AddItems key={i} items={e} />;
        })}
      </>
    );
  }

  useEffect(() => {
    updateProducts();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center tablet:flex-row h-full">
        <div className="flex flex-col justify-center bg-light-grayish-blue">
          <div id="store" className="my-10 bg-white w-full">
            <div className="flex flex-col max-h-[800px] overflow-auto min-w-full">
              <h1 className="sticky top-0 text-6xl text-center bg-mid-grayish-blue">
                {products.length === 0 ? "Cart is empty" : "Cart"}
              </h1>
              {products.length === 0 &&
                Array.from({ length: 3 }).map((_, i) => <EmptyItems key={i} />)}
              <AddProducts loadProducts={products} />
              <h2 className="sticky bottom-0 text-2xl w-full text-end pt-2 pb-2 pr-12 bg-mid-grayish-blue">
                Total: ${amount}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
