"use client";
import { useSession } from "next-auth/react";
import React, { useState, useEffect, useRef } from "react";
import Navlink from "./Navlink";
import AuthButtons from "./AuthButtons";
import Image from "next/image";

export default function UserButtonLogo() {
  const session = useSession() || {};
  const [toggle, setToggle] = useState(false);
  const menuRef = useRef(null);
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    
    <div className="relative" ref={menuRef}>
      <div 
        onClick={() => setToggle(!toggle)} 
        className="mr-5 cursor-pointer"
      >
        {session?.data?.user?.image ? (
          <Image 
            alt="User Image"
            className="w-10 h-10 rounded-full border border-base-300" 
            src={session?.data?.user?.image} 
            width={40} 
            height={40} 
          />
        ) : (
          <span className="bg-secondary font-bold text-white rounded-full px-3 py-2">
            {session?.data?.user?.name?.slice(0, 1)}
          </span>
        )}
      </div>

      {toggle && (
        <div className="z-50 absolute right-0 mt-2 bg-white shadow-2xl rounded-xl px-2 py-5 w-48 border border-base-200">
          <ul className="space-y-2">
            <li className="hover:bg-gray-100 py-1 px-3 rounded-md transition-colors">
              <Navlink herf={"/profile"}>My Profile</Navlink>
            </li>
            <li className="hover:bg-gray-100 py-1 px-3 rounded-md transition-colors">
              <Navlink herf={"/my-orders"}>My Orders</Navlink>
            </li>
            <li className="hover:bg-gray-100 py-1 px-3 rounded-md transition-colors">
              <Navlink herf={"/settings"}>Settings</Navlink>
            </li>
            <li className="hover:bg-gray-100 py-1 px-3 rounded-md transition-colors">
              <Navlink herf={"/dashboard"}>Dashboard</Navlink>
            </li>
            <div className="divider my-1"></div>
            <li>
              <AuthButtons />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}