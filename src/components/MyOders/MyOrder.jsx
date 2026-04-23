"use client";
import React from "react";
import {
  HiOutlineDotsVertical,
  HiOutlineCalendar,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import {
  MdOutlineShoppingBag,
  MdOutlineLocalShipping,
  MdOutlineReceipt,
} from "react-icons/md";

const MyOrder = ({ orders }) => {
  return (
    <div className="container mx-auto px-4 max-w-6xl">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-black flex items-center gap-3">
            <MdOutlineShoppingBag className="text-primary" /> My Orders
          </h1>
          <p className="text-sm text-gray-500 mt-2 font-medium">
            Welcome back,{" "}
            <span className="text-primary font-bold">
              {orders[0]?.customerName}
            </span>
          </p>
        </div>
        <div className="stats shadow-sm border border-base-300 bg-base-100">
          <div className="stat py-2 px-6">
            <div className="stat-title text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Orders Placed
            </div>
            <div className="stat-value text-primary text-2xl">
              {orders.length}
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order._id}
            className="card bg-base-100 shadow-sm border border-base-300 overflow-hidden"
          >
            {/* Order Header Info */}
            <div className="bg-base-200/50 p-4 md:p-6 border-b border-base-200 flex flex-wrap justify-between items-center gap-4">
              <div className="flex flex-wrap gap-4 md:gap-10">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                    Order Placed
                  </p>
                  <p className="text-sm font-bold flex items-center gap-1">
                    <HiOutlineCalendar />{" "}
                    {new Date(order.oderAt).toLocaleDateString("en-GB")}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                    Order ID
                  </p>
                  <p className="text-sm font-mono font-bold uppercase">
                    #{order._id.slice(-8)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                    Ship To
                  </p>
                  <div className="dropdown dropdown-hover">
                    <label
                      tabIndex={0}
                      className="text-sm font-bold text-primary cursor-pointer underline decoration-dotted"
                    >
                      {order.customerName}
                    </label>
                    <div
                      tabIndex={0}
                      className="dropdown-content z-[1] card card-compact w-64 p-4 shadow-xl bg-base-100 border border-base-200"
                    >
                      <p className="font-bold flex items-center gap-2">
                        <HiOutlineLocationMarker className="text-error" />{" "}
                        Shipping Address
                      </p>
                      <p className="text-xs mt-2 text-gray-600 leading-relaxed">
                        {order.deliveryAddress}
                      </p>
                      <p className="text-xs mt-1 font-bold">
                        {order.phoneNumber}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter text-right">
                  Total Amount
                </p>
                <p className="text-xl font-black text-secondary">
                  ৳{order.totalPrice.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="md:flex justify-between items-start">
              {/* Items List inside Order */}
              <div className="p-4 md:p-6 space-y-6">
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                  >
                    <div className="flex gap-4 items-center">
                      <div className="avatar">
                        <div className="mask mask-squircle w-20 h-20 md:w-24 md:h-24 bg-base-200 border border-base-200 shadow-inner">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-md md:text-lg font-bold leading-tight uppercase hover:text-primary transition-colors cursor-pointer">
                          {item.title}
                        </h4>
                        <p className="text-xs text-gray-400 mt-1 font-mono italic">
                          ProductID: {item.productId.slice(-10)}
                        </p>
                        <div className="flex items-center gap-2 mt-3">
                          <span className="badge badge-outline badge-sm font-bold opacity-70">
                            Price: ৳{item.price}
                          </span>
                          <span className="badge badge-outline badge-sm font-bold opacity-70">
                            Qty: {item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex md:flex-col gap-3 w-full md:w-auto mx-5 mt-8 md:pr-0 pr-10">
                <button className="btn btn-primary btn-sm flex-1 md:w-40  gap-2 rounded-lg py-2">
                  <MdOutlineLocalShipping /> Track Order
                </button>
                <button className="btn btn-outline btn-sm flex-1 md:w-40  gap-2 rounded-lg py-2">
                  <MdOutlineReceipt /> View Receipt
                </button>
              </div>
            </div>

            {/* Order Footer - Status */}
            <div className="bg-base-200/20 p-4 border-t border-base-200 flex justify-between items-center px-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                <span className="text-[11px] font-black uppercase text-success tracking-widest">
                  Confirmed (Cash on Delivery)
                </span>
              </div>
              <button className="btn btn-ghost btn-circle btn-sm">
                <HiOutlineDotsVertical size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Orders Message */}
      {orders.length === 0 && (
        <div className="hero min-h-[400px] bg-base-100 rounded-3xl border-2 border-dashed border-base-300 mt-10">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <MdOutlineShoppingBag
                size={80}
                className="mx-auto text-base-300 mb-4"
              />
              <h1 className="text-2xl font-bold italic">No orders yet!</h1>
              <p className="py-4 text-gray-500 italic uppercase text-xs font-bold tracking-widest">
                Start exploring our premium collection today.
              </p>
              <button className="btn btn-primary px-10 rounded-full">
                Explore Shop
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrder;
