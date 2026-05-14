import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Package, Users, DollarSign, LogOut, Warehouse, Boxes, ClipboardList } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';

const NAV_ITEMS = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { path: '/admin/products', label: 'Products', icon: Package },
  { path: '/admin/customers', label: 'Customers', icon: Users },
  { path: '/admin/finance', label: 'Finance', icon: DollarSign },
  { path: '/admin/warehouses', label: 'Warehouses', icon: Warehouse },
];

export function AdminLayout() {
  const { pathname } = useLocation();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleToast = (e: any) => {
      setToastMessage(e.detail);
      setTimeout(() => setToastMessage(null), 3000);
    };
    window.addEventListener('show-toast', handleToast);
    return () => window.removeEventListener('show-toast', handleToast);
  }, []);

  return (
    <div className="min-h-screen bg-sand flex flex-col md:flex-row font-sans text-ink">
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: 50 }}
             className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-ink text-sand px-6 py-4 text-sm tracking-wide flex items-center gap-3 shadow-2xl font-medium"
          >
             <Check className="w-4 h-4 text-clay" />
             {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-stone flex flex-col shrink-0 h-auto md:h-screen sticky top-0">
        <div className="p-6 border-b border-stone">
          <Link to="/admin" className="font-serif text-2xl font-semibold tracking-tight">Oken Admin</Link>
        </div>
        
        <nav className="flex-1 py-6 px-4 flex flex-col gap-2 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-sm font-medium ${
                  isActive ? 'bg-stone text-ink' : 'text-ink-light hover:text-ink hover:bg-stone/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-stone mt-auto">
          <Link 
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-sm font-medium text-ink-light hover:text-clay hover:bg-stone/50 w-full"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
