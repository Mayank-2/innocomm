import {
  faShoppingBag,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("innocomm_auth"));
  return (
    <nav className="w-full h-14 flex flex-row justify-between items-center border-black bg-green-100 px-10 fixed top-0 left-0 z-10">
      <div className="w-[fit-content] px-2">
        <h2
          onClick={() => {
            navigate("/");
          }}
          style={{ cursor: "pointer" }}
        >
          InnoEcomm
        </h2>
      </div>
      {/* <div className="w-[45%] border-black">
        <input
          type="search"
          placeholder="Search Items"
          className="w-full outline-0 h-[40px] rounded-md px-2"
        />
      </div> */}
      <ul className="w-fit h-[fit-content] flex felx-row justify-between">
        
        <li className="mx-3"
          onClick={() => {
            user ?
            navigate("/account") : navigate("login/");
          }}
        >
          {user ? (
            <span className="cursor-pointer">
              <FontAwesomeIcon icon={faUser} /> {user.name}
            </span>
          ) : (
            <span className="cursor-pointer">
              <FontAwesomeIcon icon={faUser} /> Login
            </span>
          )}
        </li>
        <li onClick={()=>{
          navigate("/myorders")
        }}  className="mx-2">
          <span className="cursor-pointer">
            <FontAwesomeIcon icon={faShoppingBag} /> Orders
          </span>
        </li>
        <li onClick={()=>{
          navigate("/cart")
        }} className="mx-2">
          <span className="cursor-pointer">
            <FontAwesomeIcon icon={faShoppingCart} /> Cart
          </span>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
