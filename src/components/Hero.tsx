import React from 'react';
import { ArrowRight, Play, Sparkles } from 'lucide-react';

interface HeroProps {
  onShopClick: () => void;
  onWatchStory: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onWatchStory }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F6EFE3] to-[#FAF7F2] pt-4 pb-12 lg:pt-10 lg:pb-20">
      {/* Subtle Background Glow Ornaments */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#EEDEB8]/30 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#DFC68A]/20 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left space-y-6 md:space-y-8 pr-0 lg:pr-4">
            
            {/* Elegant Heading Section */}
            <div className="space-y-1.5 md:space-y-2">
              <span className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#B08333] font-normal tracking-wide block">
                Handcrafted with Soul,
              </span>
              
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-[#241E1A] tracking-tight leading-[1.08] relative">
                Timeless Beauty <br className="hidden sm:block" />
                <span className="relative inline-block text-[#241E1A]">
                  Made For You
                  {/* Golden Sparkle Star Ornament */}
                  <span className="inline-flex items-center ml-2 text-[#C59A45] align-middle">
                    <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-[#C59A45] fill-[#C59A45]/30 animate-pulse inline" />
                  </span>
                </span>
              </h1>
            </div>

            {/* Golden Ornamental Divider */}
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-gradient-to-r from-[#C59A45] to-transparent" />
              <span className="text-[#C59A45] text-xs font-serif">✦</span>
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#C59A45] to-transparent" />
              <span className="text-[#C59A45] text-xs font-serif">✦</span>
              <div className="h-px w-12 bg-gradient-to-l from-[#C59A45] to-transparent" />
            </div>

            {/* Subtitle Description */}
            <p className="text-base sm:text-lg text-[#635345] font-normal leading-relaxed max-w-xl">
              Each piece carries a story of its own, shaped by hands that know patience, poured into gold that never rushes itself. Let your style speak uniquely.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
              {/* Primary Golden Button */}
              <button
                id="hero-shop-collection-btn"
                onClick={onShopClick}
                className="group px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#C59A45] via-[#B08333] to-[#C59A45] text-white font-medium tracking-wider text-sm sm:text-base shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-3 cursor-pointer"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              {/* Secondary Play Story Button */}
              <button
                id="hero-watch-story-btn"
                onClick={onWatchStory}
                className="group px-5 py-3.5 rounded-full text-[#3E342B] hover:text-[#C59A45] font-medium tracking-wide text-sm sm:text-base flex items-center gap-3 transition-colors duration-200 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full border border-[#C59A45] flex items-center justify-center bg-[#FAF7F2] group-hover:bg-[#C59A45] group-hover:text-white transition-all duration-300 shadow-2xs">
                  <Play className="w-4 h-4 text-[#C59A45] group-hover:text-white fill-[#C59A45] group-hover:fill-white ml-0.5" />
                </div>
                <span>Watch Our Story</span>
              </button>
            </div>

            {/* Social Trust Indicators */}
            <div className="flex items-center gap-4 pt-4 border-t border-[#EEDEB8]/50">
              <div className="flex -space-x-2">
                <img
                  className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-xs"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                  alt="Stellify Patron"
                  referrerPolicy="no-referrer"
                />
                <img
                  className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-xs"
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80"
                  alt="Stellify Patron"
                  referrerPolicy="no-referrer"
                />
                <img
                  className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-xs"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                  alt="Stellify Patron"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-xs text-[#635345]">
                <div className="flex text-[#C59A45] text-xs font-semibold">
                  ★★★★★
                </div>
                <span>Over <strong>15,000+</strong> bespoke pieces crafted</span>
              </div>
            </div>

          </div>

          {/* Right Column: Handcrafted Bangles Visual Showcase */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            <div className="relative w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[440px] mx-auto">
              
              {/* Soft Golden Halos */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#DFC68A]/30 via-[#C59A45]/15 to-transparent rounded-[32px] filter blur-xl -z-10" />

              {/* Main Image Frame displaying full picture without cropping */}
              <div className="relative rounded-[24px] overflow-hidden border border-[#EEDEB8] shadow-2xl bg-[#1C1714] group h-[520px] sm:h-[600px] lg:h-[640px] flex items-center justify-center">
                <img 
                  src="/hero_handcrafted_bangles_17867998484913.jpg" 
                  alt="Handcrafted luxury bangles collection showcase" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>

              {/* Subtle floating gold sparkle ornament */}
              <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#DFC68A] shadow-md flex items-center justify-center text-[#C59A45] animate-bounce duration-1000">
                ✦
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
