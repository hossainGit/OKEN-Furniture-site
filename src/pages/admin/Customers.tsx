import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Mail, Phone, MoreHorizontal } from 'lucide-react';

const CUSTOMERS_DATA = [
  { id: 'CUST-001', name: 'Emily Chen', email: 'emily.chen@example.com', phone: '+1 555-0123', totalOrders: 5, lifetimeValue: '$5,250', status: 'Active' },
  { id: 'CUST-002', name: 'Marcus Johnson', email: 'marcus.j@example.com', phone: '+1 555-0124', totalOrders: 1, lifetimeValue: '$4,500', status: 'Active' },
  { id: 'CUST-003', name: 'Sarah Williams', email: 'swilliamson@example.com', phone: '+1 555-0125', totalOrders: 12, lifetimeValue: '$12,345', status: 'VIP' },
  { id: 'CUST-004', name: 'David Kim', email: 'david.kim@example.com', phone: '+1 555-0126', totalOrders: 2, lifetimeValue: '$890', status: 'Active' },
  { id: 'CUST-005', name: 'Anna Rodriguez', email: 'anna_r@example.com', phone: '+1 555-0127', totalOrders: 0, lifetimeValue: '$0', status: 'Inactive' },
  { id: 'CUST-006', name: 'James Smith', email: 'jsmith99@example.com', phone: '+1 555-0128', totalOrders: 4, lifetimeValue: '$2,340', status: 'Active' },
  { id: 'CUST-007', name: 'Laura Taylor', email: 'laura.t@example.com', phone: '+1 555-0129', totalOrders: 8, lifetimeValue: '$8,650', status: 'VIP' },
];

export function Customers() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = CUSTOMERS_DATA.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto flex flex-col h-full">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-serif mb-2">Customers</h1>
          <p className="text-ink-light">Manage customer relationships and data</p>
        </div>
        <button className="px-4 py-2 bg-ink text-white text-xs uppercase tracking-widest font-medium hover:bg-clay transition-colors">
          Export List
        </button>
      </motion.div>

      <div className="bg-white border border-stone flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-stone flex flex-col md:flex-row gap-4 justify-between items-center bg-stone/20">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-light" />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-stone py-2 pl-10 pr-4 text-sm outline-none focus:border-clay"
            />
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-stone text-xs uppercase tracking-widest font-medium hover:bg-stone transition-colors">
              <Filter className="w-3 h-3" /> Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-ink-light uppercase tracking-widest border-b border-stone bg-white">
              <tr>
                <th className="px-6 py-4 font-medium">Customer Name</th>
                <th className="px-6 py-4 font-medium">Contact Details</th>
                <th className="px-6 py-4 font-medium text-center">Orders</th>
                <th className="px-6 py-4 font-medium text-right">Lifetime Value</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map(customer => (
                  <tr key={customer.id} className="hover:bg-stone/30 transition-colors group">
                    <td className="px-6 py-4 font-serif font-medium">{customer.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 text-xs text-ink-light">
                        <span className="flex items-center gap-2"><Mail className="w-3 h-3" /> {customer.email}</span>
                        <span className="flex items-center gap-2"><Phone className="w-3 h-3" /> {customer.phone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center font-medium">{customer.totalOrders}</td>
                    <td className="px-6 py-4 text-right font-medium">{customer.lifetimeValue}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-[10px] uppercase tracking-wider font-medium rounded-full ${
                        customer.status === 'VIP' ? 'bg-purple-100 text-purple-800' :
                        customer.status === 'Active' ? 'bg-green-100 text-green-800' :
                        'bg-stone-200 text-stone-600'
                      }`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-ink-light hover:text-ink transition-colors p-1" title="More Options">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-ink-light">
                    No customers found matching your search.
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
