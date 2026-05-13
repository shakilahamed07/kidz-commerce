"use client";
import Image from "next/image";
import React, { useState } from "react";
import OrderDetailsModal from "./OrderDetailsModal";
import {
  updateOrderStatusAdmin,
} from "@/action/server/order";
import Swal from "sweetalert2";
import { MdDeleteForever, MdOutlineCancel } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { deleteProductAdmin } from "@/action/server/products";
import Link from "next/link";

export default function ProductTable({ product }) {

  // Delete Product
  const deleteProduct = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed){
        await deleteProductAdmin(id);
        Swal.fire("success", "Product deleted successfully", "success");
      }
    });
  };

  // Update order status to next step
  const updateOrderStatus = async (id, currentIndex) => {
    console.log(
      "Updating order status for ID:",
      id,
      "Current Step Index:",
      currentIndex,
    );
    const res = await updateOrderStatusAdmin(id, currentIndex);
    console.log("Update response:", res.message);
    return res.success
      ? Swal.fire("success", "Order status updated successfully", "success")
      : Swal.fire("error", "Failed to update order status", "error");
  };

  return (
    <>
      <tr className="hover:bg-gray-50/50 transition-all duration-200">
        <td>
          <Image
            className="rounded-xl"
            src={product?.image || "/placeholder.png"}
            alt="image"
            width={50}
            height={50}
          />
        </td>

        <td>
          <div className="flex flex-col gap-1">
            <span className="font-bold text-gray-800 text-sm">
              {product.title}
            </span>

            <div className="flex items-center gap-2 mt-1">
              <span className="text-[9px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-black uppercase">
                ID: {product._id}
              </span>
            </div>
          </div>
        </td>

        {/* Price */}
        <td>
          <p className=" font-bold">{product.price} Tk</p>
        </td>

        {/* Sold */}
        <td>
          <p
            className={`${product.sold > 0 ? "text-green-700" : "text-red-700"} text-center font-bold`}
          >
            {product.sold}
          </p>
        </td>

        {/* Action Buttons */}
        <td className="text-right px-6">
          <div className="flex justify-end items-center gap-3">
            <Link href={`/dashboard/update-product/${product._id}`} className="text-xs font-bold p-2 rounded-sm bg-gray-100 hover:bg-gray-200 cursor-pointer">
              <FiEdit size={18} />
            </Link>
            <a
              onClick={() => deleteProduct(product._id)}
              className="text-xs font-bold p-2 rounded-sm bg-gray-100 hover:bg-gray-200 cursor-pointer"
            >
              <MdDeleteForever className="text-red-600" size={18} />
            </a>
          </div>
        </td>
      </tr>
    </>
  );
}
