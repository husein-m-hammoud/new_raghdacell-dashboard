import React, { useState, useEffect } from "react";
import { useContextHook } from "../../Context/ContextOPen";


import "./SideBar.css";
import { NavLink } from "react-router-dom";
import logo from "../../images/IMG-20230702-WA0052-removebg.png";
import { useFETCH, useFilter, fileUrl } from "../../APIs/useMyAPI";


function SideBar() {
  const { openMenu, changeMenu, adminInfo, setAdminInfo } = useContextHook();
  console.log({adminInfo});
  const { data } = useFETCH(
    window.localStorage.getItem("token") ? `admin/admin-info` : ""
  ); 

  useEffect(() => {
    if (data?.data?.data) setAdminInfo(data?.data?.data);
  }, [data]);

  return (
    <div
      className={`${openMenu ? "w-[360px]" : " w-[0px]"} ${
        openMenu
          ? " max-sm:translate-x-0 max-sm:w-[100%] "
          : " max-sm:-translate-x-full"
      } sidebar h-[100vh] sideBar max-sm:h-[100%] sticky max-sm:fixed left-0 top-0 transition-all overflow-y-scroll  py-10 z-40`}
    >
      <div
        className={`max-sm:block hidden text-end mx-4 text-xl font-semibold  cursor-pointer`}
        onClick={changeMenu}
      >
        X
      </div>
      <div className="px-3">
        <ul className="text-black text-center font-semibold space-y-4">
          <li className="">
            <img src={logo} alt="" className="w-[200px] mx-auto site-logo" />
          </li>
          <li className=" ">
            <NavLink
              to={"/Orders"}
              className=" text-xl py-2 block   rounded-3xl  hover:text-Brown hover:bg-Pink hover:text-white "
            >
              Orders
            </NavLink>
          </li>
          <li className=" ">
            <NavLink
              to={"/Requests"}
              className=" text-xl py-2 block   rounded-3xl  hover:text-Brown hover:bg-Pink hover:text-white "
            >
              Charging
            </NavLink>
          </li>
          <li className=" ">
            <NavLink
              to={"/Message"}
              className=" text-xl py-2 block relative rounded-3xl  hover:text-Brown hover:bg-Pink hover:text-white "
            >
              {adminInfo && adminInfo.unreadCount && <span className="message_notification">{adminInfo.unreadCount}</span>}
              Message
            </NavLink>
          </li>
          <li className=" ">
            <NavLink
              to={"/Notifications"}
              className=" text-xl py-2 block   rounded-3xl  hover:text-Brown hover:bg-Pink hover:text-white "
            >
              Notifications
            </NavLink>
          </li>
          <li className=" ">
            <NavLink
              to={"/Home"}
              className=" text-xl py-2 block   rounded-3xl  hover:text-Brown hover:bg-Pink hover:text-white "
            >
              Home
            </NavLink>
          </li>
          <li className=" ">
            <NavLink
              to={"/Users"}
              className=" text-xl py-2 block   rounded-3xl  hover:text-Brown hover:bg-Pink hover:text-white "
            >
              Users
            </NavLink>
          </li>
          <li className=" ">
            <NavLink
              to={"/Contact-Us"}
              className=" text-xl py-2 block   rounded-3xl  hover:text-Brown hover:bg-Pink hover:text-white "
            >
              Contact Us
            </NavLink>
          </li>
      
          <li className=" ">
            <NavLink
              to={"/Products"}
              className=" text-xl  py-2 block   rounded-3xl  hover:text-Brown hover:bg-Pink hover:text-white "
            >
              Products
            </NavLink>
          </li>
   
          <li className=" ">
            <NavLink
              to={"/About-Us"}
              className=" text-xl py-2 block   rounded-3xl  hover:text-Brown hover:bg-Pink hover:text-white "
            >
              About Us
            </NavLink>
          </li>
          <li className=" ">
            <NavLink
              to={"/analytics"}
              className=" text-xl py-2 block   rounded-3xl  hover:text-Brown hover:bg-Pink hover:text-white "
            >
              Analytics
            </NavLink>
          </li>
          <li className=" ">
            <NavLink
              to={"/exchange-rate"}
              className=" text-xl py-2 block   rounded-3xl  hover:text-Brown hover:bg-Pink hover:text-white "
            >
              Exchange Rate
            </NavLink>
          </li>
          <li className=" ">
            <NavLink
              to={"/payment"}
              className=" text-xl py-2 block   rounded-3xl  hover:text-Brown hover:bg-Pink hover:text-white "
            >
              Payment
            </NavLink>
          </li>
        
          <li className=" ">
            <NavLink
              to={"/Codes"}
              className=" text-xl py-2 block   rounded-3xl  hover:text-Brown hover:bg-Pink hover:text-white "
            >
              Codes
            </NavLink>
          </li>

          <li className=" ">
            <NavLink
              to={"/Income?currency=USD"}
              className=" text-xl py-2 block   rounded-3xl  hover:text-Brown hover:bg-Pink hover:text-white "
            >
              Income
            </NavLink>
          </li>
     
          <li className="pb-10">
            <NavLink
              to={"/Change-Password"}
              className=" text-xl py-2 block   rounded-3xl  hover:text-Brown hover:bg-Pink hover:text-white "
            >
              Change Password
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
