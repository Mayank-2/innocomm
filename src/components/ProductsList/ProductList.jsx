import React, { useEffect, useState } from "react";
import "./Productlist.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInr } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
function ProductList() {
  const navigate = useNavigate();
  const { category } = useParams();
  const [categoryProduct, setCategoryProduct] = useState([]);
  const url = process.env.REACT_APP_ALLOWED_HOST;

  const getCategoryProduct = async () => {
    await axios({
      method: "get",
      url: `${url}/products/category/${category}`,
    })
      .then((resposne) => {
        setCategoryProduct(resposne.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (category) {
      getCategoryProduct();
    }
  }, []);

  return (
    <div className="w-screen h-screen">
      <div
        className="w-full mt-[56px] overflow-y-scroll"
        style={{ height: "calc(100% - 56px)" }}
      >
        {categoryProduct.length > 0 ?
          categoryProduct.map((data, index) => {
            return (
              <div
                key={index}
                className="w-[90%] m-auto my-4 flex rounded-lg border border-slate-300"
                style={{ height: "300px" }}
              >
                <div className="product-list-image">
                  <img
                    src={`${url}${data.main_image}`}
                    alt="cjks"
                  />
                </div>
                <div className="w-[50%] p-3">
                  <h2
                    className="text-2xl font-semibold text-orange-700 underline cursor-pointer transition ease-in-out duration-500 hover:text-black text-clip overflow-hidden line-clamp-2"
                    onClick={() => {
                      navigate(`/product/${data.id}`);
                    }}
                  >
                    {data.name}
                  </h2>
                  <p className="product-list-description my-3"> {data.description}</p>
                  <span className="font-medium text-xl">
                    <FontAwesomeIcon icon={faInr} /> {data.price}
                  </span>
                </div>
              </div>
            );
          }):<div className="w-full h-full flex justify-center items-center">
            <h2>Loading.....</h2>
            </div>}
      </div>
    </div>
  );
}

export default ProductList;
