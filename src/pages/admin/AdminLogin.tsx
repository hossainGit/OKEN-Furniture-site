import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';

export function AdminLogin() {
  const [email, setEmail] = useState('admin@oken.com');
  const [password, setPassword] = useState('admin123');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Logged in successfully' }));
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-sand flex font-sans">
      <div className="hidden lg:block lg:w-1/2 relative">
        <img 
          src="https://i.pinimg.com/1200x/3a/84/c4/3a84c4768fc03f007c62b7c86f7ba198.jpg" 
          alt="Modern furniture detail" 
          className="w-full h-full object-cover grayscale contrast-125 opacity-90"
        />
        <div className="absolute inset-0 bg-ink/20"></div>
        <div className="absolute bottom-12 left-12 max-w-md text-white">
          <h2 className="font-serif text-4xl mb-4">Oken Administration</h2>
          <p className="text-white/80 font-medium">Manage orders, inventory, and customer experiences beautifully.</p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 md:p-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white p-8 md:p-12 border border-stone shadow-sm text-center"
        >
          <div className="w-16 h-16 bg-stone mx-auto flex items-center justify-center mb-6 rounded-full text-ink">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-3xl mb-2">Admin Portal</h1>
          <p className="text-ink-light text-sm mb-8">Sign in to access the dashboard</p>

          <form onSubmit={handleLogin} className="flex flex-col gap-6 text-left">
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-ink-light font-medium">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="border-b border-stone bg-transparent py-3 outline-none focus:border-clay transition-colors"
                required 
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-ink-light font-medium">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="border-b border-stone bg-transparent py-3 outline-none focus:border-clay transition-colors"
                required 
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-ink text-white py-4 mt-4 text-sm font-medium uppercase tracking-widest hover:bg-clay transition-colors"
            >
              Access Dashboard
            </button>
          </form>
          
          <button 
            onClick={() => navigate('/')} 
            className="mt-8 text-xs text-ink-light uppercase tracking-widest hover:text-ink transition-colors"
          >
            Return to Storefront
          </button>
        </motion.div>
      </div>
    </div>
  );
}
