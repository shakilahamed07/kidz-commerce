// components/OrderDetailsModal.jsx
"use client";
import React from "react";
import Image from "next/image";
import { HiX, HiOutlineLocationMarker, HiOutlineUser, HiOutlineShoppingBag } from "react-icons/hi";

export default function OrderDetailsModal({ order, isOpen, onClose }) {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-lg font-black text-gray-800">Order Deep Details</h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">ID: {order._id}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-all shadow-sm text-gray-400 hover:text-error border border-transparent hover:border-gray-100">
            <HiX size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar space-y-8">
          
          {/* Delivery Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-primary">
                <HiOutlineUser size={18} />
                <h3 className="text-xs font-black uppercase tracking-tighter">Customer Info</h3>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-sm font-bold text-gray-800">{order.customerName}</p>
                <p className="text-xs text-gray-500 font-medium">{order.customerEmail}</p>
                <p className="text-xs text-gray-500 font-medium mt-1">{order.phoneNumber || "No Phone Provided"}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-primary">
                <HiOutlineLocationMarker size={18} />
                <h3 className="text-xs font-black uppercase tracking-tighter">Delivery Address</h3>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-sm font-semibold text-gray-700 leading-relaxed">
                  {order.deliveryAddress || "Address not specified"}
                </p>
              </div>
            </div>
          </div>

          {/* Items Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary border-b border-gray-100 pb-2">
              <HiOutlineShoppingBag size={18} />
              <h3 className="text-xs font-black uppercase tracking-tighter">Order Items ({order.items?.length})</h3>
            </div>
            
            <div className="grid gap-3">
              {order.items?.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 hover:bg-gray-50/50 transition-colors">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-gray-200 bg-white shrink-0">
                    <Image src={item.image} fill className="object-cover" alt={item.title} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-gray-800 truncate">{item.title}</h4>
                    <p className="text-[11px] text-gray-400 font-bold uppercase mt-0.5">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-gray-800">৳{(item.price * item.quantity).toLocaleString()}</p>
                    <p className="text-[10px] text-gray-400 font-medium">৳{item.price} each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50/30 flex justify-between items-center">
          <div>
            <p className="text-[10px] text-gray-400 font-black uppercase">Grand Total</p>
            <p className="text-xl font-black text-primary">৳{order.totalPrice.toLocaleString()}</p>
          </div>
          <button onClick={onClose} className="btn btn-sm px-6 rounded-lg font-bold">Close Details</button>
        </div>
      </div>
    </div>
  );
}