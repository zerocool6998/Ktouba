
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { db, auth, googleProvider } from '../firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { signInWithPopup, onAuthStateChanged, User } from 'firebase/auth';
import emailjs from '@emailjs/browser';
import BookCover from './BookCover';

interface CheckoutProps {
  items: Product[];
  onBack: () => void;
  onOrderPlaced: (orderId: string) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ items, onBack, onOrderPlaced }) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const total = subtotal;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (!auth.currentUser) {
      setError("You must be logged in to complete a purchase.");
      setIsSubmitting(false);
      return;
    }

    try {
      const orderId = `order_${Date.now()}`;
      
      // Write a purchase record for each item
      for (const item of items) {
        const purchaseRef = doc(db, 'users', auth.currentUser.uid, 'purchases', item.id);
        await setDoc(purchaseRef, {
          bookId: item.id,
          purchasedAt: new Date().toISOString()
        });
      }
      
      // Send Email via EmailJS
      // Note: These are placeholder IDs. You must replace them with your actual EmailJS Service ID, Template ID, and Public Key.
      // Ideally, these should be in environment variables (e.g., import.meta.env.VITE_EMAILJS_SERVICE_ID)
      const serviceId = 'service_mfdwgot'; 
      const templateId = 'template_ndl1m34';
      const publicKey = 'v2UgLnLa2a6P_iVur';

      if (serviceId !== 'YOUR_SERVICE_ID') {
          try {
            const ready_message = items.length === 1 ? "Your ebook is ready for you." : "Your ebooks are ready for you.";
            const appUrl = window.location.origin;

            const templateParams = {
                to_email: email,
                to_name: `${firstName} ${lastName}`,
                order_id: orderId,
                order_date: new Date().toLocaleDateString(),
                ready_message: ready_message,
                total_amount: total,
                order_items: items.map(item => `${item.name} ($${item.price})`).join(', '),
                download_links: items.map(item => `${item.name}: ${appUrl} (Log in to read your book)`).join('\n'),
                shipping_address: `${address}, ${city}, ${postalCode}`
            };

            console.log("Attempting to send email with params:", templateParams);
            await emailjs.send(serviceId, templateId, templateParams, publicKey);
            console.log("Email sent successfully!");
          } catch (emailError: any) {
            console.error("EmailJS Error:", emailError);
            alert(`Email failed to send. Error: ${emailError.text || emailError.message || JSON.stringify(emailError)}`);
          }
      } else {
          console.warn("EmailJS not configured. Skipping email send.");
      }

      onOrderPlaced(orderId);
    } catch (err: any) {
      console.error("Error placing order:", err);
      setError(err.message || "There was an issue placing your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-24 px-6 bg-[#F5F2EB] animate-fade-in-up">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#A8A29E] hover:text-[#2C2A26] transition-colors mb-12"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Shop
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Form */}
          <div>
            <h1 className="text-3xl font-serif text-[#2C2A26] mb-4">Checkout</h1>
            
            {authLoading ? (
              <p className="text-[#5D5A53]">Loading...</p>
            ) : !user ? (
              <div className="bg-white p-8 border border-[#D6D1C7] text-center">
                <h2 className="text-xl font-serif text-[#2C2A26] mb-4">Please log in to continue</h2>
                <p className="text-[#5D5A53] mb-6">You need an account to access your digital books after purchase.</p>
                <button 
                  onClick={handleLogin}
                  className="bg-[#2C2A26] text-[#F5F2EB] px-8 py-3 text-sm font-medium uppercase tracking-widest hover:bg-[#1A1917] transition-colors"
                >
                  Log In with Google
                </button>
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Section 1: Contact */}
              <div>
                <h2 className="text-xl font-serif text-[#2C2A26] mb-6">Contact Information</h2>
                <div className="space-y-4">
                   <input 
                     type="email" 
                     placeholder="Email address" 
                     required
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] placeholder-[#A8A29E] outline-none focus:border-[#2C2A26] transition-colors" 
                   />
                   <div className="flex items-center gap-2">
                     <input type="checkbox" id="newsletter" className="accent-[#2C2A26]" />
                     <label htmlFor="newsletter" className="text-sm text-[#5D5A53]">Email me with news and offers</label>
                   </div>
                </div>
              </div>

              {/* Section 2: Billing */}
              <div>
                <h2 className="text-xl font-serif text-[#2C2A26] mb-6">Billing Address</h2>
                <div className="space-y-4">
                   <div className="grid grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        placeholder="First name" 
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] placeholder-[#A8A29E] outline-none focus:border-[#2C2A26] transition-colors" 
                      />
                      <input 
                        type="text" 
                        placeholder="Last name" 
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] placeholder-[#A8A29E] outline-none focus:border-[#2C2A26] transition-colors" 
                      />
                   </div>
                   <input 
                     type="text" 
                     placeholder="Address" 
                     required
                     value={address}
                     onChange={(e) => setAddress(e.target.value)}
                     className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] placeholder-[#A8A29E] outline-none focus:border-[#2C2A26] transition-colors" 
                   />
                   <div className="grid grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        placeholder="City" 
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] placeholder-[#A8A29E] outline-none focus:border-[#2C2A26] transition-colors" 
                      />
                      <input 
                        type="text" 
                        placeholder="Postal code" 
                        required
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] placeholder-[#A8A29E] outline-none focus:border-[#2C2A26] transition-colors" 
                      />
                   </div>
                </div>
              </div>

               {/* Section 3: Payment (Mock) */}
              <div>
                <h2 className="text-xl font-serif text-[#2C2A26] mb-6">Payment</h2>
                <div className="p-6 border border-[#D6D1C7] bg-white/50 space-y-4">
                   <p className="text-sm text-[#5D5A53] mb-2">Payment is handled via email invoice.</p>
                   <p className="text-sm text-[#5D5A53]">After placing your order, you will receive an email with payment instructions.</p>
                </div>
              </div>

              {error && <div className="text-red-500 text-sm">{error}</div>}

              <div>
                <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-5 bg-[#2C2A26] text-[#F5F2EB] uppercase tracking-widest text-sm font-medium hover:bg-[#4A4844] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Processing...' : `Place Order — $${total}`}
                </button>
              </div>
            </form>
            )}
          </div>

          {/* Right Column: Summary */}
          <div className="lg:pl-12 lg:border-l border-[#D6D1C7]">
            <h2 className="text-xl font-serif text-[#2C2A26] mb-8">Order Summary</h2>
            
            <div className="space-y-6 mb-8">
               {items.map((item, idx) => (
                 <div key={idx} className="flex gap-4">
                    <div className="w-16 h-16 bg-[#EBE7DE] relative">
                       {item.imageUrl === 'COVER_COMPONENT' ? (
                         <div className="w-full h-full overflow-hidden">
                           <BookCover variant="thumbnail" />
                         </div>
                       ) : (
                         <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                       )}
                       <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#2C2A26] text-white text-[10px] flex items-center justify-center rounded-full">1</span>
                    </div>
                    <div className="flex-1">
                       <h3 className="font-serif text-[#2C2A26] text-base">{item.name}</h3>
                       <p className="text-xs text-[#A8A29E]">{item.category}</p>
                    </div>
                    <span className="text-sm text-[#5D5A53]">${item.price}</span>
                 </div>
               ))}
            </div>

            <div className="border-t border-[#D6D1C7] pt-6 space-y-2">
              <div className="flex justify-between text-sm text-[#5D5A53]">
                 <span>Subtotal</span>
                 <span>${subtotal}</span>
              </div>
            </div>
            
            <div className="border-t border-[#D6D1C7] mt-6 pt-6">
               <div className="flex justify-between items-center">
                 <span className="font-serif text-xl text-[#2C2A26]">Total</span>
                 <div className="flex items-end gap-2">
                   <span className="text-xs text-[#A8A29E] mb-1">USD</span>
                   <span className="font-serif text-2xl text-[#2C2A26]">${total}</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;