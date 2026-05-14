import { motion } from 'motion/react';
import { ShoppingBag, Search, Menu, Check } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../lib/CartContext';
import { AnimatePresence, motion } from 'motion/react';

export function Layout() {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { cartCount } = useCart();
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleToast = (e: any) => {
      setToastMessage(e.detail);
      setTimeout(() => setToastMessage(null), 3000);
    };
    window.addEventListener('show-toast', handleToast);
    return () => window.removeEventListener('show-toast', handleToast);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col text-ink bg-sand font-sans selection:bg-clay selection:text-white">
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-between items-center px-6 md:px-12 py-6 ${
          scrolled || pathname !== '/' ? 'bg-sand/90 backdrop-blur-md border-b border-stone py-4' : 'bg-transparent'
        }`}
      >
        <div className="flex gap-6 items-center">
          <div className="hidden md:flex gap-8 text-xs font-medium uppercase tracking-widest text-ink-light">
            <Link to="/" className="hover:text-ink transition-colors">Home</Link>
            <Link to="/shop" className="hover:text-ink transition-colors">Collection</Link>
            <Link to="/spaces" className="hover:text-ink transition-colors">Spaces</Link>
            <Link to="/contact" className="hover:text-ink transition-colors">Contact</Link>
          </div>
        </div>
        
        <Link to="/" className="font-serif text-3xl font-semibold tracking-tight absolute left-1/2 -translate-x-1/2">
          Oken
        </Link>
        
        <div className="flex gap-4 items-center">
          <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2 text-ink hover:text-clay transition-colors group">
            <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
          <Link to="/cart" className="p-2 text-ink hover:text-clay transition-colors relative group">
            <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-clay text-white rounded-full flex items-center justify-center text-[9px] font-bold">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[88px] left-0 right-0 z-40 bg-white border-b border-stone p-6 shadow-xl"
          >
            <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex gap-4 items-center">
              <Search className="w-5 h-5 text-ink-light" />
              <input 
                autoFocus
                type="text" 
                placeholder="Search products, categories..." 
                className="flex-1 bg-transparent border-none outline-none text-xl font-serif"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="button" onClick={() => setIsSearchOpen(false)} className="text-sm uppercase tracking-widest font-medium hover:text-clay transition-colors">Close</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

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

      <main className="flex-1 flex flex-col pt-16">
        <Outlet />
      </main>

      <footer className="bg-sand pt-24 pb-12 px-6 md:px-12 border-t border-stone mt-auto">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="md:col-span-2">
              <h3 className="font-serif text-3xl font-semibold mb-6">Oken</h3>
              <p className="max-w-sm text-ink-light leading-relaxed mb-8">
                A meticulously curated collection of furniture pieces designed to elevate everyday living spaces.
              </p>
              <div className="flex gap-4">
                <input 
                  type="email" 
                  placeholder="YOUR EMAIL" 
                  className="bg-transparent border-b border-ink/20 pb-2 outline-none text-sm focus:border-clay flex-1 max-w-[240px] uppercase tracking-wide placeholder:text-ink/30"
                />
                <button className="text-xs uppercase tracking-widest font-medium hover:text-clay transition-colors">Subscribe</button>
              </div>
            </div>
            
            <div>
              <h4 className="text-xs uppercase tracking-widest font-medium mb-6">Shop</h4>
              <ul className="space-y-4 text-ink-light">
                <li><Link to="/shop" className="hover:text-clay transition-colors">All Products</Link></li>
                <li><Link to="/shop?category=Seating" className="hover:text-clay transition-colors">Seating</Link></li>
                <li><Link to="/shop?category=Tables" className="hover:text-clay transition-colors">Tables</Link></li>
                <li><Link to="/shop?category=Lighting" className="hover:text-clay transition-colors">Lighting</Link></li>
                <li><Link to="/shop?category=Storage" className="hover:text-clay transition-colors">Storage</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xs uppercase tracking-widest font-medium mb-6">Support</h4>
              <ul className="space-y-4 text-ink-light">
                <li><Link to="/contact" className="hover:text-clay transition-colors">Contact Us</Link></li>
                <li><Link to="#" className="hover:text-clay transition-colors">Shipping & Returns</Link></li>
                <li><Link to="#" className="hover:text-clay transition-colors">Care Guide</Link></li>
                <li><Link to="#" className="hover:text-clay transition-colors">FAQ</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-stone pt-8 text-xs text-ink-light uppercase tracking-widest">
            <p>&copy; {new Date().getFullYear()} Oken Furniture. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0 items-center">
              <Link to="#" className="hover:text-ink transition-colors">Instagram</Link>
              <Link to="#" className="hover:text-ink transition-colors">Pinterest</Link>
              <Link to="#" className="hover:text-ink transition-colors">Twitter</Link>
              <span className="w-px h-3 bg-stone hidden md:block"></span>
              <Link to="/admin/login" className="hover:text-clay font-medium transition-colors">Admin Login</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
