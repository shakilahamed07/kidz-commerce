"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getOderByIdAdmin } from "@/action/server/order";
import { BsPrinterFill } from "react-icons/bs";

export default function InvoicePage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const data = await getOderByIdAdmin(id);
      setOrder(data);
    };
    fetchOrder();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (!order)
    return <div className="p-10 text-center font-bold">Loading Invoice...</div>;

  return (
    <div
      className="bg-white min-h-screen md:p-10 font-sans text-gray-800"
      id="invoice"
    >
      <div className="flex justify-center mb-10 print:hidden">
        <button
          onClick={handlePrint}
          className="btn btn-primary px-10 shadow-lg font-bold"
        >
          <BsPrinterFill size={22} /> Print Now
        </button>
      </div>

      <div className="max-w-4xl mx-auto border p-10 rounded-sm shadow-sm">
        {/* Header */}
        <div className="md:flex justify-between items-start border-b pb-8">
          <div>
            <h1 className="text-3xl font-black text-primary mb-2">
              KIDZ COMMERCE
            </h1>
            <p className="text-sm text-gray-500 font-medium">
              123 Store Address, Dhaka, Bangladesh
            </p>
            <p className="text-sm text-gray-500 font-medium">
              Contact: +880 123456789
            </p>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold uppercase tracking-widest text-gray-400">
              Invoice
            </h2>
            <p className="text-sm font-bold mt-1">
              Order ID: #{order._id.toString()}
            </p>
            <p className="text-xs text-gray-400">
              Date: {new Date(order.oderAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Customer & Shipping Info */}
        <div className="grid grid-cols-2 gap-10 py-10">
          <div>
            <h3 className="text-xs font-black text-gray-400 uppercase mb-3">
              Bill To:
            </h3>
            <p className="font-bold text-lg">{order.customerName}</p>
            <p className="text-sm text-gray-600">{order.customerEmail}</p>
            <p className="text-sm text-gray-600">{order.phoneNumber}</p>
          </div>
          <div>
            <h3 className="text-xs font-black text-gray-400 uppercase mb-3">
              Shipping Address:
            </h3>
            <p className="text-sm font-medium leading-relaxed text-gray-700">
              {order.deliveryAddress}
            </p>
            <p className="text-xs font-bold text-primary mt-2">
              Method: {order.paymentMethod}
            </p>
          </div>
        </div>

        {/* Items Table */}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="py-4 px-2 text-xs font-black uppercase">
                Product
              </th>
              <th className="py-4 px-2 text-xs font-black uppercase text-center">
                Qty
              </th>
              <th className="py-4 px-2 text-xs font-black uppercase text-right">
                Price
              </th>
              <th className="py-4 px-2 text-xs font-black uppercase text-right">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={index} className="border-b italic">
                <td className="py-4 px-2 font-bold text-sm">{item.title}</td>
                <td className="py-4 px-2 text-center font-bold">
                  {item.quantity}
                </td>
                <td className="py-4 px-2 text-right">৳{item.price}</td>
                <td className="py-4 px-2 text-right font-black">
                  ৳{item.price * item.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Summary */}
        <div className="flex justify-end mt-10">
          <div className="w-64 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="font-bold text-gray-500">Subtotal</span>
              <span className="font-bold">৳{order.subtotal - 60}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-bold text-gray-500">Delivery Cost</span>
              <span className="font-bold">৳{order.deliveryCost}</span>
            </div>
            <div className="flex justify-between text-xl font-black border-t pt-3 text-primary">
              <span>Grand Total</span>
              <span>৳{order.totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 text-center border-t pt-5">
          <p className="text-xs font-bold text-gray-400">
            Thank you for shopping with Kidz Commerce!
          </p>
          <p className="text-[10px] text-gray-300 mt-1">
            This is a computer generated invoice and needs no signature.
          </p>
        </div>
      </div>

      {/* Print CSS */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #invoice,
          #invoice * {
            visibility: visible;
          }
          #invoice {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .print\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
