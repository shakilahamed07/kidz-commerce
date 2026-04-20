"use client";

import React from "react";
import { HiOutlineTrash, HiPlus, HiMinus } from "react-icons/hi";
import Image from "next/image";
import Swal from "sweetalert2";
import { cartDeleteItem } from "@/action/server/cart";

export default function CartIItem({ item }) {
  const cartDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await cartDeleteItem(id);
        if (res.success) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Opps!",
            text: "Something wrong",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="card card-side bg-base-100 shadow-sm border border-base-300 hover:border-primary/30 transition-all duration-300">
      {/* Product Image */}
      <figure className="w-24 md:w-44 bg-base-200 relative shrink-0">
        <Image src={item.image} alt={item.title} width={100} height={100} />
      </figure>

      <div className="card-body p-4 md:p-6 justify-between">
        <div className="flex justify-between items-start gap-2">
          <div>
            <h2 className="card-title text-sm md:text-xl line-clamp-2 leading-tight uppercase font-bold">
              {item.title}
            </h2>
            <span className="text-[10px] md:text-xs text-gray-400 font-mono">
              Product ID: {item.productId}
            </span>
          </div>
          <button
            onClick={() => cartDelete(item._id)}
            className="btn btn-ghost btn-circle btn-sm text-error hover:bg-error/10"
          >
            <HiOutlineTrash size={22} />
          </button>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="text-xl md:text-2xl font-black text-primary">
            ৳{item.price.toLocaleString()}
          </div>

          {/* Quantity Controller */}
          <div className="join border border-base-300 shadow-sm">
            <button className="btn btn-sm join-item bg-base-100 hover:bg-base-200">
              <HiMinus />
            </button>
            <div className="btn btn-sm join-item no-animation bg-base-100 px-4 font-bold cursor-default">
              {item.quantity}
            </div>
            <button className="btn btn-sm join-item bg-base-100 hover:bg-base-200">
              <HiPlus />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
