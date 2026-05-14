import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../lib/data';
import { useCart } from '../lib/CartContext';
import { ShoppingBag, Check } from 'lucide-react';

const SPACES = ["Living", "Dining", "Bedroom", "Study", "Other"];

export function Spaces() {
  const [searchParams, setSearchParams] = useSearchParams();
  const spaceParam = searchParams.get('space') || "Living"; // Default to Living
  const { addToCart } = useCart();
  const [addedItem, setAddedItem] = useState<number | null>(null);

  const filteredProducts = PRODUCTS.filter(p => p.spaces?.includes(spaceParam));

  const spaceBackgrounds: Record<string, string> = {
    "Living": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000",
    "Dining": "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&q=80&w=2000",
    "Bedroom": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=2000",
    "Study": "https://images.herzindagi.info/image/2020/Sep/study-room.jpg",
    "Other": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=2000"
  };

  const bgImage = spaceBackgrounds[spaceParam] || spaceBackgrounds["Living"];

  const handleQuickAdd = (e: React.MouseEvent, product: typeof PRODUCTS[0]) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id);
    setAddedItem(product.id);
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `${product.name} added to cart` }));
    setTimeout(() => setAddedItem(null), 2000);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <section className="relative pt-32 pb-24 px-6 md:px-12 h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img
            key={bgImage}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={bgImage}
            alt={`${spaceParam} space`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-white/80 uppercase tracking-widest text-xs font-medium mb-4 block">Curated Spaces</span>
            <h1 className="text-5xl md:text-7xl font-serif text-white">{spaceParam} Room</h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 border-b border-stone pb-12 mb-16">
          <p className="text-ink-light max-w-md text-lg leading-relaxed">
            Discover pieces handpicked for the {spaceParam.toLowerCase()} space. From statement items to everyday essentials, find everything you need to create your perfect environment.
          </p>
          
          <div className="flex flex-wrap gap-4 md:gap-8 text-xs uppercase tracking-widest font-medium">
            {SPACES.map(space => (
              <button
                key={space}
                onClick={() => setSearchParams({ space })}
                className={`transition-colors whitespace-nowrap relative ${
                  spaceParam === space ? 'text-clay' : 'text-ink-light hover:text-ink'
                }`}
              >
                {space}
                {spaceParam === space && (
                  <motion.span 
                    layoutId="activeSpace"
                    className="absolute -bottom-2 left-0 right-0 h-px bg-clay"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
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
                   src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=1200" 
                   alt="Empty space" 
                   className="w-full h-64 object-cover grayscale opacity-80"
                 />
                 <div className="absolute inset-0 bg-sand/30"></div>
              </div>
              <p className="text-ink-light font-medium text-lg">We are currently curating new pieces for this space.</p>
              <p className="text-ink-light mt-2">Check back soon for our latest additions.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
