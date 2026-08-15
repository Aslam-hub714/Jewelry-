import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onMoveToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onMoveToCart,
  onQuickView
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div 
        className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between border-l border-[#EEDEB8] relative animate-slideLeft"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#EEDEB8] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#DFC68A] flex items-center justify-center">
              <Heart className="w-4 h-4 text-[#C59A45] fill-[#C59A45]" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#241E1A]">Your Wishlist</h3>
              <p className="text-[11px] text-[#8C6424]">{wishlist.length} saved treasure(s)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close wishlist"
            className="w-8 h-8 rounded-full hover:bg-[#FAF7F2] flex items-center justify-center text-[#241E1A] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {wishlist.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#DFC68A] flex items-center justify-center mx-auto text-[#C59A45]">
                <Heart className="w-8 h-8 stroke-[1.5]" />
              </div>
              <h4 className="font-serif text-xl font-bold text-[#241E1A]">Your Wishlist is Empty</h4>
              <p className="text-xs text-[#6E5D4F] max-w-xs mx-auto">
                Tap the heart icon on any jewelry piece to save it for later.
              </p>
            </div>
          ) : (
            wishlist.map((item) => (
              <div 
                key={item.id}
                className="bg-white p-3.5 rounded-2xl border border-[#EEDEB8] shadow-2xs flex gap-3.5"
              >
                <img
                  src={item.images[0]}
                  alt={item.name}
                  onClick={() => {
                    onQuickView(item);
                    onClose();
                  }}
                  className="w-20 h-20 rounded-xl object-cover border border-[#FAF7F2] shrink-0 cursor-pointer"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 
                        onClick={() => {
                          onQuickView(item);
                          onClose();
                        }}
                        className="font-serif text-sm font-bold text-[#241E1A] hover:text-[#C59A45] transition-colors cursor-pointer line-clamp-1"
                      >
                        {item.name}
                      </h4>
                      <button
                        onClick={() => onRemoveFromWishlist(item)}
                        aria-label="Remove from wishlist"
                        className="text-[#A89887] hover:text-red-600 transition-colors p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="text-[11px] text-[#8C6424] font-medium">{item.metal}</span>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#FAF7F2]">
                    <span className="font-serif text-sm font-bold text-[#241E1A]">
                      ${item.price.toFixed(2)}
                    </span>

                    <button
                      onClick={() => {
                        onMoveToCart(item);
                        onRemoveFromWishlist(item);
                      }}
                      className="px-3 py-1.5 rounded-full bg-[#C59A45] hover:bg-[#B08333] text-white text-xs font-medium flex items-center gap-1.5 shadow-2xs cursor-pointer"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlist.length > 0 && (
          <div className="p-5 bg-white border-t border-[#EEDEB8]">
            <button
              onClick={() => {
                wishlist.forEach(item => onMoveToCart(item));
                wishlist.forEach(item => onRemoveFromWishlist(item));
              }}
              className="w-full py-3 rounded-full bg-[#241E1A] hover:bg-[#C59A45] text-white font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Move All to Bag ({wishlist.length})</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
