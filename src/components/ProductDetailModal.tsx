import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Heart, 
  ShoppingBag, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Ruler, 
  Check,
  Gift
} from 'lucide-react';
import { Product, MetalType } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isInWishlist: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (
    product: Product, 
    metal: MetalType, 
    quantity: number, 
    ringSize?: number, 
    chainLength?: string, 
    engraving?: string
  ) => void;
  onOpenRingSizer: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  isInWishlist,
  onToggleWishlist,
  onAddToCart,
  onOpenRingSizer
}) => {
  if (!isOpen || !product) return null;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedMetal, setSelectedMetal] = useState<MetalType>(product.metal);
  const [selectedRingSize, setSelectedRingSize] = useState<number | undefined>(product.ringSizes ? product.ringSizes[1] || product.ringSizes[0] : undefined);
  const [selectedChainLength, setSelectedChainLength] = useState<string | undefined>(product.chainLengthOptions ? product.chainLengthOptions[0] : undefined);
  const [engravingText, setEngravingText] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'shipping'>('details');

  const metalColors: Record<MetalType, { bg: string; border: string }> = {
    '18K Yellow Gold': { bg: 'bg-[#E5C158]', border: 'border-[#C59A45]' },
    '18K Rose Gold': { bg: 'bg-[#E8A598]', border: 'border-[#C97A6D]' },
    'Platinum': { bg: 'bg-[#E2E6EA]', border: 'border-[#9AA0A6]' },
    '14K White Gold': { bg: 'bg-[#EDEFEF]', border: 'border-[#B4B9BE]' }
  };

  const handleAddToCart = () => {
    onAddToCart(
      product,
      selectedMetal,
      quantity,
      selectedRingSize,
      selectedChainLength,
      engravingText ? engravingText.trim() : undefined
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      <div 
        className="relative bg-[#FAF7F2] rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-[#EEDEB8] my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close product modal"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#241E1A] hover:text-[#C59A45] flex items-center justify-center shadow-md transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          
          {/* Left Column: Image Gallery */}
          <div className="md:col-span-6 p-6 sm:p-8 bg-white flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#EEDEB8]">
            {/* Main Active Image */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#EEDEB8]">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              
              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1">
                {product.isBestSeller && (
                  <span className="px-2.5 py-1 rounded-full bg-[#C59A45] text-white text-[10px] uppercase font-bold tracking-wider shadow-xs">
                    Best Seller
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      selectedImageIndex === idx ? 'border-[#C59A45] shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} thumbnail`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Customization & Details */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div className="space-y-5">
              
              {/* Category & Title */}
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#8C6424] font-semibold">
                  {product.category}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#241E1A] mt-0.5">
                  {product.name}
                </h3>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex text-[#D4AF37]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>
                  <span className="text-xs text-[#8C6424] font-medium">
                    {product.rating}.0 ({product.reviewsCount} verified reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl font-bold text-[#241E1A]">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#A89887] line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="px-2 py-0.5 rounded-full bg-[#C59A45]/15 text-[#8C6424] text-xs font-semibold">
                  In Stock & Ready to Ship
                </span>
              </div>

              {/* Specifications / Custom Details (For SHERISH Bangles & Custom Collections) */}
              {product.customDetails && product.customDetails.length > 0 ? (
                <div className="space-y-3.5 py-2">
                  <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EEDEB8] space-y-3">
                    {product.customDetails.map((item, idx) => (
                      <div key={idx} className="text-xs leading-relaxed">
                        <span className="font-bold text-[#241E1A]">{item.label}: </span>
                        <span className="text-[#5C4D40]">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {/* Metal Selection */}
                  {product.availableMetals && product.availableMetals.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-[#241E1A]">Precious Metal:</span>
                        <span className="font-bold text-[#8C6424]">{selectedMetal}</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {product.availableMetals.map((metal) => {
                          const isSel = selectedMetal === metal;
                          const meta = metalColors[metal] || { bg: 'bg-[#C59A45]', border: 'border-[#C59A45]' };
                          return (
                            <button
                              key={metal}
                              onClick={() => setSelectedMetal(metal)}
                              className={`flex items-center gap-2 p-2 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                                isSel 
                                  ? 'border-[#C59A45] bg-[#FAF7F2] text-[#241E1A] shadow-xs' 
                                  : 'border-[#EEDEB8] bg-white text-[#6E5D4F] hover:border-[#DFC68A]'
                              }`}
                            >
                              <span className={`w-3.5 h-3.5 rounded-full ${meta.bg} border ${meta.border}`} />
                              <span className="truncate">{metal.replace('18K ', '').replace('14K ', '')}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Ring Sizes if applicable */}
                  {product.ringSizes && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-[#241E1A]">Ring Size (US):</span>
                        <button 
                          onClick={onOpenRingSizer}
                          className="text-[#8C6424] hover:text-[#C59A45] underline flex items-center gap-1 cursor-pointer"
                        >
                          <Ruler className="w-3.5 h-3.5" />
                          <span>Size Guide</span>
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {product.ringSizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedRingSize(size)}
                            className={`w-9 h-9 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                              selectedRingSize === size
                                ? 'bg-[#C59A45] text-white border-[#C59A45]'
                                : 'bg-white text-[#241E1A] border-[#EEDEB8] hover:border-[#DFC68A]'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Chain Length if applicable */}
                  {product.chainLengthOptions && (
                    <div className="space-y-2">
                      <span className="text-xs font-medium text-[#241E1A]">Chain Length:</span>
                      <div className="grid grid-cols-3 gap-2">
                        {product.chainLengthOptions.map((length) => (
                          <button
                            key={length}
                            onClick={() => setSelectedChainLength(length)}
                            className={`py-1.5 px-2 rounded-lg border text-center text-xs font-medium transition-all cursor-pointer ${
                              selectedChainLength === length
                                ? 'bg-[#C59A45] text-white border-[#C59A45]'
                                : 'bg-white text-[#6E5D4F] border-[#EEDEB8] hover:border-[#DFC68A]'
                            }`}
                          >
                            {length.split(' ')[0]} {length.split(' ')[1]}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Custom Monogram Engraving */}
                  <div className="space-y-1.5 bg-[#FAF7F2] p-3 rounded-xl border border-[#EEDEB8]">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#241E1A] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#C59A45]" />
                        <span>Free Bespoke Engraving (Optional)</span>
                      </span>
                      <span className="text-[10px] text-[#8C6424]">Max 10 chars</span>
                    </div>
                    <input
                      type="text"
                      maxLength={10}
                      value={engravingText}
                      onChange={(e) => setEngravingText(e.target.value)}
                      placeholder="e.g. A & N • 2026"
                      className="w-full bg-white border border-[#DFC68A] text-xs py-2 px-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C59A45]"
                    />
                  </div>

                  {/* Tabs: Description / Specs */}
                  <div className="space-y-3 pt-2">
                    <div className="flex border-b border-[#EEDEB8] gap-4 text-xs font-semibold">
                      <button 
                        onClick={() => setActiveTab('details')}
                        className={`pb-2 transition-colors cursor-pointer ${activeTab === 'details' ? 'text-[#C59A45] border-b-2 border-[#C59A45]' : 'text-[#6E5D4F]'}`}
                      >
                        Details
                      </button>
                      <button 
                        onClick={() => setActiveTab('specs')}
                        className={`pb-2 transition-colors cursor-pointer ${activeTab === 'specs' ? 'text-[#C59A45] border-b-2 border-[#C59A45]' : 'text-[#6E5D4F]'}`}
                      >
                        Specifications
                      </button>
                    </div>

                    {activeTab === 'details' ? (
                      <p className="text-xs text-[#6E5D4F] leading-relaxed">
                        {product.description}
                      </p>
                    ) : (
                      <div className="grid grid-cols-2 gap-2 text-xs text-[#6E5D4F]">
                        {product.caratWeight && <div><strong className="text-[#241E1A]">Carat:</strong> {product.caratWeight}</div>}
                        {product.stoneType && <div><strong className="text-[#241E1A]">Stone:</strong> {product.stoneType}</div>}
                        {product.dimensions && <div><strong className="text-[#241E1A]">Dimensions:</strong> {product.dimensions}</div>}
                        <div><strong className="text-[#241E1A]">Hallmark:</strong> 18K / AU750</div>
                      </div>
                    )}
                  </div>
                </>
              )}

            </div>

            {/* Bottom Actions: Quantity + Add to Cart + Wishlist */}
            <div className="pt-5 border-t border-[#EEDEB8] mt-4 flex items-center gap-3">
              {/* Quantity Counter */}
              <div className="flex items-center border border-[#DFC68A] bg-white rounded-full p-1 shrink-0">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[#241E1A] hover:bg-[#FAF7F2] font-bold text-sm cursor-pointer"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[#241E1A] hover:bg-[#FAF7F2] font-bold text-sm cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Primary Add to Bag Button */}
              <button
                id="modal-add-to-cart-btn"
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 rounded-full bg-gradient-to-r from-[#C59A45] to-[#B08333] hover:from-[#B08333] hover:to-[#C59A45] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Bag • ${(product.price * quantity).toFixed(2)}</span>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => onToggleWishlist(product)}
                aria-label="Wishlist toggle"
                className={`p-3.5 rounded-full border border-[#DFC68A] transition-colors cursor-pointer ${
                  isInWishlist ? 'bg-[#C59A45] text-white' : 'bg-white text-[#241E1A] hover:text-[#C59A45]'
                }`}
              >
                <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-white' : ''}`} />
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
