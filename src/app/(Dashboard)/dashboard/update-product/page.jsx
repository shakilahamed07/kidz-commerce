
import { GetProducts } from "@/action/server/products";
import OrderTable from "@/components/Dashboard/OrderTable";
import ProductTable from "@/components/Dashboard/ProductTable";
import React from "react";
import { FaFilter } from "react-icons/fa6";
import { HiOutlineShoppingBag } from "react-icons/hi";

export default async function AllOrders() {
  const products = (await GetProducts()) || [];
  const formetedProducts = products.map((product) => {
    return {
      ...product,
      _id: product._id.toString(),
    };
  });

  return (
    <div className="space-y-6 sm:mr-5">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-gray-800">All Products</h1>
          <p className="text-sm text-gray-500 font-medium">
            Manage and update all products in your store in real-time
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-sm btn-primary shadow-md">
           <FaFilter /> Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-collapse">
            {/* Table Head */}
            <thead className="bg-gray-50/80">
              <tr className="text-gray-500 text-[11px] uppercase tracking-widest border-b border-gray-100">
                <th className="py-5 px-6">Product Image</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th className="text-right px-6">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {formetedProducts.length > 0 ? (
                formetedProducts.map((product) => (
                 <ProductTable key={product._id} product={product} />
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-20 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-gray-300">
                        <HiOutlineShoppingBag size={48} />
                      </span>
                      <p className="text-gray-400 font-bold">
                        No product found yet.
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
