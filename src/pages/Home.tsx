import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, ShoppingBag, Check } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../lib/data';
import { useCart } from '../lib/CartContext';

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 px-6 md:px-12 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10">
        
        <div className="flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 flex items-center gap-4"
          >
            <span className="w-12 h-px bg-ink"></span>
            <span className="text-xs font-medium uppercase tracking-widest text-ink-light">New Collection 2026</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-9xl font-serif leading-[0.9] tracking-tight mb-8"
          >
            Form <br/><span className="text-clay italic">meets</span><br/> Function
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="max-w-md text-ink-light text-lg mb-10 leading-relaxed"
          >
            Discover our curated series of modern minimalist furniture designed for everyday living and built to endure.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link to="/shop" className="inline-flex group items-center gap-4 text-sm font-medium uppercase tracking-widest text-ink hover:text-clay transition-colors border-b border-ink/20 hover:border-clay pb-2">
              Explore Collection
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[60vh] md:h-[80vh] w-full"
        >
          <div className="absolute inset-0 bg-stone rounded-tl-[100px] rounded-br-[100px] md:rounded-[400px] overflow-hidden">
            <motion.img 
               initial={{ scale: 1.1 }}
               animate={{ scale: 1 }}
               transition={{ duration: 2, ease: "easeOut" }}
               src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=2000" 
               alt="Modern living room setup" 
               className="w-full h-full object-cover"
            />
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="absolute -bottom-6 -left-6 md:bottom-12 md:-left-12 bg-white p-6 rounded-full w-32 h-32 flex flex-col items-center justify-center shadow-xl z-20"
          >
            <span className="text-xl font-serif">100%</span>
            <span className="text-[10px] uppercase tracking-widest text-center mt-1">Sustainable<br/> Materials</span>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

function CategorySection() {
  return (
    <section className="py-24 px-6 md:px-12 border-t border-stone">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-4xl md:text-5xl font-serif">Curated Spaces</h2>
          <Link to="/spaces" className="hidden md:flex text-sm uppercase tracking-widest underline underline-offset-4 hover:text-clay transition-colors">View All Spaces</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((category, index) => (
            <Link to={category.link} key={category.name}>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer relative aspect-[3/4] overflow-hidden"
              >
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                <div className="absolute bottom-0 left-0 p-8 flex w-full items-end justify-between">
                  <span className="text-white font-serif text-2xl">{category.name}</span>
                  <span className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:-translate-y-1 group-hover:translate-x-1">
                    <ArrowUpRight className="w-5 h-5" />
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrendingProducts() {
  const { addToCart } = useCart();
  const [addedItem, setAddedItem] = useState<number | null>(null);

  const handleQuickAdd = (e: React.MouseEvent, product: typeof PRODUCTS[0]) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id);
    setAddedItem(product.id);
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `${product.name} added to cart` }));
    setTimeout(() => setAddedItem(null), 2000);
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Trending Now</h2>
            <p className="text-ink-light">Pieces that bring warmth and character into your home. Hand-selected based on what our community loves most.</p>
          </div>
          <Link to="/shop" className="group flex items-center gap-2 text-sm font-medium uppercase tracking-widest bg-ink text-white px-8 py-4 hover:bg-clay transition-colors">
            Shop Collection
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {PRODUCTS.slice(0, 6).map((product, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: (index % 3) * 0.15 }}
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
        </div>
      </div>
    </section>
  );
}

function Craftsmanship() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-ink text-sand overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative aspect-square md:aspect-[4/5]"
        >
          <img 
            src="https://images.unsplash.com/photo-1611021061285-16c871740efa?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Craftsmanship detail" 
            className="w-full h-full object-cover rounded-tl-[100px] rounded-br-[100px]"
          />
        </motion.div>
        
        <div className="flex flex-col justify-center">
          <motion.span 
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-widest text-[#B68D6A] mb-6 block"
          >
            Our Philosophy
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-7xl font-serif mb-8 leading-tight"
          >
            Built to last <br/> <i className="text-[#B68D6A]">generations</i>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sand/70 text-lg mb-10 max-w-lg leading-relaxed"
          >
            We believe in honest materials, thoughtful design, and expert craftsmanship. Every piece is made by skilled artisans using sustainably sourced wood designed to age beautifully in your home.
          </motion.p>
          
           <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.6 }}
           >
            <Link to="#" className="inline-flex items-center gap-4 text-sm font-medium uppercase tracking-widest border-b border-sand/30 hover:border-[#B68D6A] hover:text-[#B68D6A] pb-2 transition-colors">
              Read Our Story
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function Home() {
  return (
    <>
      <Hero />
      <CategorySection />
      <TrendingProducts />
      <Craftsmanship />
    </>
  );
}
