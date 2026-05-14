import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ArrowDownRight, Package, ShoppingCart, Users, DollarSign } from 'lucide-react';

const STATS = [
  { label: 'Total Revenue', value: '$124,500', trend: '+12.5%', isUp: true, icon: DollarSign },
  { label: 'Active Orders', value: '42', trend: '+5.2%', isUp: true, icon: ShoppingCart },
  { label: 'Total Customers', value: '1,280', trend: '+18.1%', isUp: true, icon: Users },
  { label: 'Products Sold', value: '845', trend: '-2.4%', isUp: false, icon: Package },
];

const RECENT_ORDERS = [
  { id: '#ORD-001', customer: 'Emma Thompson', date: 'Oct 24, 2023', total: '$2,450', status: 'Processing' },
  { id: '#ORD-002', customer: 'James Wilson', date: 'Oct 23, 2023', total: '$890', status: 'Shipped' },
  { id: '#ORD-003', customer: 'Sophia Chen', date: 'Oct 22, 2023', total: '$4,200', status: 'Delivered' },
  { id: '#ORD-004', customer: 'Michael Brown', date: 'Oct 21, 2023', total: '$150', status: 'Processing' },
];

export function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className="text-3xl font-serif mb-2">Dashboard Overview</h1>
        <p className="text-ink-light">Welcome back, Admin. Here's what's happening with your store today.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {STATS.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 border border-stone"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-stone rounded-full">
                <stat.icon className="w-5 h-5 text-ink" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${stat.isUp ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend}
                {stat.isUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              </div>
            </div>
            <h3 className="text-2xl font-serif mb-1">{stat.value}</h3>
            <p className="text-xs uppercase tracking-widest text-ink-light font-medium">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white border border-stone p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif text-xl border-b border-stone pb-2 pr-8">Recent Orders</h2>
            <button className="text-xs uppercase tracking-widest text-clay hover:text-ink transition-colors font-medium">View All</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-ink-light uppercase tracking-widest border-b border-stone">
                <tr>
                  <th className="px-4 py-3 font-medium">Order ID</th>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Total</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone">
                {RECENT_ORDERS.map(order => (
                  <tr key={order.id} className="hover:bg-stone/30 transition-colors">
                    <td className="px-4 py-4 font-medium">{order.id}</td>
                    <td className="px-4 py-4">{order.customer}</td>
                    <td className="px-4 py-4 text-ink-light">{order.date}</td>
                    <td className="px-4 py-4 font-medium">{order.total}</td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 text-[10px] uppercase tracking-wider font-medium rounded-full ${
                        order.status === 'Processing' ? 'bg-orange-100 text-orange-800' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Quick Actions / Alerts */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white border border-stone p-6"
        >
          <h2 className="font-serif text-xl border-b border-stone pb-2 mb-6">Action Needed</h2>
          
          <div className="flex flex-col gap-4">
            <div className="p-4 bg-orange-50 border border-orange-100 rounded flex gap-3 items-start">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 shrink-0"></div>
              <div>
                <h4 className="text-sm font-medium mb-1">5 Orders Pending Fulfillment</h4>
                <p className="text-xs text-ink-light">These orders have been paid and need shipping labels.</p>
              </div>
            </div>
            
            <div className="p-4 bg-red-50 border border-red-100 rounded flex gap-3 items-start">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 shrink-0"></div>
              <div>
                <h4 className="text-sm font-medium mb-1">Low Inventory Alert</h4>
                <p className="text-xs text-ink-light">The "Arc Lounge Chair" has only 2 units left in stock.</p>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-100 rounded flex gap-3 items-start">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 shrink-0"></div>
              <div>
                <h4 className="text-sm font-medium mb-1">New Customer Review</h4>
                <p className="text-xs text-ink-light">A 5-star review was left for the "Ribbed Glass Vase".</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
