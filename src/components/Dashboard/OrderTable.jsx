"use client";
import Image from "next/image";
import React, { useState } from "react";
import { HiOutlineDotsVertical, HiOutlineEye } from "react-icons/hi";
import OrderDetailsModal from "./OrderDetailsModal";
import { orderCancelAdmin, updateOrderStatusAdmin } from "@/action/server/order";
import Swal from "sweetalert2";

export default function OrderTable({ order }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentStep = order.steps?.find((s) => s.status === "current") || order.steps?.[3];
  const currrentStepIndex = order.steps.findIndex(s => s.status === "current");

  // Cancel order
  const cancelOrder = async (id) => {
    const res = await orderCancelAdmin(id);
    return res.success
      ? Swal.fire("success", "Order canceled successfully", "success")
      : Swal.fire("error", "Failed to cancel order", "error");
  };

  // Update order status to next step
  const updateOrderStatus = async (id, currentIndex) => {
    console.log("Updating order status for ID:", id, "Current Step Index:", currentIndex);
    const res = await updateOrderStatusAdmin(id, currentIndex);
    console.log("Update response:", res.message);
    return res.success? Swal.fire("success", "Order status updated successfully", "success") : Swal.fire("error", "Failed to update order status", "error");
  };

  return (
    <>
      <tr className="hover:bg-gray-50/50 transition-all duration-200">
        {/* Customer Info */}
        <td className="py-5 px-6">
          <div className="flex flex-col gap-1">
            <span className="font-bold text-gray-800 text-sm">
              {order.customerName}
            </span>
            <span className="text-[11px] text-gray-400 font-semibold">
              {order.customerEmail}
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[9px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-black uppercase">
                ID: {order._id.toString()}
              </span>
            </div>
          </div>
        </td>

        {/* Product Preview */}
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-11 h-11 bg-gray-100 p-1 border border-gray-200">
                <Image
                  width={50}
                  height={50}
                  src={
                    order.items?.[0]?.image || "https://via.placeholder.com/150"
                  }
                  alt="product"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-700 truncate max-w-[140px]">
                {order.items?.[0]?.title || "Product Name"}
              </span>
              <span className="text-[10px] text-gray-400 font-black italic">
                {order.items?.length > 1
                  ? `+${order.items.length - 1} more items`
                  : `Qty: ${order.items?.[0]?.quantity || 1}`}
              </span>
            </div>
          </div>
        </td>

        {/* Pricing & Method */}
        <td>
          <div className="flex flex-col">
            <span className="text-sm font-black text-gray-800">
              ৳{order.totalPrice.toLocaleString()}
            </span>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
              {order.paymentMethod}
            </span>
          </div>
        </td>

        {/* Status Display */}
        <td>
          <div className="flex flex-col gap-1">
            <div
              className={`badge badge-sm font-bold border-none py-2.5 px-3 rounded-md
                ${currentStep?.title === "Order Placed" ? "bg-blue-100 text-blue-700" : ""}
                ${currentStep?.title === "Processing" ? "bg-amber-100 text-amber-700" : ""}
                ${currentStep?.title === "Shipped" ? "bg-indigo-100 text-indigo-700" : ""}
                ${currentStep?.title === "Delivered" ? "bg-emerald-100 text-emerald-700" : ""}
                ${order?.isCancel ? "bg-red-100 text-red-600" : ""}
              `}
            >
              {!order?.isCancel ? currentStep?.title || "Pending" : "Canceled"}
            </div>
            <span className="text-[10px] text-gray-400 font-medium ml-1">
              {!order?.isCancel ? currentStep?.date || "TBD" : ""}
            </span>
          </div>
        </td>

        {/* Action Buttons */}
        <td className="text-right px-6">
          <div className="flex justify-end gap-1">
            {/* View Button: Open Modal */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn btn-square btn-ghost btn-sm text-gray-400 hover:text-primary transition-colors"
            >
              <HiOutlineEye size={18} />
            </button>

            <div className="dropdown dropdown-left">
              <label
                tabIndex={0}
                className="btn btn-square btn-ghost btn-sm text-gray-400"
              >
                <HiOutlineDotsVertical size={18} />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow-xl bg-white rounded-lg w-40 border border-gray-100 mt-2"
              >
                <li onClick={() => updateOrderStatus(order._id, currrentStepIndex)}>
                  <a className="text-xs font-bold py-2">Update Status</a>
                </li>
                <li>
                  <a
                    href={`/dashboard/invoice/${order._id}`}
                    rel="noopener noreferrer"
                    className="text-xs font-bold py-2 flex items-center gap-2"
                  >
                    Print Invoice
                  </a>
                </li>
                {!order?.isCancel ? (
                  <li
                    onClick={() => cancelOrder(order._id)}
                    className="border-t border-gray-50"
                  >
                    <a className="text-xs font-bold py-2 text-error">
                      Cancel Order
                    </a>
                  </li>
                ) : (
                  <></>
                )}
              </ul>
            </div>
          </div>
        </td>
      </tr>

      <tr>
        <td>
          <OrderDetailsModal
            order={order}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </td>
      </tr>
    </>
  );
}
