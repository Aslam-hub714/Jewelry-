import React from 'react';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { Product, MetalType } from '../types';

interface ProductCardProps {
  product: Product;
  isInWishlist: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, metal?: MetalType) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isInWishlist,
  onToggleWishlist,
  onAddToCart,
  onQuickView
}) => {
  return (
    <div 
      id={`product-card-${product.id}`}
      className="group relative bg-white rounded-2xl overflow-hidden border border-[#EEDEB8] shadow-sm hover:shadow-xl hover:border-[#DFC68A] transition-all duration-300 flex flex-col justify-between"
    >
      {/* Product Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#FAF7F2]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500 ease-out"
          onClick={() => onQuickView(product)}
        />

        {/* Badges (New / Best Seller) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 pointer-events-none">
          {product.isBestSeller && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#C59A45] text-white text-[10px] uppercase font-bold tracking-wider shadow-xs">
              Best Seller
            </span>
          )}
          {product.isNew && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#241E1A] text-[#DFC68A] text-[10px] uppercase font-bold tracking-wider shadow-xs">
              New In
            </span>
          )}
        </div>

        {/* Top-Right Wishlist Heart Button (Matches Screenshot) */}
        <button
          id={`wishlist-toggle-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer ${
            isInWishlist 
              ? 'bg-[#C59A45] text-white' 
              : 'bg-white/90 text-[#3E342B] hover:bg-white hover:text-[#C59A45]'
          }`}
        >
          <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-white' : 'stroke-[1.75]'}`} />
        </button>

        {/* Quick View Hover Overlay Button */}
        <div className="absolute inset-x-0 bottom-3 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <button
            id={`quick-view-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="pointer-events-auto px-4 py-1.5 rounded-full bg-[#241E1A]/90 backdrop-blur-xs text-white text-xs font-medium flex items-center gap-1.5 hover:bg-[#C59A45] transition-colors shadow-md cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Card Details (Matches screenshot format) */}
      <div className="p-4 bg-white flex flex-col justify-between flex-1">
        
        <div>
          {/* Product Name */}
          <h4 
            onClick={() => onQuickView(product)}
            className="font-serif text-base sm:text-lg font-bold text-[#241E1A] hover:text-[#C59A45] transition-colors duration-200 line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h4>

          {/* Rating Stars & Count (★★★★★ (128)) */}
          <div className="flex items-center gap-1.5 mt-1">
            <div className="flex text-[#D4AF37]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
              ))}
            </div>
            <span className="text-xs text-[#8C6424] font-medium">
              ({product.reviewsCount})
            </span>
          </div>
        </div>

        {/* Price & Add to Cart Action Row */}
        <div className="mt-3.5 pt-3 border-t border-[#FAF7F2] flex items-center justify-between">
          
          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-lg sm:text-xl font-bold text-[#241E1A]">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#A89887] line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Golden Add-to-Cart Circle Button (Matches the golden bag icon in the screenshot) */}
          <button
            id={`add-to-cart-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            title="Add to Shopping Bag"
            aria-label={`Add ${product.name} to cart`}
            className="w-9 h-9 rounded-full bg-[#C59A45] hover:bg-[#B08333] active:scale-95 text-white flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 stroke-[2]" />
          </button>

        </div>

      </div>
    </div>
  );
};
