"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  HiOutlineViewGrid,
  HiOutlineShoppingBag,
  HiOutlineUser,
  HiOutlineCog,
  HiOutlineLogout,
  HiMenuAlt2,
  HiX,
} from "react-icons/hi";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/components/logo";
import { IoMdAddCircleOutline } from "react-icons/io";
import { GrUpdate } from "react-icons/gr";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const session = useSession();
  const Router = useRouter();
  const pathName = usePathname();

  const menuItems = [
    { name: "Overview", icon: <HiOutlineViewGrid />, href: "/dashboard" },
    {
      name: "All Orders",
      icon: <HiOutlineShoppingBag />,
      href: "/dashboard/all-orders",
    },
    { name: "Add Product", icon: <IoMdAddCircleOutline size={22} />, href: "/dashboard/add-product" },
    { name: "Update Product", icon: <GrUpdate size={16} />, href: "/dashboard/update-product" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      {/* --- Mobile Sidebar Overlay --- */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* --- Sidebar --- */}
      <aside
        className={`fixed inset-y-0 left-0 bg-white border-r border-gray-200 w-64 z-50 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex items-center justify-between">
            <Logo />
          <button
            className="lg:hidden p-2 text-gray-500 pl-2"
            onClick={() => setSidebarOpen(false)}
          >
            <HiX size={20} />
          </button>
        </div>

        <nav className="mt-4 px-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`${pathName === item.href ? "text-primary bg-primary/10" : ""} flex items-center gap-3 px-4 py-3 text-gray-600 font-bold text-sm hover:bg-primary/6 hover:text-primary rounded-xl transition-all`}
            >
              <span className="text-xl">{item.icon}</span>
              {item.name}
            </Link>
          ))}

          <button onClick={()=>{Router.push("/")}} className="w-full flex items-center gap-3 px-4 py-3 text-error font-bold text-sm hover:bg-error/5 rounded-xl transition-all mt-10">
            <span className="text-xl">
              <HiOutlineLogout />
            </span>
            Back to Home
          </button>
        </nav>
      </aside>

      {/* --- Main Content Area --- */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30 shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 lg:hidden"
            >
              <HiMenuAlt2 size={24} />
            </button>
            <div className="lg:hidden">
                <Logo />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-black text-gray-800 leading-none">
                {session?.data?.user?.name}
              </p>
            </div>
            <div className="mr-5 cursor-pointer">
              {session?.data?.user?.image ? (
                <Image
                  alt="User Image"
                  className="w-10 h-10 rounded-full border border-base-300"
                  src={session?.data?.user?.image}
                  width={40}
                  height={40}
                />
              ) : (
                <span className="bg-secondary font-bold text-white rounded-full px-3 py-2">
                  {session?.data?.user?.name?.slice(0, 1)}
                </span>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 lg:p-8 flex-1">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
