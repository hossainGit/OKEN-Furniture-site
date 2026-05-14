import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DollarSign, ArrowUpRight, ArrowDownRight, CreditCard, Landmark, Smartphone, Search, Filter } from 'lucide-react';
import { PRODUCTS } from '../../lib/data';

const TRANSACTIONS = [
  { id: 'TXN-001', date: 'Oct 28', amount: '+$1,250', type: 'Credit Card', status: 'Completed' },
  { id: 'TXN-002', date: 'Oct 27', amount: '+$4,500', type: 'Bank Transfer', status: 'Pending' },
  { id: 'TXN-003', date: 'Oct 27', amount: '+$345', type: 'Mobile Banking', status: 'Completed' },
  { id: 'TXN-004', date: 'Oct 26', amount: '+$890', type: 'Credit Card', status: 'Completed' },
  { id: 'TXN-005', date: 'Oct 26', amount: '-$1,200', type: 'Refund', status: 'Processed' },
  { id: 'TXN-006', date: 'Oct 25', amount: '+$2,340', type: 'Bank Transfer', status: 'Completed' },
];

const MOCK_LEDGER = Array.from({ length: 20 }).map((_, i) => {
  const type = Math.random() > 0.4 ? 'OUT' : 'IN';
  const qty = Math.floor(Math.random() * 5) + 1;
  const product = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
  return {
    id: `TXN-${1000 + i}`,
    date: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
    productName: product.name,
    type,
    qty,
    location: Math.random() > 0.5 ? 'Main Fulfillment Center' : 'East Coast Hub',
    reference: type === 'OUT' ? `Order #OKN-${900 - i}` : `PO-${300 + i}`,
  };
}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function Finance() {
  const [activeTab, setActiveTab] = useState<'finance' | 'ledger'>('finance');
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredLedger = MOCK_LEDGER.filter(txn => 
    txn.productName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    txn.reference.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto flex flex-col h-full">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-serif mb-2">Finance</h1>
          <p className="text-ink-light">Overview of revenue, payouts, and financial transactions</p>
        </div>
      </motion.div>

      <div className="flex border-b border-stone mb-8">
        <button 
          onClick={() => setActiveTab('finance')}
          className={`px-6 py-3 text-sm font-medium uppercase tracking-widest transition-colors relative ${activeTab === 'finance' ? 'text-ink' : 'text-ink-light hover:text-ink'}`}
        >
          Transactions
          {activeTab === 'finance' && (
            <motion.div layoutId="finance-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-ink" />
          )}
        </button>
        <button 
          onClick={() => setActiveTab('ledger')}
          className={`px-6 py-3 text-sm font-medium uppercase tracking-widest transition-colors relative ${activeTab === 'ledger' ? 'text-ink' : 'text-ink-light hover:text-ink'}`}
        >
          Stock Ledger
          {activeTab === 'ledger' && (
            <motion.div layoutId="finance-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-ink" />
          )}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'finance' ? (
          <motion.div 
            key="finance"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex-1 flex flex-col"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 border border-stone">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xs uppercase tracking-widest text-ink-light font-medium">Net Revenue (Oct)</h3>
                  <div className="p-2 bg-green-50 rounded-full text-green-600">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-3xl font-serif">$98,450.00</p>
                <p className="text-xs text-ink-light mt-2">+12.5% from last month</p>
              </div>

              <div className="bg-white p-6 border border-stone">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xs uppercase tracking-widest text-ink-light font-medium">Pending Payouts</h3>
                  <div className="p-2 bg-orange-50 rounded-full text-orange-600">
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-3xl font-serif">$12,850.00</p>
                <p className="text-xs text-ink-light mt-2">Expected by Nov 2</p>
              </div>

              <div className="bg-white p-6 border border-stone">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xs uppercase tracking-widest text-ink-light font-medium">Total Refunds</h3>
                  <div className="p-2 bg-red-50 rounded-full text-red-600">
                    <ArrowDownRight className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-3xl font-serif">$3,200.00</p>
                <p className="text-xs text-ink-light mt-2">3.2% return rate</p>
              </div>
            </div>

            <div className="bg-white border border-stone flex-1">
              <div className="p-6 border-b border-stone flex justify-between items-center">
                <h2 className="font-serif text-xl">Recent Transactions</h2>
                <button className="text-xs uppercase tracking-widest font-medium text-clay hover:text-ink transition-colors">View Full Report</button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-ink-light uppercase tracking-widest border-b border-stone bg-stone/5">
                    <tr>
                      <th className="px-6 py-4 font-medium">Transaction ID</th>
                      <th className="px-6 py-4 font-medium">Date</th>
                      <th className="px-6 py-4 font-medium">Payment Method</th>
                      <th className="px-6 py-4 font-medium text-right">Amount</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone">
                    {TRANSACTIONS.map((txn, i) => (
                      <tr key={txn.id} className="hover:bg-stone/30 transition-colors">
                        <td className="px-6 py-4 font-medium">{txn.id}</td>
                        <td className="px-6 py-4 text-ink-light">{txn.date}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {txn.type.includes('Card') && <CreditCard className="w-4 h-4 text-ink-light" />}
                            {txn.type.includes('Bank') && <Landmark className="w-4 h-4 text-ink-light" />}
                            {txn.type.includes('Mobile') && <Smartphone className="w-4 h-4 text-ink-light" />}
                            {txn.type === 'Refund' && <ArrowDownRight className="w-4 h-4 text-red-500" />}
                            {txn.type}
                          </div>
                        </td>
                        <td className={`px-6 py-4 font-medium text-right ${txn.amount.startsWith('-') ? 'text-red-600' : 'text-green-600'}`}>
                          {txn.amount}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-[10px] uppercase tracking-wider font-medium rounded-full ${
                            txn.status === 'Completed' || txn.status === 'Processed' ? 'bg-green-100 text-green-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {txn.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="ledger"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex-1 flex flex-col bg-white border border-stone min-h-[500px]"
          >
            <div className="p-4 border-b border-stone flex flex-col md:flex-row gap-4 justify-between items-center bg-stone/20">
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-light" />
                <input 
                  type="text" 
                  placeholder="Search by product, ID, or ref..." 
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white border border-stone outline-none focus:border-clay text-sm"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-stone text-xs uppercase tracking-widest font-medium hover:bg-stone transition-colors">
                <Filter className="w-4 h-4" /> Filter
              </button>
            </div>

            <div className="flex-1 overflow-auto">
              <table className="w-full text-left border-collapse">
                <thead className="text-xs text-ink-light uppercase tracking-widest border-b border-stone bg-stone/5">
                  <tr>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Product</th>
                    <th className="px-6 py-4 font-medium">Transaction ID</th>
                    <th className="px-6 py-4 font-medium">Type</th>
                    <th className="px-6 py-4 font-medium text-right">Qty</th>
                    <th className="px-6 py-4 font-medium">Location</th>
                    <th className="px-6 py-4 font-medium text-right">Reference</th>
                  </tr>
                </thead>
                <tbody className="text-sm border-t-0">
                  {filteredLedger.map((txn, idx) => (
                    <tr key={idx} className="hover:bg-stone/30 transition-colors border-b border-stone/50 last:border-b-0">
                      <td className="px-6 py-4 whitespace-nowrap text-ink-light">{txn.date}</td>
                      <td className="px-6 py-4 font-medium text-ink">{txn.productName}</td>
                      <td className="px-6 py-4 font-mono text-xs text-ink-light">{txn.id}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-xs font-medium uppercase tracking-wider ${
                          txn.type === 'IN' ? 'bg-[#E8F3EE] text-[#2F6A4F]' : 'bg-[#F9ECEC] text-[#9A3030]'
                        }`}>
                          {txn.type === 'IN' ? <ArrowDownRight className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
                          {txn.type === 'IN' ? 'Receipt' : 'Fulfillment'}
                        </span>
                      </td>
                      <td className={`px-6 py-4 text-right font-medium ${txn.type === 'IN' ? 'text-[#2F6A4F]' : 'text-[#9A3030]'}`}>
                        {txn.type === 'IN' ? '+' : '-'}{txn.qty}
                      </td>
                      <td className="px-6 py-4 text-ink-light">{txn.location}</td>
                      <td className="px-6 py-4 text-right text-xs uppercase tracking-widest">{txn.reference}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
