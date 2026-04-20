"use client"
import { handelAction } from "@/action/server/cart";
import join from "daisyui/utilities/join";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Swal from "sweetalert2";

export default function CartButton({product}) {

    const session = useSession();
    const router = useRouter();
    const path = usePathname();
    const [loading, setLoading] = useState(false);

    const handelCart = async ()=> {
      setLoading(true)
        if(session.status == "authenticated"){
          const result = await handelAction({product, inc: true});
          if(result.success){
            Swal.fire("Added to Cart", product.title, "success")
          }
          else{
            Swal.fire("Opps", "Something wrong", "error")
          }
          setLoading(false)
        }
        else{
          setLoading(false)
            router.push(`/login?callbackUrl=${path}`)
        }
    }

  return (
    <div>
      <button disabled={session.status == 'loading' || loading} onClick={handelCart} className="btn btn-primary">
        <FaShoppingCart /> Add to Cart
      </button>
    </div>
  );
}
