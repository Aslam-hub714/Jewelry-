import React from 'react';
import { X, Play, Sparkles, ShieldCheck, Heart, Award } from 'lucide-react';
import { StellifyEmblem } from './StellifyLogo';

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-[#FAF7F2] rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#EEDEB8] my-6 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#EEDEB8] bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <StellifyEmblem size={36} color="#C59A45" />
            <div>
              <h3 className="font-serif text-xl font-bold text-[#241E1A]">The Story of Stellify</h3>
              <p className="text-xs text-[#6E5D4F]">Master goldsmithing & heirloom craftsmanship since 1988</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close story"
            className="w-8 h-8 rounded-full hover:bg-[#FAF7F2] flex items-center justify-center text-[#241E1A] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video / Visual Hero Banner */}
        <div className="relative aspect-video w-full bg-[#241E1A] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80"
            alt="Artisan goldsmith polishing diamond jewelry"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 text-white space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#DFC68A] font-semibold">
              Artisan Atelier Film
            </span>
            <h4 className="font-serif text-2xl sm:text-3xl font-bold">
              "Every curve is shaped by hand, every diamond set with passion."
            </h4>
          </div>
        </div>

        {/* Story Paragraphs & Pillars */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 bg-white">
          <div className="space-y-4 text-xs sm:text-sm text-[#6E5D4F] leading-relaxed">
            <p>
              Founded on the belief that fine jewelry should be a transcendent personal talisman, <strong className="text-[#241E1A]">Stellify</strong> unites timeless heritage goldsmithing with modern architectural silhouettes.
            </p>
            <p>
              Every single piece begins with 100% recycled 18K solid gold and ethically sourced stones verified by stringent environmental standards. Our master jewelers spend up to 40 meticulous hours hand-pronging, polishing, and perfecting every facet so it reflects light effortlessly.
            </p>
          </div>

          {/* 3 Core Commitments */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#FAF7F2]">
            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EEDEB8] space-y-1.5 text-center">
              <Sparkles className="w-6 h-6 text-[#C59A45] mx-auto" />
              <h5 className="font-serif text-sm font-bold text-[#241E1A]">100% Recycled Gold</h5>
              <p className="text-[11px] text-[#6E5D4F]">Zero mining footprint with solid 18K luster.</p>
            </div>

            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EEDEB8] space-y-1.5 text-center">
              <ShieldCheck className="w-6 h-6 text-[#C59A45] mx-auto" />
              <h5 className="font-serif text-sm font-bold text-[#241E1A]">Conflict-Free Gems</h5>
              <p className="text-[11px] text-[#6E5D4F]">Certified Kimberley Process & Lab Diamonds.</p>
            </div>

            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EEDEB8] space-y-1.5 text-center">
              <Award className="w-6 h-6 text-[#C59A45] mx-auto" />
              <h5 className="font-serif text-sm font-bold text-[#241E1A]">Lifetime Guarantee</h5>
              <p className="text-[11px] text-[#6E5D4F]">Complimentary annual inspection & repolish.</p>
            </div>
          </div>

          <div className="pt-2 text-center">
            <button
              onClick={onClose}
              className="px-8 py-3 rounded-full bg-[#C59A45] hover:bg-[#B08333] text-white font-semibold text-xs tracking-wider uppercase shadow-md transition-all cursor-pointer"
            >
              Explore The Collection
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
