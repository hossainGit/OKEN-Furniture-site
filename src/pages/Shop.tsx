import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../lib/data';
import { Filter, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../lib/CartContext';

const CATEGORIES = ["All", "Seating", "Tables", "Lighting", "Storage", "Bedroom"];

export function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { addToCart } = useCart();
  const [addedItem, setAddedItem] = useState<number | null>(null);
  
  const categoryParam = searchParams.get('category') || "All";
  const searchStr = searchParams.get('q') || "";

  let filteredProducts = categoryParam === "All" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === categoryParam);
    
  if (searchStr) {
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchStr.toLowerCase()) || 
      p.category.toLowerCase().includes(searchStr.toLowerCase())
    );
  }

  const handleCategoryClick = (cat: string) => {
    if (cat === "All") {
      setSearchParams(searchStr ? { q: searchStr } : {});
    } else {
      setSearchParams(searchStr ? { category: cat, q: searchStr } : { category: cat });
    }
  };

  const handleQuickAdd = (e: React.MouseEvent, product: typeof PRODUCTS[0]) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id);
    setAddedItem(product.id);
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `${product.name} added to cart` }));
    setTimeout(() => setAddedItem(null), 2000);
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 border-b border-stone pb-12"
      >
        <div>
          <h1 className="text-5xl md:text-6xl font-serif mb-6 leading-tight">
            {searchStr ? `Search: ${searchStr}` : 'Collection'}
          </h1>
          <p className="text-ink-light max-w-md">
            {searchStr 
              ? `Showing results for "${searchStr}" across our collection.`
              : 'Browse our complete collection of thoughtfully designed pieces for your modern home.'
            }
          </p>
        </div>
        
        <div className="w-full md:w-auto">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="md:hidden w-full flex items-center justify-between uppercase tracking-widest text-xs font-medium border border-stone px-4 py-3 mb-6"
          >
            <span>Filter by Category</span>
            <Filter className="w-4 h-4" />
          </button>
          
          <div className={`${isFilterOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row gap-4 md:gap-8 text-xs uppercase tracking-widest font-medium overflow-visible`}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`text-left transition-colors whitespace-nowrap relative ${
                  categoryParam === cat ? 'text-clay' : 'text-ink-light hover:text-ink'
                }`}
              >
                {cat}
                {categoryParam === cat && (
                  <motion.span 
                    layoutId="activeFilter"
                    className="absolute -bottom-2 left-0 right-0 h-px bg-clay hidden md:block"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product, index) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              key={product.id} 
              className="group"
            >
              <Link to={`/product/${product.id}`} className="block">
                <div className="relative aspect-[4/5] overflow-hidden bg-sand mb-6">
                  {product.isNew && (
                    <span className="absolute top-4 left-4 z-10 bg-white px-3 py-1 text-[10px] uppercase tracking-widest font-medium shadow-sm">
                      New In
                    </span>
                  )}
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-gradient-to-t from-black/50 to-transparent">
                    <button 
                      onClick={(e) => handleQuickAdd(e, product)}
                      className={`w-full text-sm font-medium uppercase tracking-widest py-3 transition-colors flex items-center justify-center gap-2 ${
                        addedItem === product.id ? 'bg-clay text-white' : 'bg-white text-ink hover:bg-clay hover:text-white'
                      }`}
                    >
                      {addedItem === product.id ? (
                        <><Check className="w-4 h-4" /> Added</>
                      ) : (
                        <><ShoppingBag className="w-4 h-4" /> Add to Cart</>
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-ink-light mb-2">{product.category}</p>
                    <h3 className="font-serif text-xl group-hover:text-clay transition-colors">{product.name}</h3>
                  </div>
                  <span className="font-medium text-sm mt-1">{product.price}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredProducts.length === 0 && (
          <div className="col-span-full py-16 flex flex-col items-center justify-center text-center">
            <div className="w-full max-w-2xl mb-8 relative">
               <img 
                 src="https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80&w=1200" 
                 alt="Empty room" 
                 className="w-full h-64 object-cover grayscale opacity-80"
               />
               <div className="absolute inset-0 bg-sand/30"></div>
            </div>
            <p className="text-ink-light font-medium text-lg">No products found for your selection.</p>
            <p className="text-ink-light mt-2">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
}
