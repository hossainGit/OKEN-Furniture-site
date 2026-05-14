import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Minus, Plus, X, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../lib/CartContext';

export function Cart() {
  const { items, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-[70vh] flex flex-col lg:flex-row items-center justify-center gap-16">
        <div className="w-full lg:w-1/2">
          <img 
            src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=1200" 
            alt="Empty sleek room" 
            className="w-full aspect-square md:aspect-[4/3] object-cover grayscale opacity-90"
          />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="w-16 h-16 bg-stone rounded-full flex items-center justify-center mb-8 text-ink">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Your cart is empty</h1>
          <p className="text-ink-light mb-8 max-w-md">Looks like you haven't added anything to your cart yet. Explore our collections to find the perfect piece.</p>
          <Link to="/shop" className="bg-ink text-white px-8 py-4 text-sm font-medium uppercase tracking-widest hover:bg-clay transition-colors inline-block">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-serif leading-tight">Shopping Cart</h1>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2">
          <div className="hidden border-b border-stone pb-4 mb-8 md:grid grid-cols-12 gap-4 text-xs font-medium uppercase tracking-widest text-ink-light">
            <div className="col-span-6">Product</div>
            <div className="col-span-3 text-center">Quantity</div>
            <div className="col-span-3 text-right">Total</div>
          </div>
          
          <div className="flex flex-col gap-8">
            <AnimatePresence>
              {items.map((item) => {
                const price = parseFloat(item.product.price.replace('$', '').replace(',', ''));
                const itemTotal = price * item.quantity;
                
                return (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    key={item.product.id} 
                    className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-stone pb-8 md:pb-8 relative group"
                  >
                    <button 
                      onClick={() => removeFromCart(item.product.id)}
                      className="absolute top-0 right-0 md:static md:col-span-1 flex items-center justify-center text-ink-light hover:text-clay transition-colors p-2 md:p-0"
                      aria-label="Remove item"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    
                    <div className="col-span-1 md:col-span-5 flex gap-6 items-center">
                      <Link to={`/product/${item.product.id}`} className="shrink-0">
                        <div className="w-24 h-32 md:w-32 md:h-40 bg-stone p-2">
                          <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                        </div>
                      </Link>
                      <div>
                        <span className="text-[10px] text-ink-light uppercase tracking-widest block mb-1">{item.product.category}</span>
                        <Link to={`/product/${item.product.id}`} className="font-serif text-lg md:text-xl hover:text-clay transition-colors hover:underline underline-offset-4 decoration-clay/30">
                          {item.product.name}
                        </Link>
                        <p className="text-ink-light mt-2">{item.product.price}</p>
                      </div>
                    </div>
                    
                    <div className="col-span-1 md:col-span-3 flex justify-start md:justify-center">
                      <div className="flex items-center border border-stone">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-10 h-10 flex items-center justify-center text-ink hover:bg-stone transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center text-ink hover:bg-stone transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="col-span-1 md:col-span-3 flex justify-between md:justify-end md:text-right font-medium text-lg">
                      <span className="md:hidden text-ink-light font-normal text-sm uppercase tracking-widest">Total</span>
                      ${itemTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white p-8 border border-stone sticky top-32"
          >
            <h2 className="font-serif text-2xl border-b border-stone pb-6 mb-6">Order Summary</h2>
            
            <div className="flex flex-col gap-4 text-sm mb-6">
              <div className="flex justify-between text-ink-light">
                <span>Subtotal</span>
                <span>${cartTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-ink-light">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-ink-light">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            
            <div className="flex justify-between font-serif text-2xl border-t border-stone pt-6 mb-8">
              <span>Total</span>
              <span>${cartTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
            
            <Link to="/checkout" className="w-full bg-ink text-white py-4 text-sm font-medium uppercase tracking-widest hover:bg-clay transition-colors flex items-center justify-center gap-2 group mt-8">
              Proceed to Checkout
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-center text-xs text-ink-light mt-4">Secure checkout. Free shipping over $1,500.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
