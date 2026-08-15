import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  Gift, 
  ShieldCheck,
  Tag,
  Check
} from 'lucide-react';
import { CartItem } from '../types';
import confetti from 'canvas-confetti';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('LUXE15');
  const [promoApplied, setPromoApplied] = useState(true);
  const [promoDiscountRate, setPromoDiscountRate] = useState(0.15);
  const [giftBox, setGiftBox] = useState(true);
  const [giftNote, setGiftNote] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const rawSubtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discountAmount = promoApplied ? rawSubtotal * promoDiscountRate : 0;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount);

  const freeShippingThreshold = 150;
  const freeShippingProgress = Math.min(100, (rawSubtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'LUXE15') {
      setPromoApplied(true);
      setPromoDiscountRate(0.15);
    } else if (promoCode.trim().toUpperCase() === 'VIP20') {
      setPromoApplied(true);
      setPromoDiscountRate(0.20);
    } else {
      alert("Invalid coupon. Try 'LUXE15' for 15% off!");
    }
  };

  const handleCompleteOrder = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#C59A45', '#EEDEB8', '#DFC68A', '#D4AF37', '#FAF7F2']
      });
    }, 1500);
  };

  const handleFinishAndReset = () => {
    onClearCart();
    setOrderComplete(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div 
        className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between border-l border-[#EEDEB8] relative animate-slideLeft"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#EEDEB8] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#DFC68A] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-[#C59A45]" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#241E1A]">Your Shopping Bag</h3>
              <p className="text-[11px] text-[#8C6424]">{cartItems.length} unique fine item(s)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="w-8 h-8 rounded-full hover:bg-[#FAF7F2] flex items-center justify-center text-[#241E1A] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#F6EFE3] px-5 py-3 border-b border-[#EEDEB8]">
          <div className="flex items-center justify-between text-xs text-[#241E1A] mb-1.5 font-medium">
            <span>
              {rawSubtotal >= freeShippingThreshold ? (
                <strong className="text-[#8C6424] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#C59A45]" /> You unlocked Complimentary Insured Express Shipping!
                </strong>
              ) : (
                <>Add <strong>${(freeShippingThreshold - rawSubtotal).toFixed(2)}</strong> more for Free Worldwide Express</>
              )}
            </span>
          </div>
          <div className="w-full bg-[#EEDEB8] h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-[#C59A45] h-full rounded-full transition-all duration-500" 
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Drawer Body: Items List or Empty State */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {orderComplete ? (
            /* Order Success State */
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#C59A45]/20 border border-[#C59A45] text-[#C59A45] flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-[#241E1A]">Order Confirmed!</h4>
              <p className="text-xs text-[#6E5D4F] max-w-xs mx-auto leading-relaxed">
                Thank you for selecting Stellify. Your handcrafted pieces are being prepared in our signature velvet packaging. Confirmation has been dispatched.
              </p>
              <div className="bg-white p-3 rounded-xl border border-[#EEDEB8] text-xs text-[#8C6424]">
                Order Reference: <strong>#ST-{Math.floor(100000 + Math.random() * 900000)}</strong>
              </div>
              <button
                onClick={handleFinishAndReset}
                className="w-full py-3 rounded-full bg-[#C59A45] text-white font-semibold text-xs tracking-wider uppercase shadow-md cursor-pointer hover:bg-[#B08333]"
              >
                Continue Exploring
              </button>
            </div>
          ) : cartItems.length === 0 ? (
            /* Empty Cart State */
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#DFC68A] flex items-center justify-center mx-auto text-[#C59A45]">
                <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
              </div>
              <h4 className="font-serif text-xl font-bold text-[#241E1A]">Your Bag is Empty</h4>
              <p className="text-xs text-[#6E5D4F] max-w-xs mx-auto">
                Explore our fine jewelry icons to begin your bespoke collection.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-[#C59A45] text-white text-xs font-semibold uppercase tracking-wider shadow-sm cursor-pointer hover:bg-[#B08333]"
              >
                Discover Best Sellers
              </button>
            </div>
          ) : (
            /* Cart Item Rows */
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white p-3.5 rounded-2xl border border-[#EEDEB8] shadow-2xs flex gap-3.5 relative"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-xl object-cover border border-[#FAF7F2] shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-sm font-bold text-[#241E1A] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          aria-label="Remove item"
                          className="text-[#A89887] hover:text-red-600 transition-colors p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#8C6424] mt-0.5 space-y-0.5">
                        <p>Metal: <span className="font-medium text-[#241E1A]">{item.selectedMetal}</span></p>
                        {item.selectedRingSize && <p>Size: <span className="font-medium text-[#241E1A]">{item.selectedRingSize}</span></p>}
                        {item.selectedChainLength && <p>Chain: <span className="font-medium text-[#241E1A]">{item.selectedChainLength.split(' ')[0]}</span></p>}
                        {item.customEngraving && <p className="italic text-[#C59A45]">Engraved: "{item.customEngraving}"</p>}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#FAF7F2]">
                      {/* Quantity Buttons */}
                      <div className="flex items-center border border-[#DFC68A] rounded-full p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold hover:bg-[#FAF7F2] cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold hover:bg-[#FAF7F2] cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-serif text-sm font-bold text-[#241E1A]">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Complimentary Gift Box Option */}
              <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-[#EEDEB8] space-y-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#241E1A]">
                  <input
                    type="checkbox"
                    checked={giftBox}
                    onChange={(e) => setGiftBox(e.target.checked)}
                    className="accent-[#C59A45] w-4 h-4 rounded"
                  />
                  <Gift className="w-4 h-4 text-[#C59A45]" />
                  <span>Complimentary Signature Velvet Gift Box & Ribbon</span>
                </label>
                {giftBox && (
                  <input
                    type="text"
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    placeholder="Add a handwritten gift note (optional)..."
                    className="w-full bg-white border border-[#DFC68A] text-xs p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C59A45]"
                  />
                )}
              </div>

              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-[#8C6424] absolute left-3 top-3" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Coupon Code"
                    className="w-full bg-white border border-[#DFC68A] text-xs py-2 pl-8 pr-3 rounded-xl uppercase font-semibold focus:outline-none focus:ring-1 focus:ring-[#C59A45]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#241E1A] text-white text-xs font-semibold rounded-xl hover:bg-[#C59A45] transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Drawer Footer: Totals & Checkout CTA */}
        {!orderComplete && cartItems.length > 0 && (
          <div className="p-5 bg-white border-t border-[#EEDEB8] space-y-3">
            <div className="space-y-1.5 text-xs text-[#6E5D4F]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#241E1A]">${rawSubtotal.toFixed(2)}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-[#8C6424] font-medium">
                  <span>VIP Promo ({promoDiscountRate * 100}% off - {promoCode})</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Insured Worldwide Shipping</span>
                <span className="text-[#8C6424] font-semibold">FREE</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#FAF7F2] font-serif text-base font-bold text-[#241E1A]">
                <span>Total Amount</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              id="checkout-proceed-btn"
              disabled={isCheckingOut}
              onClick={handleCompleteOrder}
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#C59A45] via-[#B08333] to-[#C59A45] hover:shadow-lg text-white font-semibold text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              {isCheckingOut ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Securing Order...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Secure Checkout • ${finalTotal.toFixed(2)}</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
