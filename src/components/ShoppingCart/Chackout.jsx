"use client";
import React, { useState } from "react";
import {
  HiOutlineArrowLeft,
  HiOutlineTruck,
  HiOutlineBadgeCheck,
  HiOutlineInformationCircle,
} from "react-icons/hi";
import {
  MdOutlineLocationOn,
  MdOutlineAssignment,
  MdOutlineEmail,
  MdOutlinePerson,
} from "react-icons/md";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { createOder } from "@/action/server/createOder";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const Checkout = ({ cartItems = [] }) => {

  const session = useSession();
  const router = useRouter()
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Calculations
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const deliveryCharge = 60;
  const total = subtotal + deliveryCharge;

  // 2. SUBMIT HANDLER
  const handleConfirmOrder = async (e) => {
    e.preventDefault();

    // Construct the final data object
    const payload = {
      customerName: session?.data?.user?.name,
      customerEmail: session?.data?.user?.email,
      phoneNumber: `+88${phone}`,
      deliveryAddress: address,
      subtotal: subtotal,
      paymentMethod: "Cash on Delivery",
      status:"Order Received"
    };

    const result = await createOder(payload);

    if(result.success){
        router.push('/my-orders')
        Swal.fire("success", "Add Oder Successfully", "success")
    }
    else{
        router.push("/")
        Swal.fire("Opps!", "Sumething Wrong", "error")
    }
  };

  return (
    <div className="py-6 md:py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header & Steps */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <Link
              href="/cart"
              className="btn btn-ghost btn-sm gap-2 normal-case mb-2"
            >
              <HiOutlineArrowLeft /> Edit Shopping Cart
            </Link>
            <h1 className="text-3xl font-black">Checkout Detail</h1>
          </div>
          <ul className="steps steps-horizontal w-full md:w-80">
            <li className="step step-primary text-xs">Cart</li>
            <li className="step step-primary text-xs font-bold">Shipping</li>
            <li className="step text-xs">Confirm</li>
          </ul>
        </div>

        {/* 3. WRAP IN FORM */}
        <form
          onSubmit={handleConfirmOrder}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* LEFT: Shipping Form */}
          <div className="lg:col-span-7 space-y-6">
            <div className="card bg-base-100 shadow-sm border border-base-300">
              <div className="card-body p-6 md:p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <MdOutlineLocationOn size={24} />
                  </div>
                  <h2 className="text-xl font-bold">Delivery Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* READ ONLY NAME */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-bold flex items-center gap-2">
                        <MdOutlinePerson className="text-gray-400" /> Full Name
                      </span>
                    </label>
                    <input
                      type="text"
                      value={session?.data?.user?.name}
                      readOnly
                      className="input input-bordered bg-base-200 cursor-not-allowed border-base-300 font-medium opacity-80"
                    />
                  </div>

                  {/* READ ONLY EMAIL */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-bold flex items-center gap-2">
                        <MdOutlineEmail className="text-gray-400" /> Email
                        Address
                      </span>
                    </label>
                    <input
                      type="email"
                      value={session?.data?.user?.email}
                      readOnly
                      className="input input-bordered bg-base-200 cursor-not-allowed border-base-300 font-medium opacity-80"
                    />
                  </div>

                  {/* EDITABLE PHONE */}
                  <div className="form-control flex flex-col w-full md:col-span-2">
                    <label className="label">
                      <span className="label-text font-bold">
                        Mobile Number (Active)
                      </span>
                    </label>
                    <div className="join">
                      <span className="join-item btn btn-md bg-base-300 border-base-300">
                        +88
                      </span>
                      <input
                        type="tel"
                        placeholder="017XXXXXXXX"
                        className="input input-bordered join-item w-full focus:outline-primary bg-base-200/20"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* EDITABLE ADDRESS */}
                  <div className="form-control flex flex-col w-full md:col-span-2">
                    <label className="label">
                      <span className="label-text font-bold">
                        Full Delivery Address
                      </span>
                    </label>
                    <textarea
                      className="textarea textarea-bordered w-full h-28 focus:textarea-primary bg-base-200/20 leading-relaxed"
                      placeholder="House No, Road No, Area, City, District..."
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                {/* COD Badge */}
                <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-start gap-3">
                  <HiOutlineInformationCircle
                    className="text-blue-600 mt-1"
                    size={20}
                  />
                  <div>
                    <h4 className="text-sm font-bold text-blue-900">
                      Cash on Delivery Available
                    </h4>
                    <p className="text-xs text-blue-700 mt-1">
                      Product hate peye delivery man ke taka porishodh korun.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:col-span-5">
            <div className="card bg-base-100 shadow-xl border-2 border-primary/10 sticky top-6">
              <div className="card-body">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-6 border-b pb-4">
                  <MdOutlineAssignment className="text-primary" /> Order Summary
                </h2>

                {/* Product Preview List */}
                <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2">
                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex justify-between items-center gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-12 h-12 rounded-lg bg-base-200">
                            <img
                              src={
                                item.image || "https://via.placeholder.com/50"
                              }
                              alt="product"
                            />
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold line-clamp-1 w-40 uppercase">
                            {item.title}
                          </h4>
                          <p className="text-[10px] text-gray-400 font-mono italic">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="text-sm font-bold text-base-content">
                        ৳{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Calculation Grid */}
                <div className="space-y-3 bg-base-200/50 p-4 rounded-xl">
                  <div className="divider my-0"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Total Amount</span>
                    <span className="text-2xl font-black text-secondary">
                      ৳{total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Order Action - Button type="submit" triggers handleConfirmOrder */}
                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={cartItems.length < 1}
                    className="btn btn-primary btn-block h-16 rounded-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all text-lg font-bold gap-3 group"
                  >
                    <HiOutlineBadgeCheck
                      size={28}
                      className="group-hover:rotate-12 transition-transform"
                    />
                    Confirm COD Order
                  </button>
                  <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    <HiOutlineTruck size={14} className="text-primary" />
                    Fastest Home Delivery
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
