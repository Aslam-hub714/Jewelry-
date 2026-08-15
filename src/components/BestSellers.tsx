import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Product, MetalType } from '../types';
import { ProductCard } from './ProductCard';

interface BestSellersProps {
  products: Product[];
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, metal?: MetalType) => void;
  onQuickView: (product: Product) => void;
}

export const BestSellers: React.FC<BestSellersProps> = ({
  products,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onQuickView
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filters = ['All', 'SHERISH', 'CHAROAL', 'MEHER', 'LUSTROUS'] as const;

  const filteredProducts = selectedFilter === 'All' 
    ? products 
    : products.filter(p => p.category === selectedFilter);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="best-sellers-section" className="py-16 sm:py-20 bg-[#FAF7F2] relative overflow-hidden">
      
      {/* Decorative Botanical / Leaf Outline in Top-Right & Bottom-Left (Matches Screenshot) */}
      <div className="absolute -top-12 -right-12 w-64 h-64 opacity-25 pointer-events-none text-[#C59A45]">
        <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M40,160 C80,140 120,90 160,30" />
          <path d="M120,90 C140,70 160,75 165,60 C160,50 140,55 120,90" />
          <path d="M90,120 C110,100 130,105 135,90 C130,80 110,85 90,120" />
          <path d="M60,145 C75,130 90,135 95,125 C90,115 75,120 60,145" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div className="space-y-1">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#241E1A] tracking-tight">
              Best Sellers
            </h2>
            <p className="text-sm sm:text-base text-[#6E5D4F]">
              Our most coveted fine jewelry icons, cherished worldwide.
            </p>
          </div>

          {/* Filter Pills & Navigation Arrows */}
          <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
            {/* Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    selectedFilter === filter
                      ? 'bg-[#C59A45] text-white shadow-xs'
                      : 'bg-white text-[#6E5D4F] hover:bg-[#F3EDE2] hover:text-[#241E1A] border border-[#EEDEB8]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Navigation Chevron Buttons (Matches the Golden Brown circle in the screenshot) */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => scroll('left')}
                aria-label="Previous products"
                className="w-10 h-10 rounded-full border border-[#EEDEB8] bg-white hover:bg-[#FAF7F2] text-[#241E1A] flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => scroll('right')}
                aria-label="Next products"
                className="w-10 h-10 rounded-full bg-[#B08333] hover:bg-[#C59A45] text-white flex items-center justify-center transition-colors shadow-md cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel / Product Cards Track (Matches the exact 5 items in the screenshot) */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="w-[260px] sm:w-[280px] lg:w-[285px] shrink-0 snap-start"
            >
              <ProductCard
                product={product}
                isInWishlist={wishlist.some(item => item.id === product.id)}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
