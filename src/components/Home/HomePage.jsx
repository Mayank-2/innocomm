import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../Footer/Footer";
import {
  faChevronLeft,
  faChevronRight,
  faInr,
} from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function HomePage() {
  const navigate = useNavigate();
  const upcomingCarousel = useRef(null);
  const [allUpcomingProduct, setAllUpcomingProduct] = useState([]);
  const [allcategory, setAllCategory] = useState([]);
  const [allproducts, setAllProducts] = useState([]);
  const url = process.env.REACT_APP_ALLOWED_HOST;
  const carouselRefs = useRef([]);

  const getAllUpcomingProduct = async () => {
    await axios({
      method: "get",
      url: `${url}/products/AllUpcomingProduct/`,
    })
      .then((response) => {
        // console.log(response.data);
        setAllUpcomingProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getAllCategory = async () => {
    await axios({
      method: "get",
      url: `${url}/products/allCategory/`,
    })
      .then((response) => {
        // console.log(response.data);
        setAllCategory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllProducts = async () => {
    await axios({
      method: "get",
      url: `${url}/products/allproducts/`,
    })
      .then((response) => {
        console.log(response);
        setAllProducts(response.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  useEffect(() => {
    getAllUpcomingProduct();
    getAllCategory();
    getAllProducts();
  }, []);

  const UpcomingscrollLeft = () => {
    if (upcomingCarousel.current) {
      upcomingCarousel.current.scrollLeft -= window.innerWidth;
    }
  };
  const UpcomingscrollRight = () => {
    if (upcomingCarousel.current) {
      upcomingCarousel.current.scrollLeft += window.innerWidth;
    }
  };
  
  

  const RefscrollLeft = (index) => {
    if (carouselRefs.current[index]) {
      carouselRefs.current[index].scrollLeft -= 300;
    }
  };

  const RefscrollRight = (index) => {
    if (carouselRefs.current[index]) {
      carouselRefs.current[index].scrollLeft += 300;
    }
  };

  return (
    <div
      className="w-full mt-14 overflow-y-scroll"
      style={{ height: "fit-content" }}
    >
      <div className="w-[98%] h-[40px] m-auto mt-1 category-carousel">
        <div className="category-carousel-list">
          {allcategory.length > 0 &&
            allcategory.map((data, index) => {
              return (
                <button
                  key={index}
                  onClick={() => {
                    navigate(`/products/${data.category}`);
                  }}
                >
                  {data.category}
                </button>
              );
            })}
        </div>
      </div>
      <div className="w-[98%] h-[400px] m-auto mt-2 bg-white rounded-lg relative">
        <button className="prev" onClick={UpcomingscrollLeft}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button className="next" onClick={UpcomingscrollRight}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
        <div className="upcoming-carousel-list" ref={upcomingCarousel}>
          <div className="upcoming-carousel">
            {allUpcomingProduct.length > 0 ? (
              allUpcomingProduct.map((data, index) => {
                return (
                  <div
                    key={index}
                    className="h-fit w-screen"
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      className="h-[400px] w-full object-cover"
                      src={`${url}${data.poster}`}
                      alt="imskk"
                    />
                  </div>
                );
              })
            ) : (
              <div className="animate-pulse flex items-center justify-center h-[400px] w-screen">
                <h2>Loading....</h2>
              </div>
            )}
          </div>
        </div>
      </div>
      {allcategory.length > 0 &&
        allcategory.map((category, index) => {
          return allproducts.length > 0 ? (
            allproducts.filter((data) => data.category === category.category)
              .length > 0 && (
              <div className="w-[98%] m-auto mt-[50px]" key={index}>
                <h2
                  className="font-bold m-auto text-slate-900"
                  style={{ fontSize: "calc(1vw + 1rem)" }}
                >
                  {category.heading}
                </h2>
                <div className="w-[100%] h-[400px] border-slate-400 rounded-lg main-carousel">
                  <button className="prev" onClick={RefscrollLeft}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </button>
                  <div ref={(el) => (carouselRefs.current[index] = el)} className="carousel-list">
                    <div className="carousel">
                      {allproducts
                        .filter((data) => data.category === category.category)
                        .map((data, index) => {
                          return (
                            <div
                              key={index}
                              onClick={() => {
                                navigate(`product/${data.id}`);
                              }}
                              style={{ cursor: "pointer" }}
                            >
                              <img
                                src={`${url}${data.main_image}`}
                                alt="elect"
                              />
                              <h2>{data.name}</h2>
                              <p>{data.description}</p>
                              <span>
                                <FontAwesomeIcon icon={faInr} /> {data.price}
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  <button className="next" onClick={RefscrollRight}>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                </div>
              </div>
            )
          ) : (
            <div className="animate-pulse flex items-center justify-center">
              Loading....
            </div>
          );
        })}

      <Footer />
    </div>
  );
}

export default HomePage;
