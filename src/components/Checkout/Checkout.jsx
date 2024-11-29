import React, { useEffect, useState } from "react";
import { faInr } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Cookies from "js-cookie";

import { Navigate, useNavigate } from "react-router-dom";

function Checkout() {
  const user = JSON.parse(sessionStorage.getItem("innocomm_auth")) || {};
  const [orderComfirming, setOrderConfirming] = useState(false);
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const [profileData, setProfileData] = useState({});
  const [profileLoading, setProfileLoading] = useState(true);
  const url = process.env.REACT_APP_ALLOWED_HOST;

  const getProfile = async () => {
    await axios({
      method: "get",
      url: `${url}/accounts/api/users/profile`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
      .then((response) => {
        // console.log(response)
        setProfileData(response.data);
        setProfileLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getProfile();
  }, []);

  if (!cart.length > 0) {
    return <Navigate to="/404" replace />;
  }

  const sum = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  const products = cart.map((data) => ({
    id: data.id,
    quantity: data.quantity,
  }));

  const placeOrder = async () => {
    setOrderConfirming(true);
    await axios({
      method: "post",
      url: `${url}/products/order/placeorder`,
      data: {
        total_amount: sum,
        products: products,
      },
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
      .then((response) => {
        // console.log(response);
        setOrderConfirming(false);
        alert("Order placed successfully");
        localStorage.setItem("cart", JSON.stringify([]));
        navigate("/myorders");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-screen h-screen border relative">
      {Object.keys(user).length > 0 ? (
        <div
          className="w-full mt-[56px] overflow-y-scroll relative"
          style={{ height: "calc(100% - 56px)" }}
        >
          {orderComfirming && (
            <div
              className="absolute w-11/12 h-5/6 bg-green-300 flex justify-center items-center "
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            >
              <h2 className="w-fit animate-pulse">Confirming Order</h2>
            </div>
          )}

          <h2 className="text-3xl font-medium m-4 text-center">Checkout</h2>
          <div className="flex flex-col bg-gray-100 m-4 p-4 rounded-lg">
            <h2 className="font-medium">Delivery Address</h2>
            {profileLoading ? (
              <>
                <h2>Loading....</h2>
              </>
            ) : Object.keys(profileData).length > 0 ? (
              <>
                <p className="mx-3">Address : {profileData.address}</p>
                <p className="mx-3">City - {profileData.city}</p>
                <p className="mx-3">State - {profileData.state}</p>
                <p className="mx-3">Pincode : {profileData.pin_code}</p>
              </>
            ) : (
              <p className="mx-3">Please add your delivery address</p>
            )}
          </div>
          <div className="flex flex-col bg-gray-100 m-4 p-4 rounded-lg">
            <h2 className="font-medium">Items</h2>
            {cart.length > 0 &&
              cart.map((item, index) => {
                return (
                  <div
                    className="bg-slate-100 h-[150px] w-full rounded-lg mb-2 flex justify-between items-center"
                    key={index}
                  >
                    <div className="p-2 flex items-center">
                      <img
                        className="rounded"
                        src={`${url}${item.main_image}`}
                        width={100}
                        height={100}
                        alt="ajcn"
                      />
                      <h2 className="text-black font-medium mx-4">
                        {item.name}
                        <br />
                        <span>
                          <FontAwesomeIcon icon={faInr} /> {item.price}
                        </span>
                      </h2>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="flex flex-col bg-gray-100 m-4 p-4 rounded-lg">
            <h2 className="font-medium">Payment method</h2>
            <p className="mx-3">
              Cash On Delivery {"("} Only Available {")"}
            </p>
          </div>
          <div className="flex justify-center m-4 p-4 rounded-lg">
            <button
              className="bg-yellow-400 rounded-3xl px-6 py-2 min-w-fit w-60 font-medium"
              onClick={() => {
                placeOrder();
              }}
            >
              Pay{" "}
              <span className="mx-2 font-bold">
                <FontAwesomeIcon icon={faInr} />
                {sum}
              </span>
            </button>
          </div>
        </div>
      ) : (
        <div
          className="absolute top-2/4 left-2/4 flex flex-col justify-center"
          style={{ transform: "translate(-50%,-50%)" }}
        >
          <h2>You are not logged in</h2>
          <button
            onClick={() => navigate("/login")}
            className="py-1 px-4 bg-yellow-300 rounded my-3"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
}

export default Checkout;
