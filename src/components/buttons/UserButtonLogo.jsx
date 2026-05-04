"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Navlink from "./Navlink";
import AuthButtons from "./AuthButtons";

export default function UserButtonLogo() {
  const session = useSession() || {};
  const [toggle, setToggle] = useState(false);

  return (
    <div className="relative">
      <div onClick={() => setToggle(!toggle)} className="mr-5 cursor-pointer">
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
        <div className="z-50  absolute right-10 bg-gray-50 shadow-2xl rounded-xl p-5 w-40 min-h-50">
          <ul className="space-y-4">
            <li>
              <Navlink herf={"/my-orders"}> My Orders</Navlink>
            </li>
            <li>
              <Navlink herf={"/"}> Profile</Navlink>
            </li>
            <li>
              <Navlink herf={"/"}> Settings</Navlink>
            </li>
            <li>
               <AuthButtons/>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
