/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturePillars } from './components/FeaturePillars';
import { CategoriesSection } from './components/CategoriesSection';
import { BestSellers } from './components/BestSellers';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { RingSizerModal } from './components/RingSizerModal';
import { SearchModal } from './components/SearchModal';
import { StoryModal } from './components/StoryModal';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { Product, CartItem, MetalType } from './types';
import { Sparkles, Diamond, Shield, Award, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  // Initialize cart with 2 default luxury items (matching the '2' badge in the reference screenshot)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-init-1',
      product: PRODUCTS[0], // SHERISH (150 Taka)
      quantity: 1,
      selectedMetal: '18K Yellow Gold',
      selectedChainLength: '18 inch (Classic)'
    },
    {
      id: 'cart-init-2',
      product: PRODUCTS[1], // CHAROAL (79 Taka)
      quantity: 1,
      selectedMetal: '18K Yellow Gold'
    }
  ]);

  const [wishlist, setWishlist] = useState<Product[]>([PRODUCTS[1]]); // CHAROAL in wishlist
  const [activeSection, setActiveSection] = useState('home');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isRingSizerOpen, setIsRingSizerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);

  // Toast Helper
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Add to Cart Handlers
  const handleAddToCart = (
    product: Product,
    metal?: MetalType,
    quantity = 1,
    ringSize?: number,
    chainLength?: string,
    engraving?: string
  ) => {
    const chosenMetal = metal || product.metal;
    const existingIndex = cartItems.findIndex(
      item =>
        item.product.id === product.id &&
        item.selectedMetal === chosenMetal &&
        item.selectedRingSize === ringSize &&
        item.selectedChainLength === chainLength &&
        item.customEngraving === engraving
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += quantity;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        product,
        quantity,
        selectedMetal: chosenMetal,
        selectedRingSize: ringSize,
        selectedChainLength: chainLength,
        customEngraving: engraving
      };
      setCartItems(prev => [newItem, ...prev]);
    }

    showToast(`Added "${product.name}" to your shopping bag.`);
  };

  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.id === cartId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (cartId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== cartId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product: Product) => {
    const exists = wishlist.some(item => item.id === product.id);
    if (exists) {
      setWishlist(prev => prev.filter(item => item.id !== product.id));
      showToast(`Removed "${product.name}" from wishlist.`);
    } else {
      setWishlist(prev => [...prev, product]);
      showToast(`Added "${product.name}" to your wishlist.`);
      confetti({
        particleCount: 25,
        spread: 40,
        origin: { y: 0.8 },
        colors: ['#C59A45', '#EEDEB8']
      });
    }
  };

  const handleRemoveFromWishlist = (product: Product) => {
    setWishlist(prev => prev.filter(item => item.id !== product.id));
  };

  const handleMoveToCart = (product: Product) => {
    handleAddToCart(product);
  };

  // Quick View Modal
  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  // Category Selection
  const handleSelectCategory = (categoryName: string) => {
    showToast(`Filtered collection by "${categoryName}"`);
    const elem = document.getElementById('best-sellers-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Navigation Scrolling
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'shop' || sectionId === 'collections') {
      document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'about') {
      setIsStoryOpen(true);
    } else if (sectionId === 'blog' || sectionId === 'contact') {
      document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#241E1A] flex flex-col font-sans selection:bg-[#EEDEB8] selection:text-[#241E1A]">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-18 right-4 z-50 bg-[#241E1A] text-[#DFC68A] py-3 px-5 rounded-2xl shadow-xl border border-[#C59A45] flex items-center gap-3 animate-slideLeft text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-[#C59A45]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sticky Luxury Navbar */}
      <Navbar
        cartItems={cartItems}
        wishlist={wishlist}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenRingSizer={() => setIsRingSizerOpen(true)}
        onSelectCategory={handleSelectCategory}
        onOpenSearch={() => setIsSearchOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Page Contents */}
      <main className="flex-1">
        {/* 1. Hero Section (Exact match to top half of screenshot) */}
        <Hero
          onShopClick={() => {
            document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onWatchStory={() => setIsStoryOpen(true)}
        />

        {/* 2. Four Floating Feature Pillars (Exact match to middle pill in screenshot) */}
        <FeaturePillars />

        {/* 3. Shop By Category (Exact match to category cards in screenshot) */}
        <CategoriesSection onSelectCategory={handleSelectCategory} />

        {/* 4. Best Sellers (Exact match to best sellers carousel & cards in screenshot) */}
        <BestSellers
          products={PRODUCTS}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={(prod, metal) => handleAddToCart(prod, metal)}
          onQuickView={handleQuickView}
        />

        {/* 5. Haute Joaillerie Signature Showcase Banner */}
        <section className="py-16 bg-[#F6EFE3] border-y border-[#EEDEB8] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-[#241E1A] to-[#382F28] rounded-3xl p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#C59A45]/20 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 max-w-2xl space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C59A45]/20 border border-[#DFC68A]/40 text-[#DFC68A] text-xs font-semibold uppercase tracking-widest">
                  <Diamond className="w-3.5 h-3.5" />
                  <span>Private Atelier & Bespoke Craft</span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                  Handcrafted Elegance, Tailored to You
                </h3>

                <p className="text-sm sm:text-base text-[#D0C2B4] leading-relaxed">
                  Every Stellify heirloom piece is sculpted with precision from recycled 18K solid gold and hand-set certified diamonds. Experience bespoke personal engravings, custom chain lengths, and complimentary sizing.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => {
                      document.getElementById('best-sellers-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-7 py-3.5 rounded-full bg-[#C59A45] hover:bg-[#B08333] text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-2 shadow-lg transition-all cursor-pointer"
                  >
                    <span>Explore Featured Vault</span>
                  </button>

                  <button
                    onClick={() => setIsRingSizerOpen(true)}
                    className="px-6 py-3.5 rounded-full border border-[#DFC68A] hover:bg-white/10 text-white font-semibold text-xs tracking-wider uppercase transition-all cursor-pointer"
                  >
                    International Bangle Sizer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Verified Patron Reviews */}
        <ReviewsSection />
      </main>

      {/* 7. Footer (Exact match to bottom banner in screenshot + expanded footer) */}
      <Footer />

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        isInWishlist={selectedProduct ? wishlist.some(i => i.id === selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onOpenRingSizer={() => {
          setIsDetailModalOpen(false);
          setIsRingSizerOpen(true);
        }}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onMoveToCart={handleMoveToCart}
        onQuickView={handleQuickView}
      />

      <RingSizerModal
        isOpen={isRingSizerOpen}
        onClose={() => setIsRingSizerOpen(false)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={handleQuickView}
      />

      <StoryModal
        isOpen={isStoryOpen}
        onClose={() => setIsStoryOpen(false)}
      />

    </div>
  );
}
