import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import React from 'react';
import { 
  HiOutlineTrendingUp, 
  HiOutlineShoppingBag, 
  HiOutlineUsers, 
  HiOutlineCurrencyBangladeshi 
} from "react-icons/hi";

export default async function DashBoard() {
    
    const session = await getServerSession(authOptions) || {};
  
  const stats = [
    { id: 1, title: 'Total Sales', value: '৳ 12,450', icon: <HiOutlineCurrencyBangladeshi />, color: 'bg-blue-500', trend: '+12% from last month' },
    { id: 2, title: 'Total Orders', value: '45', icon: <HiOutlineShoppingBag />, color: 'bg-green-500', trend: '+5 new today' },
    { id: 3, title: 'Customers', value: '1,200', icon: <HiOutlineUsers />, color: 'bg-purple-500', trend: '+18% growth' },
    { id: 4, title: 'Growth', value: '24.5%', icon: <HiOutlineTrendingUp />, color: 'bg-orange-500', trend: 'Steady performance' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-black text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-500 text-sm">Welcome back, <span>{session?.user?.name}</span> Here's what's happening with your store today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.title}</p>
                <h3 className="text-2xl font-black text-gray-800 mt-1">{stat.value}</h3>
              </div>
              <div className={`${stat.color} p-3 rounded-xl text-white text-2xl`}>
                {stat.icon}
              </div>
            </div>
            <p className="text-[10px] font-bold text-success mt-4 flex items-center gap-1">
              {stat.trend}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Recent Orders</h3>
            <button className="btn btn-ghost btn-xs text-primary">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="text-gray-400 text-[10px] uppercase">
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium text-gray-600">
                <tr>
                  <td>#ORD-7742</td>
                  <td>Abdur Rahman</td>
                  <td><span className="badge badge-success badge-sm text-white">Delivered</span></td>
                  <td className="font-bold">৳ 1,200</td>
                </tr>
                <tr>
                  <td>#ORD-8851</td>
                  <td>Fatima Akter</td>
                  <td><span className="badge badge-warning badge-sm text-white">Pending</span></td>
                  <td className="font-bold">৳ 450</td>
                </tr>
                <tr>
                  <td>#ORD-9920</td>
                  <td>Sumon Ahmed</td>
                  <td><span className="badge badge-info badge-sm text-white">Shipped</span></td>
                  <td className="font-bold">৳ 2,100</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions or Summary */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-800 mb-6">Store Performance</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-gray-500">Inventory Levels</span>
                <span className="text-primary">85%</span>
              </div>
              <progress className="progress progress-primary w-full" value="85" max="100"></progress>
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-gray-500">Customer Satisfaction</span>
                <span className="text-secondary">92%</span>
              </div>
              <progress className="progress progress-secondary w-full" value="92" max="100"></progress>
            </div>
            
            <div className="bg-primary/5 p-4 rounded-xl mt-8">
               <p className="text-xs text-primary font-bold">Pro Tip:</p>
               <p className="text-[11px] text-gray-600 mt-1">You have 5 orders waiting to be processed today. Speed up delivery to improve rating!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}