import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MyOrderItems() {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = process.env.REACT_APP_ALLOWED_HOST;
  
  async function getOrders() {
    await axios({
      method: "get",
      url: `${url}/products/order_items/${id}`,
      withCredentials: true,
    })
      .then((response) => {
        console.log(response);
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div className="w-screen h-screen" style={{ border: "1px solid green" }}>
      <div
        className="mt-14 overflow-y-scroll relative"
        style={{ height: "calc(100% - 56px)" }}
      >
        <h2 className="font-medium text-1xl w-fit m-auto my-3">Order Items</h2>
        {loading ? (
          <div
            className="absolute top-2/4 left-2/4 flex flex-col justify-center"
            style={{ transform: "translate(-50%,-50%)" }}
          >
            <h2>Loading...</h2>
          </div>
        ) : (
          orders.length > 0 &&
          orders.map((data, index) => {
            return (
              <div
                key={index}
                className="w-11/12 border-2 m-auto py-6 px-3 rounded bg-gray-100  my-4"
              >
                <div className="w-full flex">
                  <h2 className="w-[30%] text-end ">Order :</h2>
                  <p className="w-[70%] font-medium ml-3">{data.order}</p>
                </div>
                <div className="w-full flex my-1">
                  <h2 className="w-[30%] text-end">product :</h2>
                  <p className="w-[70%] font-medium ml-3 text-orange-700">{data.product}</p>
                </div>
                <div className="w-full flex my-1">
                  <h2 className="w-[30%] text-end">quantity :</h2>
                  <p className="w-[70%] font-medium ml-3">{data.quantity}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default MyOrderItems;
