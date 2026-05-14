import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, MoreHorizontal } from 'lucide-react';

const ORDERS_DATA = [
  { id: '#ORD-015', customer: 'Emily Chen', date: 'Oct 28', items: 3, total: '$1,250', status: 'Processing' },
  { id: '#ORD-014', customer: 'Marcus Johnson', date: 'Oct 27', items: 1, total: '$4,500', status: 'Shipped' },
  { id: '#ORD-013', customer: 'Sarah Williams', date: 'Oct 27', items: 5, total: '$345', status: 'Delivered' },
  { id: '#ORD-012', customer: 'David Kim', date: 'Oct 26', items: 2, total: '$890', status: 'Processing' },
  { id: '#ORD-011', customer: 'Anna Rodriguez', date: 'Oct 26', items: 1, total: '$1,200', status: 'Cancelled' },
  { id: '#ORD-010', customer: 'James Smith', date: 'Oct 25', items: 4, total: '$2,340', status: 'Delivered' },
  { id: '#ORD-009', customer: 'Laura Taylor', date: 'Oct 24', items: 2, total: '$650', status: 'Delivered' },
];

export function Orders() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = ORDERS_DATA.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto flex flex-col h-full">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-serif mb-2">Orders</h1>
          <p className="text-ink-light">Manage and track customer orders</p>
        </div>
      </motion.div>

      <div className="bg-white border border-stone flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-stone flex flex-col md:flex-row gap-4 justify-between items-center bg-stone/20">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-light" />
            <input 
              type="text" 
              placeholder="Search by order ID or customer..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-stone py-2 pl-10 pr-4 text-sm outline-none focus:border-clay"
            />
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-stone text-xs uppercase tracking-widest font-medium hover:bg-stone transition-colors">
              <Filter className="w-3 h-3" /> Filter
            </button>
            <button className="flex-1 md:flex-none px-4 py-2 bg-ink text-white text-xs uppercase tracking-widest font-medium hover:bg-clay transition-colors">
              Export CSV
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-ink-light uppercase tracking-widest border-b border-stone bg-white">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium text-center">Items</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone">
              {filteredOrders.length > 0 ? (
                filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-stone/30 transition-colors">
                    <td className="px-6 py-4 font-medium">{order.id}</td>
                    <td className="px-6 py-4 text-ink-light">{order.date}</td>
                    <td className="px-6 py-4">{order.customer}</td>
                    <td className="px-6 py-4 text-center">{order.items}</td>
                    <td className="px-6 py-4 font-medium">{order.total}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-[10px] uppercase tracking-wider font-medium rounded-full ${
                        order.status === 'Processing' ? 'bg-orange-100 text-orange-800' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1 text-ink-light hover:text-ink transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-ink-light">
                    No orders found matching your search.
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
