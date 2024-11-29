import { faInr } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const url = process.env.REACT_APP_ALLOWED_HOST;
  const getCartFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  };
  const [cart, setCart] = useState(getCartFromLocalStorage());
  const [total, setTotal] = useState(0);
  
  const increase_quatity = (id) => {
    const item_index = cart.findIndex((item) => item.id === id);
    if (item_index !== -1) {
      const updatedCart = [...cart];
      updatedCart[item_index].quantity += 1;
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };
  const removeItem = (id) => {
    const item_index = cart.findIndex((item) => item.id === id);
    if (item_index !== -1) {
      const updatedCart = [...cart];
      if (updatedCart[item_index].quantity > 1) {
        updatedCart[item_index].quantity -= 1;
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      } else {
        updatedCart.splice(item_index, 1);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
    }
  };
  useEffect(() => {
    const sum = cart.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
    setTotal(sum);
  }, [cart]);
  return (
    <div className="w-screen h-screen border">
      <div
        className="w-full mt-[56px] flex justify-around"
        style={{ height: "calc(100% - 56px)" }}
      >
        <div className="w-[50%] h-full overflow-y-scroll p-3">
          <div className="p-3 flex justify-between">
            <h2 className="text-2xl font-medium">Shopping Cart</h2>
            <span className="font-medium">Quantity</span>
          </div>
          {cart.length > 0 ? (
            cart.map((data, index) => {
              return (
                <div
                  className="bg-slate-100 h-[150px] w-full rounded-lg mb-2 flex justify-between items-center"
                  key={index}
                >
                  <div className="p-2 flex items-center">
                    <img
                      className="rounded"
                      src={`${url}${data.main_image}`}
                      width={100}
                      height={100}
                      alt="ajcn"
                    />
                    <h2 className="text-black font-medium ml-1">
                      {data.name}
                      <br />
                      <span>
                        <FontAwesomeIcon icon={faInr} /> {data.price}
                      </span>
                    </h2>
                  </div>
                  <div className="p-2 flex border-yellow-400 border-2 rounded-3xl mx-1">
                    <button
                      className="mx-2 font-bold"
                      onClick={() => {
                        removeItem(data.id);
                      }}
                    >
                      -
                    </button>
                    <span className="mx-2 font-medium">{data.quantity}</span>
                    <button
                      className="mx-2 font-bold"
                      onClick={() => {
                        increase_quatity(data.id);
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-slate-100 h-[150px] w-full rounded-lg mb-2 flex flex-col justify-center items-center">
              <h2 className="w-fit font-medium">Cart is Empty</h2>
              <button className="px-6 py-1 bg-yellow-300 rounded-lg my-3" onClick={()=>{
                navigate("/")
              }}>Explore</button>
            </div>
          )}
        </div>
        {cart.length > 0 && (
          <div className="w-[30%]" style={{ height: "fit-content" }}>
            <div className="m-auto w-fit flex flex-col justify-center bg-gray-100 rounded-lg px-6 mt-6">
              <h2 className="my-4">
                Subtotal of {"("}
                {cart.length}
                {")"} items :{" "}
                <span className="font-bold">
                  <FontAwesomeIcon icon={faInr} />
                  {total}
                </span>
              </h2>
              <button
                className="rounded-3xl bg-yellow-300 px-6 py-2 m-auto my-4"
                onClick={() => {
                  navigate("/checkout");
                }}
              >
                Proceed to buy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
