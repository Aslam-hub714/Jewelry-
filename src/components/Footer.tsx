import React, { useState } from 'react';
import { 
  Diamond,
  Instagram, 
  Mail, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  Phone,
  MapPin,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { StellifyEmblem } from './StellifyLogo';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setSubscribed(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.9 },
      colors: ['#C59A45', '#EEDEB8', '#FFFFFF', '#DFC68A']
    });
  };

  return (
    <footer className="bg-[#FAF7F2] text-[#241E1A] border-t border-[#EEDEB8]">
      
      {/* 3-Column Luxury Feature Strip (EXACT MATCH to bottom banner in screenshot) */}
      <div className="bg-[#F6EFE3] border-b border-[#EEDEB8] py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center divide-y md:divide-y-0 md:divide-x divide-[#EEDEB8]">
          
          {/* Item 1: Crafted with Passion (Diamond icon) */}
          <div className="flex items-center gap-3.5 pr-0 md:pr-4">
            <div className="w-11 h-11 rounded-full bg-[#FAF7F2] border border-[#DFC68A] flex items-center justify-center shrink-0 shadow-2xs">
              <Diamond className="w-5 h-5 text-[#C59A45]" />
            </div>
            <div>
              <h5 className="font-serif text-sm font-bold text-[#241E1A]">
                Crafted with Passion
              </h5>
              <p className="text-xs text-[#6E5D4F]">
                Designed to shine, made to last.
              </p>
            </div>
          </div>

          {/* Item 2: Follow Us (Instagram icon) */}
          <div className="flex items-center gap-3.5 pt-4 md:pt-0 px-0 md:px-6">
            <div className="w-11 h-11 rounded-full bg-[#FAF7F2] border border-[#DFC68A] flex items-center justify-center shrink-0 shadow-2xs">
              <Instagram className="w-5 h-5 text-[#C59A45]" />
            </div>
            <div>
              <h5 className="font-serif text-sm font-bold text-[#241E1A]">
                Follow Us
              </h5>
              <a 
                href="#instagram" 
                onClick={(e) => { e.preventDefault(); alert("Opening @stellifyjewelry on Instagram"); }}
                className="text-xs text-[#8C6424] hover:text-[#C59A45] transition-colors"
              >
                @stellifyjewelry
              </a>
            </div>
          </div>

          {/* Item 3: Newsletter (Mail icon + Input + Send Button) */}
          <div className="pt-4 md:pt-0 pl-0 md:pl-6">
            <div className="flex items-center gap-3.5 mb-2">
              <div className="w-11 h-11 rounded-full bg-[#FAF7F2] border border-[#DFC68A] flex items-center justify-center shrink-0 shadow-2xs">
                <Mail className="w-5 h-5 text-[#C59A45]" />
              </div>
              <div>
                <h5 className="font-serif text-sm font-bold text-[#241E1A]">
                  Newsletter
                </h5>
                <p className="text-xs text-[#6E5D4F]">
                  Get updates & exclusive offers.
                </p>
              </div>
            </div>

            {/* Email Form */}
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs font-semibold text-[#8C6424] bg-white py-2 px-3 rounded-full border border-[#DFC68A]">
                <CheckCircle2 className="w-4 h-4 text-[#C59A45]" />
                <span>You're subscribed with 15% off code LUXE15!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center relative mt-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-white border border-[#DFC68A] text-[#241E1A] text-xs placeholder:text-[#A89887] py-2.5 pl-4 pr-12 rounded-full focus:outline-none focus:ring-2 focus:ring-[#C59A45]/30 focus:border-[#C59A45] shadow-xs"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="absolute right-1 w-8 h-8 rounded-full bg-[#B08333] hover:bg-[#C59A45] text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

      {/* Expanded Multi-Column Luxury Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Brand Intro */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <StellifyEmblem size={32} color="#C59A45" />
              <span className="font-serif text-2xl font-bold tracking-[0.16em] text-[#241E1A]">
                STELLIFY
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#6E5D4F] leading-relaxed max-w-sm">
              Crafting timeless memories in solid 18K gold, conflict-free certified diamonds, and hand-selected precious gems. Designed to be cherished through generations.
            </p>

            <div className="space-y-2 text-xs text-[#6E5D4F] pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C59A45]" />
                <span>Madison Avenue Flagship • New York, NY 10022</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C59A45]" />
                <span>+1 (800) 589-6721 (VIP Concierge)</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C59A45]" />
                <span>Mon – Sat: 10:00 AM – 7:00 PM EST</span>
              </div>
            </div>
          </div>

          {/* Quick Links: Collections */}
          <div className="space-y-3">
            <h6 className="font-serif text-sm font-bold text-[#241E1A] tracking-wider uppercase">
              Collections
            </h6>
            <ul className="space-y-2 text-xs text-[#6E5D4F]">
              <li><a href="#shop" className="hover:text-[#C59A45] transition-colors">SHERISH Bangles Suite</a></li>
              <li><a href="#shop" className="hover:text-[#C59A45] transition-colors">CHAROAL Statement Collection</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h6 className="font-serif text-sm font-bold text-[#241E1A] tracking-wider uppercase">
              Client Care
            </h6>
            <ul className="space-y-2 text-xs text-[#6E5D4F]">
              <li><a href="#care" className="hover:text-[#C59A45] transition-colors">International Bangle Sizer</a></li>
              <li><a href="#care" className="hover:text-[#C59A45] transition-colors">Track Your Order</a></li>
              <li><a href="#care" className="hover:text-[#C59A45] transition-colors">Free Insured Returns (30 Days)</a></li>
              <li><a href="#care" className="hover:text-[#C59A45] transition-colors">Lifetime Replating & Polish</a></li>
              <li><a href="#care" className="hover:text-[#C59A45] transition-colors">Jewelry Care Guide</a></li>
              <li><a href="#care" className="hover:text-[#C59A45] transition-colors">Custom Bespoke Inquiries</a></li>
            </ul>
          </div>

          {/* Ethics & Guarantee */}
          <div className="space-y-3">
            <h6 className="font-serif text-sm font-bold text-[#241E1A] tracking-wider uppercase">
              Our Promise
            </h6>
            <div className="space-y-2 text-xs text-[#6E5D4F]">
              <div className="flex items-start gap-2 bg-[#F6EFE3] p-2.5 rounded-xl border border-[#EEDEB8]">
                <ShieldCheck className="w-4 h-4 text-[#C59A45] shrink-0 mt-0.5" />
                <span>100% Conflict-Free Stones & Recycled 18K Solid Gold.</span>
              </div>
              <div className="flex items-start gap-2 bg-[#F6EFE3] p-2.5 rounded-xl border border-[#EEDEB8]">
                <Sparkles className="w-4 h-4 text-[#C59A45] shrink-0 mt-0.5" />
                <span>Certified Authenticity Certificate with every piece.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Payment Badges */}
        <div className="mt-12 pt-6 border-t border-[#EEDEB8] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C6424]">
          <p>© 2026 STELLIFY Fine Jewelry. All rights reserved. Handcrafted with devotion.</p>
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 bg-white border border-[#EEDEB8] rounded text-[10px] font-semibold text-[#241E1A]">VISA</span>
            <span className="px-2 py-1 bg-white border border-[#EEDEB8] rounded text-[10px] font-semibold text-[#241E1A]">Mastercard</span>
            <span className="px-2 py-1 bg-white border border-[#EEDEB8] rounded text-[10px] font-semibold text-[#241E1A]">AMEX</span>
            <span className="px-2 py-1 bg-white border border-[#EEDEB8] rounded text-[10px] font-semibold text-[#241E1A]">Apple Pay</span>
            <span className="px-2 py-1 bg-white border border-[#EEDEB8] rounded text-[10px] font-semibold text-[#241E1A]">PayPal</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
