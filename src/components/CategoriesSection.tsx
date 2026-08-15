import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/products';

interface CategoriesSectionProps {
  onSelectCategory: (categoryName: string) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ onSelectCategory }) => {
  return (
    <section id="categories-section" className="py-16 sm:py-20 bg-gradient-to-b from-[#FAF7F2] via-[#F5EEE2] to-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Golden Star Accents */}
        <div className="text-center space-y-3 mb-10 sm:mb-14">
          <div className="flex items-center justify-center gap-3">
            <span className="text-[#C59A45] text-sm">✦</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#241E1A] tracking-tight">
              Shop By Category
            </h2>
            <span className="text-[#C59A45] text-sm">✦</span>
          </div>

          {/* Underline Gold Accent Bar */}
          <div className="w-16 h-1 bg-[#C59A45] mx-auto rounded-full" />
          
          <p className="text-sm sm:text-base text-[#6E5D4F] max-w-lg mx-auto">
            Explore curated fine jewelry handcrafted with 18K solid gold, diamonds, and rare gemstones.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto gap-6 sm:gap-8">
          {CATEGORIES.map((category) => (
            <div
              key={category.id}
              id={`cat-card-${category.id}`}
              onClick={() => onSelectCategory(category.name)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-[#EEDEB8] shadow-sm hover:shadow-xl hover:border-[#C59A45] transition-all duration-300 flex flex-col transform hover:-translate-y-1.5"
            >
              {/* Category Image */}
              <div className="relative aspect-square w-full overflow-hidden bg-[#FAF7F2]">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Subtle sparkle badge on hover */}
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Sparkles className="w-3 h-3 text-[#C59A45]" />
                </div>
              </div>

              {/* Category Info (Exact layout: Title + Explore Now →) */}
              <div className="p-3.5 sm:p-4 text-center flex flex-col justify-between bg-white flex-1">
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#241E1A] group-hover:text-[#C59A45] transition-colors duration-200">
                  {category.name}
                </h3>
                
                <div className="mt-1 flex items-center justify-center gap-1 text-[11px] sm:text-xs font-semibold text-[#8C6424] group-hover:text-[#C59A45] transition-colors">
                  <span>Explore Now</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
