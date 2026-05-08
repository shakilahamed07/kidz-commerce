"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Navlink from "./Navlink";
import AuthButtons from "./AuthButtons";

export default function UserButtonLogo() {
  const session = useSession() || {};
  const [toggle, setToggle] = useState(false);

//!    window.addEventListener("click", (e) => {
    
//     // if (e.target.closest(".user-menu"))
//     // setToggle(false);
//     console.log(e.target.className('user-button'))
//   });

  return (
    <div className="relative">
      <div id="user-button" onClick={() => setToggle(!toggle)} className="mr-5 cursor-pointer">
        {session?.data?.user?.image ? (
          <img
            src={session?.data?.user?.image}
            alt="User Image"
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <span className="bg-secondary font-bold text-white rounded-full px-3 py-2">
            {session?.data?.user?.name.slice(0, 1)}
          </span>
        )}
      </div>
      {toggle && (
        <div className="z-50  absolute right-10 bg-gray-50 shadow-2xl rounded-xl px-2 py-5 w-40 min-h-50">
          <ul className="space-y-4">
            <li className="hover:bg-gray-100 py-1 px-3 rounded-sm">
              <Navlink herf={"/profile"}>My Profile</Navlink>
            </li>
            <li className="hover:bg-gray-100 py-1 px-3 rounded-sm">
              <Navlink herf={"/my-orders"}> My Orders</Navlink>
            </li>
            <li className="hover:bg-gray-100 py-1 px-3 rounded-sm">
              <Navlink herf={"/settings"}> Settings</Navlink>
            </li>
            <li className="hover:bg-gray-100 py-1 px-3 rounded-sm">
              <Navlink herf={"/dashboard"}> Dashboard</Navlink>
            </li>
            <li >
               <AuthButtons/>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
