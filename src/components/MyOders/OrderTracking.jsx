"use client";
import React from "react";
import { HiOutlineCheckCircle, HiOutlineClock, HiOutlineTruck, HiOutlineHome } from "react-icons/hi";
import { MdOutlineLocalShipping, MdOutlineInventory2 } from "react-icons/md";

const OrderTracking = ({ order }) => {

  return (

    <div className="container mx-auto px-4 max-w-4xl py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black flex items-center gap-2">
            <MdOutlineLocalShipping className="text-primary" /> Track Order
          </h1>
          <p className="text-sm text-gray-500 mt-1">Order ID: <span className="font-mono font-bold text-black uppercase">#{order?._id?.slice(-8)}</span></p>
        </div>
        <button className="btn btn-outline btn-sm rounded-full">Download Invoice</button>
      </div>

      {/* Main Tracking Card */}
      <div className="card bg-base-100 border border-base-300 shadow-sm overflow-hidden">
        <div className="p-6 md:p-10">
          
          {/* Stepper UI */}
          <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-0">
            {/* Background Line (Desktop Only) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-base-200 -translate-y-1/2 z-0"></div>
            
            {order.steps.map((step, index) => (
              <div key={index} className="relative z-10 flex md:flex-col items-center gap-4 md:gap-2 w-full">
                {/* Icon Circle */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-md border-4 border-base-100 transition-all
                  ${step.status === 'completed' ? 'bg-primary text-white scale-110' : 
                    step.status === 'current' ? 'bg-white text-primary border-primary animate-pulse' : 
                    'bg-base-200 text-gray-400'}`}>
                        {/* steps = [
    { title: "Order Placed", date: "23 Apr, 2026", icon: <HiOutlineClock />, status: "completed" },
    { title: "Processing", date: "24 Apr, 2026", icon: <MdOutlineInventory2 />, status: "completed" },
    { title: "Shipped", date: "Expected 25 Apr", icon: <HiOutlineTruck />, status: "current" },
    { title: "Delivered", date: "Expected 27 Apr", icon: <HiOutlineHome />, status: "upcoming" },
  ]; */}
                  {step.status === 'completed' ? <HiOutlineCheckCircle /> : step.title == 'Processing' ? <MdOutlineInventory2 /> :  step.title == 'Shipped' ? <HiOutlineTruck /> :  step.title == 'Delivered' ? <HiOutlineHome /> : ''}
                </div>

                {/* Text Content */}
                <div className="text-left md:text-center">
                  <p className={`text-sm font-black uppercase tracking-tight ${step.status !== 'upcoming' ? 'text-black' : 'text-gray-400'}`}>
                    {step.title}
                  </p>
                  <p className="text-[10px] font-bold text-gray-400 italic leading-none mt-1">
                    {step.date}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Shipping Info & Summary Box */}
        <div className="bg-base-200/50 border-t border-base-300 p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xs font-black uppercase text-gray-400 tracking-widest mb-3">Shipping Address</h3>
            <p className="font-bold text-sm">{order?.customerName}</p>
            <p className="text-sm text-gray-600 mt-1 leading-relaxed">{order?.deliveryAddress}</p>
            <p className="text-sm font-bold mt-2">{order?.phoneNumber}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-base-300 shadow-sm">
             <h3 className="text-xs font-black uppercase text-gray-400 mb-3">Order Summary</h3>
             <div className="flex justify-between text-sm mb-2">
                <span>Items Total</span>
                <span className="font-bold">৳{order?.totalPrice}</span>
             </div>
             <div className="flex justify-between text-sm mb-2">
                <span>Delivery Fee</span>
                <span className="text-success font-bold text-xs italic uppercase">Free</span>
             </div>
             <div className="divider my-1"></div>
             <div className="flex justify-between text-lg font-black text-secondary">
                <span>Total Amount</span>
                <span>৳{order?.totalPrice}</span>
             </div>
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 italic">Expected delivery within 3-5 working days. <br /> For any queries, contact <a href="mailto:shakil200607@gmail.com" className="text-primary font-bold underline">Support Team</a></p>
      </div>
    </div>
  );
};

export default OrderTracking;