import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate sending email
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16 md:mb-24 text-center max-w-2xl mx-auto"
      >
        <span className="text-xs uppercase tracking-widest text-[#B68D6A] font-medium mb-4 block">Get in Touch</span>
        <h1 className="text-5xl md:text-6xl font-serif mb-6 leading-tight">We're here to help</h1>
        <p className="text-ink-light leading-relaxed">
          Whether you have a question about our products, need design advice, or want to discuss a custom order, our team is ready to assist you.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24">
        {/* Contact Information & Map */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <h3 className="font-serif text-xl border-b border-stone pb-2">Visit Us</h3>
              <div className="flex items-start gap-3 text-ink-light">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                <p>123 Design Avenue<br/>Furniture District<br/>New York, NY 10012</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-serif text-xl border-b border-stone pb-2">Contact Info</h3>
              <div className="flex items-center gap-3 text-ink-light">
                <Phone className="w-5 h-5 shrink-0" />
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center gap-3 text-ink-light">
                <Mail className="w-5 h-5 shrink-0" />
                <p>hello@okenfurniture.com</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 md:col-span-2 mt-4">
              <h3 className="font-serif text-xl border-b border-stone pb-2">Showroom Hours</h3>
              <div className="flex items-start gap-3 text-ink-light">
                <Clock className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <p>Monday - Friday: 10am - 7pm</p>
                  <p>Saturday: 10am - 6pm</p>
                  <p>Sunday: 11am - 5pm</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-80 bg-stone overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m2!1s0x89c25990b7e289df%3A0xc6cb1e8b15d2a2a0!2sSoHo%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1715421532152!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Oken Showroom Location"
              className="grayscale contrast-125 opacity-90"
            ></iframe>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white p-8 md:p-12 shadow-sm border border-stone"
        >
          <h2 className="text-3xl font-serif mb-8">Send a Message</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-xs uppercase tracking-widest font-medium text-ink-light">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                required
                className="border-b border-stone py-3 outline-none focus:border-clay transition-colors bg-transparent"
                placeholder="Jane Doe"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs uppercase tracking-widest font-medium text-ink-light">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                required
                className="border-b border-stone py-3 outline-none focus:border-clay transition-colors bg-transparent"
                placeholder="jane@example.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="text-xs uppercase tracking-widest font-medium text-ink-light">Subject</label>
              <input 
                type="text" 
                id="subject" 
                name="subject" 
                value={formData.subject}
                onChange={handleChange}
                required
                className="border-b border-stone py-3 outline-none focus:border-clay transition-colors bg-transparent"
                placeholder="Product Inquiry"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-xs uppercase tracking-widest font-medium text-ink-light">Message</label>
              <textarea 
                id="message" 
                name="message" 
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="border-b border-stone py-3 outline-none focus:border-clay transition-colors bg-transparent resize-y"
                placeholder="How can we help you?"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              disabled={status === 'submitting'}
              className="mt-4 w-full bg-ink text-white text-sm font-medium uppercase tracking-widest py-4 hover:bg-clay transition-colors disabled:opacity-70"
            >
              {status === 'submitting' ? 'Sending...' : status === 'success' ? 'Message Sent' : 'Send Message'}
            </button>

            {status === 'success' && (
              <p className="text-sm text-green-600 text-center mt-2">Thank you! We'll get back to you shortly.</p>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
}
