import { faInr } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function MyOrders() {
  const user = JSON.parse(sessionStorage.getItem("innocomm_auth")) || {};
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const url = process.env.REACT_APP_ALLOWED_HOST;
  async function getOrders(id) {
    await axios({
      method: "get",
      url: `${url}/products/orders/`,
      withCredentials: true,
    })
      .then((response) => {
        // console.log(response);
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        // console.log(error);
      });
  }
  useEffect(() => {
    if (Object.keys(user).length > 0) {
      getOrders();
    }
  }, []);

  const handleOrderCancelation = async (order_id) => {
    await axios({
      method: "delete",
      url: `${url}/products/order/cancel/${order_id}`,
      withCredentials: true,
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        // console.log(response);
        getOrders();
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  return (
    <div className="w-screen h-screen" style={{ border: "1px solid green" }}>
      <div
        className="mt-14 overflow-y-scroll relative"
        style={{ height: "calc(100% - 56px)" }}
      >
        <h2 className="font-medium text-1xl w-fit m-auto my-3">Your Orders</h2>
        {Object.keys(user).length > 0 ? (
          loading ? (
            <div
              className="absolute top-2/4 left-2/4 flex flex-col justify-center"
              style={{ transform: "translate(-50%,-50%)" }}
            >
              <h2>Loading...</h2>
            </div>
          ) : orders.length > 0 ? (
            orders.map((data, index) => {
              return (
                <div
                  key={index}
                  className="w-11/12 border-2 m-auto py-6 px-3 rounded bg-gray-100  my-4 "
                >
                  <div
                    className="w-full flex cursor-pointer"
                    onClick={() => {
                      navigate(`/myorders/items/${data.id}`);
                    }}
                  >
                    <h2 className="w-[30%] text-end ">Order id :</h2>
                    <p className="w-[70%] font-medium ml-3 text-orange-600 underline hover:text-blue-500 transition ease-in-out duration-500">
                      {data.id}
                    </p>
                  </div>
                  <div className="w-full flex my-1">
                    <h2 className="w-[30%] text-end">Amount :</h2>
                    <p className="w-[70%] font-medium ml-3">
                      {" "}
                      <FontAwesomeIcon icon={faInr} />
                      {data.total_amount}
                    </p>
                  </div>
                  <div className="w-full flex my-1">
                    <h2 className="w-[30%] text-end">Date :</h2>
                    <p className="w-[70%] font-medium ml-3">
                      {data.created_at}
                    </p>
                  </div>
                  <div className="w-full flex my-1">
                    <h2 className="w-[30%] text-end">Status :</h2>
                    <p
                      className="w-[70%] font-medium ml-3"
                      style={
                        data.status === "confirmed"
                          ? { color: "green" }
                          : { color: "red" }
                      }
                    >
                      {data.status}
                    </p>
                  </div>
                  {data.status !== "cancelled" && (
                    <div className="w-full flex my-1 justify-center items-center">
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-2xl hover:bg-red-700 transition ease-in-out duration-500"
                        onClick={() => {
                          handleOrderCancelation(data.id);
                        }}
                      >
                        Cancel Order
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div
              className="absolute top-2/4 left-2/4 flex flex-col justify-center"
              style={{ transform: "translate(-50%,-50%)" }}
            >
              <h2>You haven't ordered anything yet</h2>
              <button
                onClick={() => navigate("/")}
                className="py-1 px-4 bg-yellow-300 rounded my-3"
              >
                Explore
              </button>
            </div>
          )
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
    </div>
  );
}

export default MyOrders;
