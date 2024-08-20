import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { HiShoppingBag } from "react-icons/hi2";
import { NavBarModal } from "./NavBarModal";
import logo from "../../../public/images/logo-footer.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "../../routes/Login";

import Swal from "sweetalert2";
import { userActions } from "../../store/userInfoSlice";

const NavBar1 = () => {
  const bag = useSelector((store) => store.bag) || {
    totalQuantity: 0,
    data: [],
  };
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const userId = localStorage.getItem("token");

  console.log(bag);
  const userProfile = useSelector((store) => store.userProfile);

  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const logout = () => {
    localStorage.clear();
    dispatch(userActions.clearUser());
    // window.location.reload();
  };

  return (
    <div className="flex lg:px-10 md:pl-2 h-20 py-5 px-5 bg-white content-center items-center shadow-lg justify-between md:gap-10 fixed z-50 w-full">
      <div className="flex justify-start items-center gap-10 w-1/2">
        <Link to={"/dashboard"}>
          <img src={logo} alt="logo" className="w-28 h-16" />
        </Link>
      </div>

      <div className="w-1/2 flex justify-end items-center gap-5 font-semibold text-sm">
        <ul className="flex gap-5">
          {!userId ? (
            <li className="flex justify-end items-center">
              <Login name={"LOGIN"} />
            </li>
          ) : (
            <li className="relative flex items-center">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2"
              >
                <VscAccount className="text-3xl" />
                Profile
              </button>
              
            </li>
          )}
        </ul>
      </div>
      <div>
        <NavBarModal />
      </div>
    </div>
  );
};

export default NavBar1;
