"use client";
import React, { useState, useEffect } from "react";
import Logo from "../logo";
import Link from "next/link";
import { IoMdCart } from "react-icons/io";
import Navlink from "../buttons/Navlink";
import AuthButtons from "../buttons/AuthButtons";
import UserButtonLogo from "../buttons/UserButtonLogo";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { getCart } from "@/action/server/cart"; // আপনার সার্ভার অ্যাকশন

export default function Navbar() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const pathname = usePathname();
  
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const data = await getCart();
        if (data) {
          setCartItems(data);
        }
        else{
          setCartItems([]);
        }
    };
    fetchCart();
  }, [user]);

  if (pathname.startsWith("/dashboard")) return null;

  const nav = (
    <>
      <li><Navlink herf={'/'}>Home</Navlink></li>
      <li><Navlink herf={'/products'}>Products</Navlink></li>
      {user && <li><Navlink herf={'/my-orders'}>My Orders</Navlink></li>}
      <li><Navlink herf={'/about'}>About</Navlink></li>
    </>
  );

  return (
    <div className="navbar bg-base-100 py-4 max-w-400 mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box w-40 py-5 px-3 shadow-xl z-50 space-y-3">
            {nav}
          </ul>
        </div>
        <Logo />
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {nav}
        </ul>
      </div>

      <div className="navbar-end">
        <Link className="flex items-center justify-center relative ml-2 mr-7" href={'/cart'}>
          <IoMdCart size={35} />
          {cartItems.length > 0 && (
            <span className="font-bold absolute -top-2 -right-2 bg-primary rounded-full px-2 text-white">
              {cartItems.length}
            </span>
          )}
        </Link>
        
        {status === "loading" ? (
           <span className="loading loading-spinner loading-sm"></span>
        ) : (
          user ? <UserButtonLogo /> : <AuthButtons />
        )}
      </div>
    </div>
  );
}