import React, { useState } from "react";

export default function Store() {
  let loadedProductsJSON = {};
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  function Item({ index, first }) {
    return (
      <>
        <option
          className={`product${first ? " " + "on" : ""} px-4 py-1 rounded-t-md cursor-pointer`}
          id={index}
        >
          {index}
        </option>
      </>
    );
  }

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

    function addToCart(e) {
      const element = e.target;

      if (!cookie.check()) {
        alert("Please login to add to cart");
        element.innerHTML = "Failed";
        setTimeout(() => {
          element.innerHTML = "Add to cart";
          element.classList.remove("disabled");
        }, 500);
        return;
      }

      fetch("/api/addToCart", {
        method: "POST",
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
          element.innerHTML = "Added";
          setTimeout(() => {
            element.innerHTML = "Add to cart";
            element.classList.remove("disabled");
          }, 500);
          console.log(data);
        })
        .catch((err) => {
          element.innerHTML = "Failed";
          setTimeout(() => {
            element.innerHTML = "Add to cart";
            element.classList.remove("disabled");
          }, 500);
          console.error(err.message);
        });
    }

    return (
      <>
        <div className="flex flex-col tablet:flex-row border-[1px] mx-6 my-1 border-[#ccc] p-2">
          <img
            src={items.image}
            alt={items.productName}
            className="object-contain h-40 w-40 mr-2"
          />
          <div className="flex flex-col flex-grow justify-center mr-2 md:w-[300px] lg:w-[500px] *:mx-1 *:my-2">
            <h3 className="">{items.name}</h3>
            <ul>
              <li className="flex">
                <p className="text-gray-300 text-sm">Product #:</p>
                <p className="text-gray-500 text-sm ml-1">{items.productID}</p>
              </li>
              <li className="flex flex-col">
                <button
                  onClick={handleClick}
                  className="bg-mid-grayish-blue text-sm mt-1 text-white rounded-md max-w-fit px-2 py-0.5"
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
            <p className="text-xl text-center price">${items.price}</p>
            <button
              className="bg-mid-grayish-blue max-w-fit m-auto text-white ph-1.5 px-2 mt-0.5 rounded-md"
              onClick={(e) => {
                let element = e.target;
                if (element.classList.contains("disabled")) return;
                element.classList.add("disabled");
                element.style.animation = "shrink 0.25s forwards";
                element.innerHTML = "Adding...";
                setTimeout(() => {
                  element.style.animation = "";
                  addToCart(e);
                }, 250);
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      </>
    );
  }

  function Category({ index, value, first }) {
    return (
      <>
        <div
          key={index}
          className={`product-list ${index}${first ? "" : " hide"}`}
        >
          {value.map((items, i) => {
            return <AddItems key={i} items={items} />;
          })}
        </div>
      </>
    );
  }

  function AddProducts({ inBar }) {
    const [productJSON, setProductJSON] = useState({});

    function updateProducts() {
      if (Object.keys(productJSON).length !== 0) {
        return;
      }
      if (Object.keys(loadedProductsJSON).length !== 0) {
        setProductJSON(loadedProductsJSON);
        return;
      }
      fetch("/api/products")
        .then((res) => res.json())
        .then((data) => {
          loadedProductsJSON = data;
          setProductJSON(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    updateProducts();

    return (
      <>
        {Object.entries(productJSON).map(([index, value], i) => {
          return !inBar ? (
            <Category
              key={i}
              index={index}
              value={value}
              first={Object.keys(productJSON)[0] === index}
            />
          ) : (
            <Item
              key={i}
              index={index}
              first={Object.keys(productJSON)[0] === index}
            />
          );
        })}
      </>
    );
  }

  function CategorySelect(e) {
    // removes the on class from all
    document.querySelectorAll(".product").forEach((element) => {
      if (element.classList.contains("on")) {
        element.classList.remove("on");
      }
    });
    // adds the hide class to all
    document.querySelectorAll(".product-list").forEach((element) => {
      if (!element.classList.contains("hide")) {
        element.classList.add("hide");
      }
    });
    // adds the on class to item and also removes hide from the corresponding div
    document.querySelector(`.${e.target.value}`).classList.remove("hide");
    e.target.querySelector(":checked").classList.add("on");
  }

  function minMax(value, bool) {
    let Prices = document.querySelectorAll(".price");
    let findMainParent = (e) => {
      return e.parentElement.parentElement;
    };
    console.log(Prices.length);
    Prices.forEach((element) => {
      if (findMainParent(element).classList.contains("hidden")) {
        findMainParent(element).classList.remove("hidden");
      }
    });
    if (bool) {
      Prices.forEach((element) => {
        if (parseInt(element.innerHTML.replace("$", "")) < parseInt(value)) {
          findMainParent(element).classList.add("hidden");
        }
      });
    } else {
      Prices.forEach((element) => {
        if (parseInt(element.innerHTML.replace("$", "")) > parseInt(value)) {
          findMainParent(element).classList.add("hidden");
        }
      });
    }
  }

  return (
    <>
      {!loadedProductsJSON && (
        <div className="fixed w-full h-full bg-mid-grayish-blue">
          <p className="h-full text-6xl text-center pt-[50%]">Loading...</p>
        </div>
      )}
      <div className="flex flex-col justify-center w-full h-full tablet:flex-row">
        <div className="relative flex flex-col justify-center w-full h-full tablet:flex-row pt-10">
          <div id="bar" className="py-6 px-4 border-r-2 flex flex-col">
            <div className="flex flex-col border-[#ccc] border-t-[1px] border-b-[1px] p-2">
              <label className="text-black text-xl">Category:</label>
              <select
                onInput={CategorySelect}
                id="product"
                className="bg-mid-grayish-blue text-[#ccc] text-xl rounded-md cursor-pointer w-[200px] border-[1px] border-[#ccc]"
              >
                <AddProducts inBar={true} />
              </select>
            </div>
            <div className="flex flex-col border-[#ccc] border-b-[1px] p-2">
              <label className="text-black text-xl mt-2">Min:</label>
              <input
                id="min"
                type="number"
                className="bg-mid-grayish-blue text-[#ccc] text-sm rounded-md cursor-pointer w-[200px] border-[1px] border-[#ccc] p-2"
                onChange={(e) => {
                  minMax(e.target.value, true);
                }}
              />
              <label className="text-black text-xl mt-2">Max:</label>
              <input
                id="max"
                type="number"
                className="bg-mid-grayish-blue text-[#ccc] text-sm rounded-md cursor-pointer w-[200px] border-[1px] border-[#ccc] p-2"
                onChange={(e) => {
                  minMax(e.target.value, false);
                }}
              />
            </div>
          </div>
          <div id="store" className="flex-grow pb-40 pt-3">
            <AddProducts inBar={false} />
          </div>
        </div>
      </div>
    </>
  );
}
