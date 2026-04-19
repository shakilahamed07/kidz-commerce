"use client"
import join from "daisyui/utilities/join";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";

export default function CartButton({product}) {

    const session = useSession();
    const router = useRouter();
    const path = usePathname();

    const handelCart = ()=>{
        if(session.status == "authenticated"){
            alert(`${product._id}`)
            localStorage.setItem("card", JSON.stringify(product))
        }
        else{
            router.push(`/login?callbackUrl=${path}`)
        }
    }

  return (
    <div>
      <button onClick={handelCart} className="btn btn-primary">
        <FaShoppingCart /> Add to Cart
      </button>
    </div>
  );
}
