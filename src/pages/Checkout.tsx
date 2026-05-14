import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, CreditCard, Landmark, Smartphone, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useCart } from '../lib/CartContext';

type CheckoutStep = 'info' | 'payment' | 'success';
type PaymentMethod = 'mobile' | 'bank' | 'card';

export function Checkout() {
  const { cartTotal, items, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [step, setStep] = useState<CheckoutStep>('info');
  const [infoMethod, setInfoMethod] = useState<'login' | 'guest'>('guest');
  
  // Login states
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPass, setLoginPass] = useState('');
  
  // Checkout Info states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const deliveryAdvance = 50; // $50 advance
  const finalTotal = cartTotal + deliveryAdvance;

  const handleLoadInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginPhone && loginPass) {
      // Simulate loading info
      setName('John Doe');
      setPhone(loginPhone);
      setAddress('123 Modern Living Ave, New York, NY 10012');
      window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Information loaded successfully' }));
      setInfoMethod('guest');
    }
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone && address) {
      setStep('payment');
      window.scrollTo(0, 0);
    }
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      clearCart();
      window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Payment successful!' }));
      window.scrollTo(0, 0);
    }, 2000);
  };

  if (items.length === 0 && step !== 'success') {
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
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Your cart is empty</h1>
          <p className="text-ink-light mb-8 max-w-md">Return to shop to add items before checking out.</p>
          <Link to="/shop" className="bg-ink text-white px-8 py-4 text-sm font-medium uppercase tracking-widest hover:bg-clay transition-colors inline-block">
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-[70vh] flex flex-col lg:flex-row items-center justify-center gap-16">
        <div className="w-full lg:w-1/2">
          <img 
            src="https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80&w=1200" 
            alt="Modern living space" 
            className="w-full aspect-square md:aspect-[4/3] object-cover grayscale opacity-90"
          />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="w-20 h-20 bg-clay rounded-full flex items-center justify-center mb-8 text-white">
            <Check className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Thank You For Your Order</h1>
          <p className="text-ink-light mb-8 max-w-md">
            We've received your order and payment. You will receive an email confirmation shortly.
          </p>
          <Link to="/shop" className="bg-ink text-white px-8 py-4 text-sm font-medium uppercase tracking-widest hover:bg-clay transition-colors inline-block">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <div className="flex items-center justify-between mb-16 border-b border-stone pb-6">
        <h1 className="text-4xl md:text-5xl font-serif">Checkout</h1>
        <div className="flex items-center gap-4 text-sm uppercase tracking-widest font-medium text-ink-light hidden sm:flex">
          <span className={step === 'info' ? 'text-ink' : ''}>1. Information</span>
          <span className="w-8 h-px bg-stone hidden md:block"></span>
          <span className={step === 'payment' ? 'text-ink' : ''}>2. Payment</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2">
          
          <AnimatePresence mode="wait">
            {step === 'info' && (
              <motion.div
                key="info"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Login vs Guest toggle */}
                <div className="mb-12">
                  <div className="flex border border-stone">
                    <button 
                      onClick={() => setInfoMethod('login')}
                      className={`flex-1 py-4 text-xs font-medium uppercase tracking-widest transition-colors ${infoMethod === 'login' ? 'bg-ink text-white' : 'hover:bg-stone'}`}
                    >
                      Returning Customer
                    </button>
                    <button 
                      onClick={() => setInfoMethod('guest')}
                      className={`flex-1 py-4 text-xs font-medium uppercase tracking-widest transition-colors ${infoMethod === 'guest' ? 'bg-ink text-white' : 'hover:bg-stone'}`}
                    >
                      Guest Checkout
                    </button>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {infoMethod === 'login' ? (
                    <motion.form
                      key="login"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      onSubmit={handleLoadInfo}
                      className="bg-sand p-8 border border-stone mb-12"
                    >
                      <h2 className="font-serif text-2xl mb-2">Load Info Faster</h2>
                      <p className="text-ink-light text-sm mb-6">Enter your phone number and password to autofill your details.</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                        <div className="flex flex-col gap-2">
                          <label className="text-xs uppercase tracking-widest text-ink-light font-medium">Phone Number</label>
                          <input type="tel" required value={loginPhone} onChange={e => setLoginPhone(e.target.value)} className="border-b border-stone bg-transparent py-3 outline-none focus:border-clay" placeholder="(555) 000-0000" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-xs uppercase tracking-widest text-ink-light font-medium">Password</label>
                          <input type="password" required value={loginPass} onChange={e => setLoginPass(e.target.value)} className="border-b border-stone bg-transparent py-3 outline-none focus:border-clay" placeholder="••••••••" />
                        </div>
                      </div>
                      <button type="submit" className="bg-white border border-stone hover:border-ink hover:bg-ink hover:text-white px-8 py-3 text-xs uppercase tracking-widest font-medium transition-colors">
                        Load Details
                      </button>
                    </motion.form>
                  ) : null}
                </AnimatePresence>

                <form onSubmit={handleProceedToPayment}>
                  <h2 className="font-serif text-2xl mb-8">Shipping Information</h2>
                  
                  <div className="flex flex-col gap-8 mb-12">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest text-ink-light font-medium">Full Name *</label>
                      <input type="text" required value={name} onChange={e => setName(e.target.value)} className="border-b border-stone bg-transparent py-3 outline-none focus:border-clay transition-colors" placeholder="Jane Doe" />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest text-ink-light font-medium">Phone Number *</label>
                      <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} className="border-b border-stone bg-transparent py-3 outline-none focus:border-clay transition-colors" placeholder="+1 (555) 000-0000" />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest text-ink-light font-medium">Delivery Address *</label>
                      <textarea required rows={3} value={address} onChange={e => setAddress(e.target.value)} className="border-b border-stone bg-transparent py-3 outline-none focus:border-clay transition-colors resize-y" placeholder="Street, City, Zip Code"></textarea>
                    </div>
                  </div>

                  <div className="bg-[#B68D6A]/10 p-6 border border-[#B68D6A]/30 mb-8 flex items-start gap-4">
                    <ShieldCheck className="w-6 h-6 text-clay shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm mb-1 uppercase tracking-widest">Advance Delivery Charge</h4>
                      <p className="text-sm text-ink-light">An advance payment of ${deliveryAdvance} is required for delivery scheduling. The remainder of your total will be due. </p>
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-ink text-white py-4 text-sm font-medium uppercase tracking-widest hover:bg-clay transition-colors">
                    Proceed to Payment
                  </button>
                </form>

              </motion.div>
            )}

            {step === 'payment' && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                <button onClick={() => setStep('info')} className="flex items-center gap-2 text-xs uppercase tracking-widest text-ink-light hover:text-ink transition-colors mb-8">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Information
                </button>

                <h2 className="font-serif text-2xl mb-8">Select Payment Method</h2>

                <form onSubmit={handlePayment}>
                  <div className="flex flex-col gap-4 mb-12">
                    <label className={`border p-6 cursor-pointer flex items-center transition-all ${paymentMethod === 'card' ? 'border-clay bg-clay/5' : 'border-stone hover:border-ink/30'}`}>
                      <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="sr-only" />
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-4">
                          <CreditCard className="w-6 h-6 text-ink-light" />
                          <span className="font-medium text-sm uppercase tracking-widest">Credit / Debit Card</span>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'card' ? 'border-clay' : 'border-stone'}`}>
                          {paymentMethod === 'card' && <div className="w-2 h-2 bg-clay rounded-full"></div>}
                        </div>
                      </div>
                    </label>

                    <label className={`border p-6 cursor-pointer flex items-center transition-all ${paymentMethod === 'mobile' ? 'border-clay bg-clay/5' : 'border-stone hover:border-ink/30'}`}>
                      <input type="radio" name="payment" value="mobile" checked={paymentMethod === 'mobile'} onChange={() => setPaymentMethod('mobile')} className="sr-only" />
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-4">
                          <Smartphone className="w-6 h-6 text-ink-light" />
                          <span className="font-medium text-sm uppercase tracking-widest">Mobile Banking</span>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'mobile' ? 'border-clay' : 'border-stone'}`}>
                          {paymentMethod === 'mobile' && <div className="w-2 h-2 bg-clay rounded-full"></div>}
                        </div>
                      </div>
                    </label>

                    <label className={`border p-6 cursor-pointer flex items-center transition-all ${paymentMethod === 'bank' ? 'border-clay bg-clay/5' : 'border-stone hover:border-ink/30'}`}>
                      <input type="radio" name="payment" value="bank" checked={paymentMethod === 'bank'} onChange={() => setPaymentMethod('bank')} className="sr-only" />
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-4">
                          <Landmark className="w-6 h-6 text-ink-light" />
                          <span className="font-medium text-sm uppercase tracking-widest">Bank Transfer</span>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'bank' ? 'border-clay' : 'border-stone'}`}>
                          {paymentMethod === 'bank' && <div className="w-2 h-2 bg-clay rounded-full"></div>}
                        </div>
                      </div>
                    </label>
                  </div>

                  <AnimatePresence mode="popLayout">
                     {paymentMethod === 'card' && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-12 flex flex-col gap-6">
                           <input type="text" placeholder="Card Number" required className="border-b border-stone bg-transparent py-3 outline-none focus:border-clay" />
                           <div className="grid grid-cols-2 gap-6">
                             <input type="text" placeholder="MM/YY" required className="border-b border-stone bg-transparent py-3 outline-none focus:border-clay" />
                             <input type="text" placeholder="CVC" required className="border-b border-stone bg-transparent py-3 outline-none focus:border-clay" />
                           </div>
                           <input type="text" placeholder="Name on Card" required className="border-b border-stone bg-transparent py-3 outline-none focus:border-clay" />
                        </motion.div>
                     )}
                     {paymentMethod === 'mobile' && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-12">
                           <p className="text-ink-light text-sm">You will be redirected to your mobile banking app to complete the purchase securely.</p>
                        </motion.div>
                     )}
                     {paymentMethod === 'bank' && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-12">
                           <p className="text-ink-light text-sm">Please transfer the total amount to the following account:<br/><br/>
                             <strong className="text-ink">Oken Furniture Ltd.</strong><br/>
                             Routing: 000123456<br/>
                             Account: 987654321<br/><br/>
                             Your order will be processed once we confirm the transfer.
                           </p>
                        </motion.div>
                     )}
                  </AnimatePresence>

                  <button 
                    disabled={isProcessing}
                    type="submit" 
                    className="w-full bg-ink text-white py-4 text-sm font-medium uppercase tracking-widest hover:bg-clay transition-colors disabled:opacity-70 disabled:bg-stone disabled:text-ink cursor-pointer"
                  >
                    {isProcessing ? 'Processing Payment...' : `Pay $${finalTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                  </button>
                </form>

              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 border border-stone sticky top-32">
            <h2 className="font-serif text-2xl border-b border-stone pb-6 mb-6">Order Summary</h2>
            
            <div className="flex flex-col gap-6 mb-8 max-h-[300px] overflow-y-auto pr-2">
              {items.map(item => (
                 <div key={item.product.id} className="flex gap-4 items-start">
                    <div className="w-16 h-20 bg-stone shrink-0">
                       <img src={item.product.image} className="w-full h-full object-cover" alt={item.product.name} />
                    </div>
                    <div className="flex-1">
                       <h4 className="font-serif">{item.product.name}</h4>
                       <p className="text-xs text-ink-light uppercase tracking-widest mt-1">Qty: {item.quantity}</p>
                    </div>
                    <div className="font-medium text-sm">
                       ${(parseFloat(item.product.price.replace('$','').replace(',','')) * item.quantity).toLocaleString('en-US')}
                    </div>
                 </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 text-sm mb-6 border-t border-stone pt-6">
              <div className="flex justify-between text-ink-light">
                <span>Subtotal</span>
                <span>${cartTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-ink-light">
                <span>Advance Delivery Charge</span>
                <span>${deliveryAdvance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
            
            <div className="flex justify-between font-serif text-2xl border-t border-stone pt-6">
              <span>Total</span>
              <span>${finalTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
