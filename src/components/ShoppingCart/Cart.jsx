"use client";
import React, { useMemo, useState } from "react";
import { HiOutlineTrash, HiPlus, HiMinus } from "react-icons/hi";
import { MdOutlineLocalMall, MdArrowBack } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import CartIItem from "@/components/ShoppingCart/CartIItem";

export default function Cart({ cartItems = [] }) {
  const [items, setItems] = useState(cartItems);

  const removeItem = (id) => {
    setItems((prevItems) => prevItems.filter((items) => items._id != id));
  };

  const incItem = (id, q) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item._id == id ? { ...item, quantity: q } : item,
      ),
    );
  };

  const dicItem = (id, q) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item._id == id ? { ...item, quantity: q } : item,
      ),
    );
  };

  // Dynamic calculation for subtotal
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  //total items
  const totalItems = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items]
  );

  if (items.length === 0) {
    return (
      <div className="hero min-h-[70vh] bg-base-100">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <MdOutlineLocalMall className="mx-auto text-9xl text-base-300" />
            <h1 className="text-3xl font-bold mt-4 font-sans">
              Apnar Cart Khali!
            </h1>
            <p className="py-6 text-gray-500 text-lg">
              Ekhono kono product add kora hoyni.
            </p>
            <Link href="/" className="btn btn-primary px-8 rounded-full">
              Shopping Suru Korun
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-secondary">Shopping Cart</h1>
          <p className="text-gray-500 mt-2 font-medium">
            Hello, {items[0]?.username}
          </p>
        </div>
        <div className="badge badge-secondary badge-outline badge-lg p-4 font-bold shadow-sm">
          Total Items: {totalItems}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- Cart Items Section --- */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartIItem
            dicItem={dicItem}
              incItem={incItem}
              removeItem={removeItem}
              key={item._id}
              item={item}
            ></CartIItem>
          ))}

          <Link
            href="/products"
            className="btn btn-link no-underline gap-2 text-gray-500 hover:text-primary transition-colors pl-0 mt-4"
          >
            <MdArrowBack size={20} /> Continue Shopping
          </Link>
        </div>

        {/* --- Order Summary Section --- */}
        <div className="sticky top-10 h-fit">
          <div className="card bg-base-100 shadow-xl border border-base-300 p-6">
            <h2 className="text-xl font-bold border-b border-base-200 pb-4 mb-4">
              Checkout Summary
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between text-gray-600">
                <span className="font-medium">Subtotal</span>
                <span className="font-bold text-base-content">
                  ৳{subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="font-medium">Shipping</span>
                <span className="text-success font-bold uppercase text-xs badge badge-success badge-outline">
                  Free
                </span>
              </div>
              <div className="flex justify-between text-gray-600 border-b border-dashed pb-4">
                <span className="font-medium">Discount</span>
                <span className="font-bold text-error">- ৳0.00</span>
              </div>

              <div className="flex justify-between text-2xl font-black pt-2">
                <span>Grand Total</span>
                <span className="text-secondary">
                  ৳{subtotal.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="form-control mt-8">
              <button className="btn btn-primary btn-block h-16 text-lg font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition-all">
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
