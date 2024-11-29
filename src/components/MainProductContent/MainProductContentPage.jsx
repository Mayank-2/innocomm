import React, { useEffect, useState } from "react";
import "../../assest/css/MainProductPage/MainProduct.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInr, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
function MainProductContentPage() {
  const { id } = useParams();
  const [productData, setProductData] = useState({});
  const [productImages, setProductImage] = useState([]);
  const [productImageUrl, setProductImageUrl] = useState("");
  const [addToCart, setAddToCart] = useState(true);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({});
  const user = JSON.parse(sessionStorage.getItem("innocomm_auth")) || {};
  const navigate = useNavigate();
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
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getProfile();
  }, []);

  const getProduct = async () => {
    await axios({
      method: "get",
      url: `${url}/products/product/${id}`,
    })
      .then((response) => {
        console.log(response);
        setProductData(response.data.product);
        setProductImage(response.data.images);
        setProductImageUrl(response.data.product.main_image);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const get_cart_item = (Id) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const item_index = cart.findIndex((item) => item.id === Id);
    if (item_index !== -1) {
      setAddToCart(false);
    }
  };
  useEffect(() => {
    getProduct();
    get_cart_item(id);
  }, []);

  const addItemToCart = (item) => {
    item.quantity = 1;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    setAddToCart(false);
  };
  return (
    <div className="w-screen h-screen" style={{ border: "1px solid green" }}>
      <div className="mt-14" style={{ height: "calc(100% - 56px)" }}>
        <div className="w-[98%] h-[100%] flex m-auto">
          {loading ? (
            <div className="w-full h-full flex items-center justify-center">
              <span className="">loading...</span>
            </div>
          ) : (
            <>
              <div className="w-[40%]">
                <img
                  src={`${url}${productImageUrl}`}
                  alt="cjks"
                  style={{ height: "calc(100% - 100px)", width: "100%" }}
                  className="object-contain rounded-lg"
                />
                <div className="w-full h-[100px] flex justify-around items-center">
                  <img
                    src={`${url}${productData.main_image}`}
                    alt="cjks"
                    style={{ width: "20%", height: "90%", cursor: "pointer" }}
                    className="object-contain rounded-lg"
                    onClick={() => {
                      setProductImageUrl(productData.main_image);
                    }}
                  />
                  {productImages &&
                    productImages.map((data, index) => {
                      return (
                        <img
                          src={`${url}${data.image}`}
                          alt="cjks"
                          key={index}
                          style={{
                            width: "20%",
                            height: "90%",
                            cursor: "pointer",
                          }}
                          className="object-contain rounded-lg"
                          onClick={() => {
                            setProductImageUrl(data.image);
                          }}
                        />
                      );
                    })}
                </div>
              </div>
              <div className="w-[60%] h-full overflow-y-scroll">
                <div className="w-[90%] m-auto mt-6 flex flex-col">
                  <h2 className="text-3xl font-semibold">{productData.name}</h2>
                  <span className="font-medium my-2">
                    <FontAwesomeIcon icon={faInr} />
                    {productData.price}
                  </span>
                  <span className="font-medium">Offer get 10% discount</span>
                </div>
                <div className="w-[90%] m-auto mt-2 product-ino-facilities">
                  <span className="font-medium my-2 ">
                    Cash/Pay on delivery
                  </span>
                  <span className="font-medium my-2 ">10 days Returnable</span>
                  <span className="font-medium my-2 ">Innocomm Delivered</span>
                  <span className="font-medium my-2 ">1 year Warranty</span>
                  <span className="font-medium my-2 ">Free Delivery</span>
                </div>
                <div className="w-[90%] m-auto mt-2 flex flex-col">
                  <button className="buy-now my-1" onClick={()=>{
                    addItemToCart(productData);
                    navigate("/checkout")
                  }}>Buy Now</button>
                  <button
                    className="buy-now my-1"
                    onClick={() => {
                      addItemToCart(productData);
                    }}
                    disabled={!addToCart}
                    style={!addToCart ? { cursor: "not-allowed" } : {}}
                  >
                    {addToCart ? "Add to cart" : "Added"}
                  </button>
                  {Object.keys(profileData).length > 0 ? (
                    <p className="my-2">
                      <FontAwesomeIcon icon={faLocationDot} /> Deliver to{" "}
                      {profileData.address}, {profileData.city},{" "}
                      {profileData.state}, {profileData.country}
                    </p>
                  ) : Object.keys(user).length > 0 ? (
                    <button className="bg-green-300 w-fit px-4 py-1 rounded-lg my-2" onClick={()=>{
                      navigate("/account")
                    }}>
                      Add Address
                    </button>
                  ) : (
                    <button className="bg-yellow-300 w-fit px-6 py-1 rounded-lg my-2"
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      Login
                    </button>
                  )}
                </div>
                <div className="w-[90%] m-auto mt-4 about-items-div">
                  <h2 className="text-2xl font-semibold">About this item</h2>
                  <ul>
                    {productData.description &&
                      productData.description.split("\n").map((data, index) => {
                        return (
                          <li className="my-3" key={index}>
                            {data}
                          </li>
                        );
                      })}
                  </ul>
                </div>
                <div className="w-[90%] m-auto my-4">
                  <h2 className="text-2xl font-semibold">Reviews</h2>
                  <p>No Reviews Yet</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainProductContentPage;
