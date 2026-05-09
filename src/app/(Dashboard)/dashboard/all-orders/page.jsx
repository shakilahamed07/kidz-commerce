import { getAllOrders } from "@/action/server/order";
import OrderTable from "@/components/Dashboard/OrderTable";
import React from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";

export default async function AllOrders() {
  const orders = (await getAllOrders()) || [];
  const formetedOrders = orders.map((order) => {
    return {
      ...order,
      items: order.items.map((item) => ({
        ...item,
        _id: item._id.toString(),
      })),
      _id: order._id.toString(),
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-gray-800">All Orders</h1>
          <p className="text-sm text-gray-500 font-medium">
            Manage and track all customer purchases in real-time
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-sm btn-outline border-gray-200 shadow-sm bg-white">
            Export CSV
          </button>
          <button className="btn btn-sm btn-primary shadow-md">
            Print Reports
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-collapse">
            {/* Table Head */}
            <thead className="bg-gray-50/80">
              <tr className="text-gray-500 text-[11px] uppercase tracking-widest border-b border-gray-100">
                <th className="py-5 px-6">Customer & Order ID</th>
                <th>Products</th>
                <th>Payment</th>
                <th>Order Status</th>
                <th className="text-right px-6">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {formetedOrders.length > 0 ? (
                formetedOrders.map((order) => (
                  <OrderTable key={order._id} order={order} />
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-20 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-gray-300">
                        <HiOutlineShoppingBag size={48} />
                      </span>
                      <p className="text-gray-400 font-bold">
                        No orders found yet.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
