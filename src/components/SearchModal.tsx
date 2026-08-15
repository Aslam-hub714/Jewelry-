import React, { useState, useMemo } from 'react';
import { X, Search, Sparkles, Star, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct
}) => {
  if (!isOpen) return null;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(200);

  const categories = ['All', 'SHERISH', 'CHAROAL'];

  const filteredResults = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.stoneType && p.stoneType.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesPrice = p.price <= maxPrice;

      return matchesSearch && matchesCat && matchesPrice;
    });
  }, [products, searchTerm, selectedCategory, maxPrice]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 md:p-10 animate-fadeIn">
      <div 
        className="relative bg-[#FAF7F2] rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#EEDEB8] my-6 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="p-6 border-b border-[#EEDEB8] bg-white space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-[#241E1A]">Search Stellify Vault</h3>
            <button
              onClick={onClose}
              aria-label="Close search"
              className="w-8 h-8 rounded-full hover:bg-[#FAF7F2] flex items-center justify-center text-[#241E1A] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-[#8C6424] absolute left-4 top-3.5" />
            <input
              type="text"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for petal necklaces, diamond rings, tennis bracelets..."
              className="w-full bg-[#FAF7F2] border border-[#DFC68A] rounded-2xl py-3 pl-12 pr-4 text-sm text-[#241E1A] placeholder:text-[#A89887] focus:outline-none focus:ring-2 focus:ring-[#C59A45]/30 focus:border-[#C59A45]"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-3.5 text-xs text-[#8C6424] hover:text-[#241E1A] cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#C59A45] text-white'
                    : 'bg-[#FAF7F2] text-[#6E5D4F] border border-[#EEDEB8] hover:border-[#DFC68A]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results List */}
        <div className="p-6 overflow-y-auto flex-1 space-y-3">
          <div className="text-xs text-[#8C6424] font-medium flex items-center justify-between">
            <span>Found {filteredResults.length} exquisite piece(s)</span>
          </div>

          {filteredResults.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <p className="font-serif text-lg font-bold text-[#241E1A]">No pieces found</p>
              <p className="text-xs text-[#6E5D4F]">Try searching for "gold", "petal", "ring", or "pendant".</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="bg-white p-3 rounded-2xl border border-[#EEDEB8] hover:border-[#C59A45] shadow-2xs hover:shadow-md transition-all flex items-center gap-3 cursor-pointer group"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-16 h-16 rounded-xl object-cover border border-[#FAF7F2] shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase tracking-wider text-[#8C6424] font-bold">
                      {product.category}
                    </span>
                    <h4 className="font-serif text-sm font-bold text-[#241E1A] group-hover:text-[#C59A45] truncate">
                      {product.name}
                    </h4>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs font-bold text-[#241E1A]">
                        ${product.price.toFixed(2)}
                      </span>
                      <div className="flex items-center text-[11px] text-[#D4AF37]">
                        <Star className="w-3 h-3 fill-[#D4AF37] mr-0.5" />
                        <span>{product.rating}.0</span>
                      </div>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-[#C59A45] group-hover:translate-x-1 transition-transform shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
