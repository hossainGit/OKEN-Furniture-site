import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../lib/data';
import { ArrowLeft, ChevronDown, Check, Minus, Plus } from 'lucide-react';
import { useCart } from '../lib/CartContext';

export function ProductDetail() {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === Number(id));
  const { addToCart, items, updateQuantity } = useCart();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<'details' | 'dimensions' | 'materials'>('details');
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col md:flex-row items-center justify-center pt-20 max-w-7xl mx-auto px-6 gap-16">
        <div className="w-full md:w-1/2">
          <img 
            src="https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80&w=1200" 
            alt="Empty modern room" 
            className="w-full aspect-[4/3] object-cover grayscale opacity-90"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="text-4xl font-serif mb-6">Product not found</h1>
          <p className="text-ink-light mb-8 max-w-sm">The piece you're looking for might have been moved or removed from our collection.</p>
          <Link to="/shop" className="bg-ink text-white px-8 py-4 text-sm font-medium uppercase tracking-widest hover:bg-clay transition-colors">
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  const cartItem = product ? items.find(item => item.product.id === product.id) : undefined;
  const quantityInCart = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product.id);
    setAdded(true);
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `${product.name} added to cart` }));
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (!product) return;
    addToCart(product.id);
    navigate('/cart');
  };

  return (
    <div className="pt-24 pb-24 md:pt-32 max-w-[1440px] mx-auto min-h-screen">
      <div className="px-6 md:px-12 mb-8">
        <Link to="/shop" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-ink-light hover:text-ink transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Collection
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 px-6 md:px-12 items-start">
        
        {/* Product Image */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[3/4] lg:aspect-auto lg:h-[80vh] overflow-hidden bg-stone rounded-sm"
        >
          {product.isNew && (
            <span className="absolute top-6 left-6 z-10 bg-white px-4 py-2 text-[10px] uppercase tracking-widest font-medium shadow-sm">
              New Arrival
            </span>
          )}
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Product Details */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col pt-4 lg:pt-12 lg:pr-12"
        >
          <div className="mb-4">
            <span className="text-xs uppercase tracking-widest text-[#B68D6A]">{product.category}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif mb-6">{product.name}</h1>
          <p className="text-2xl mb-8 font-serif">{product.price}</p>
          
          <p className="text-ink-light text-lg leading-relaxed mb-10">
            {product.description}
          </p>

          {quantityInCart > 0 ? (
              <div className="flex flex-col sm:flex-row items-center gap-6 bg-sand border border-stone p-4">
              <div className="flex items-center w-full sm:w-auto justify-between border border-stone bg-white shrink-0">
                <button 
                  onClick={() => updateQuantity(product.id, quantityInCart - 1)}
                  className="w-12 h-12 flex items-center justify-center text-ink hover:bg-stone transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-sm font-medium">{quantityInCart}</span>
                <button 
                  onClick={() => updateQuantity(product.id, quantityInCart + 1)}
                  className="w-12 h-12 flex items-center justify-center text-ink hover:bg-stone transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-between">
                <div className="flex items-center gap-2 text-clay">
                  <Check className="w-5 h-5" />
                  <span className="text-sm uppercase tracking-widest text-ink font-medium hidden sm:block">In cart</span>
                </div>
                <Link 
                  to="/cart" 
                  className="w-full sm:w-auto bg-ink text-white py-3 px-8 text-sm font-medium uppercase tracking-widest hover:bg-clay transition-colors text-center shrink-0"
                >
                  Go to Cart
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleBuyNow}
                className="flex-1 py-5 text-sm font-medium uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 bg-ink text-white hover:bg-clay"
              >
                Buy Now
              </button>
              <button 
                onClick={handleAddToCart}
                className={`flex-1 py-5 text-sm font-medium uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${
                  added ? 'bg-clay text-white' : 'bg-transparent border border-ink text-ink hover:bg-stone'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" />
                    Added
                  </>
                ) : (
                  'Add to Cart'
                )}
              </button>
            </div>
          )}

          {/* Accordions */}
          <div className="mt-16 border-t border-stone">
            <Accordion 
              title="Details & Features" 
              isOpen={activeTab === 'details'} 
              onClick={() => setActiveTab(activeTab === 'details' ? '' as any : 'details')}
            >
              <p className="text-ink-light leading-relaxed mb-4">
                Designed with a focus on both aesthetics and function. This piece undergoes extensive quality control to ensure it meets our rigorous standards for modern living.
              </p>
              <ul className="list-disc pl-5 text-ink-light space-y-2">
                <li>Hand-finished surfaces</li>
                <li>Sustainable sourcing</li>
                <li>Designed for longevity</li>
              </ul>
            </Accordion>
            
            <Accordion 
              title="Dimensions" 
              isOpen={activeTab === 'dimensions'} 
              onClick={() => setActiveTab(activeTab === 'dimensions' ? '' as any : 'dimensions')}
            >
              <p className="text-ink-light leading-relaxed">
                Overall: {product.dimensions}<br/>
                Please ensure this item will clear your local doorways, stairs, and elevators before ordering.
              </p>
            </Accordion>
            
            <Accordion 
              title="Materials & Care" 
              isOpen={activeTab === 'materials'} 
              onClick={() => setActiveTab(activeTab === 'materials' ? '' as any : 'materials')}
            >
              <p className="text-ink-light leading-relaxed mb-4">
                Primary material: {product.materials}
              </p>
              <p className="text-ink-light leading-relaxed">
                Wipe clean with a soft, dry cloth. Avoid direct moisture, sunlight, and heat to preserve the finish.
              </p>
            </Accordion>
          </div>

        </motion.div>
      </div>
    </div>
  );
}

function Accordion({ title, children, isOpen, onClick }: { title: string, children: React.ReactNode, isOpen: boolean, onClick: () => void }) {
  return (
    <div className="border-b border-stone">
      <button 
        onClick={onClick}
        className="w-full py-6 flex justify-between items-center text-left"
      >
        <span className="font-serif text-xl">{title}</span>
        <motion.div
           animate={{ rotate: isOpen ? 180 : 0 }}
           transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-ink-light" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
