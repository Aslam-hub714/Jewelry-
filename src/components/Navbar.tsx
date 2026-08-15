import React, { useState, useEffect } from 'react';
import { 
  Search, 
  User, 
  ShoppingBag, 
  Heart, 
  Sparkles, 
  Menu, 
  X, 
  Ruler,
  ChevronDown
} from 'lucide-react';
import { CartItem, Product } from '../types';
import { StellifyEmblem } from './StellifyLogo';

interface NavbarProps {
  cartItems: CartItem[];
  wishlist: Product[];
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenRingSizer: () => void;
  onSelectCategory: (categoryName: string) => void;
  onOpenSearch: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  wishlist,
  onOpenCart,
  onOpenWishlist,
  onOpenRingSizer,
  onSelectCategory,
  onOpenSearch,
  activeSection,
  onNavigate
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collectionsDropdown, setCollectionsDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Shop', id: 'shop' },
    { label: 'Collections', id: 'collections' },
    { label: 'About Us', id: 'about' },
    { label: 'Blog', id: 'blog' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-[#241E1A] text-[#DFC68A] text-xs py-2 px-4 text-center tracking-widest uppercase flex items-center justify-center gap-2 font-medium">
        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
        <span>Complimentary Insured Shipping & Luxury Gift Box with all orders • Use code <strong className="text-white font-bold tracking-wider">LUXE15</strong> for 15% OFF</span>
        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse hidden sm:inline" />
      </div>

      {/* Main Navigation Bar */}
      <div className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm border-b border-[#EEDEB8]/60 py-3' 
          : 'bg-[#FAF7F2] border-b border-[#EEDEB8]/40 py-4.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo - Stellify with brand emblem */}
          <button 
            id="brand-logo-btn"
            onClick={() => onNavigate('home')} 
            className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none"
          >
            <div className="group-hover:scale-105 transition-transform duration-300">
              <StellifyEmblem size={34} color="#C59A45" />
            </div>
            <span className="font-serif text-2xl tracking-[0.16em] font-bold text-[#241E1A] leading-none">
              STELLIFY
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              if (link.id === 'collections') {
                return (
                  <div 
                    key={link.id} 
                    className="relative group"
                    onMouseEnter={() => setCollectionsDropdown(true)}
                    onMouseLeave={() => setCollectionsDropdown(false)}
                  >
                    <button
                      id={`nav-${link.id}`}
                      onClick={() => onNavigate('collections')}
                      className={`text-sm tracking-wider font-medium flex items-center gap-1 transition-colors duration-200 py-1 ${
                        isActive ? 'text-[#C59A45] font-semibold' : 'text-[#3E342B] hover:text-[#C59A45]'
                      }`}
                    >
                      {link.label}
                      <ChevronDown className="w-3.5 h-3.5 text-[#8C6424] transition-transform group-hover:rotate-180" />
                    </button>
                    {/* Active Golden Line */}
                    {isActive && (
                      <div className="h-0.5 bg-[#C59A45] rounded-full mt-0.5 w-full" />
                    )}

                    {/* Dropdown Menu */}
                    {collectionsDropdown && (
                      <div className="absolute top-full left-0 w-56 pt-2 z-50">
                        <div className="bg-[#FAF7F2] border border-[#EEDEB8] rounded-xl shadow-xl py-2 px-1 text-xs">
                          {['SHERISH', 'CHAROAL', 'MEHER', 'LUSTROUS'].map((cat) => (
                            <button
                              key={cat}
                              onClick={() => {
                                onSelectCategory(cat);
                                setCollectionsDropdown(false);
                              }}
                              className="w-full text-left px-3 py-2 rounded-lg text-[#241E1A] hover:bg-[#F3EDE2] hover:text-[#C59A45] transition-colors flex items-center justify-between"
                            >
                              <span>{cat}</span>
                              <span className="text-[10px] text-[#8C6424]">Explore →</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={link.id}
                  id={`nav-${link.id}`}
                  onClick={() => onNavigate(link.id)}
                  className={`text-sm tracking-wider font-medium transition-colors duration-200 py-1 relative cursor-pointer ${
                    isActive ? 'text-[#C59A45] font-semibold' : 'text-[#3E342B] hover:text-[#C59A45]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C59A45] rounded-full animate-fadeIn" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons (Exact layout: Search, User, Wishlist, Cart with Badge) */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Icon */}
            <button
              id="search-toggle-btn"
              onClick={onOpenSearch}
              aria-label="Search jewelry catalog"
              className="p-2 text-[#3E342B] hover:text-[#C59A45] hover:bg-[#F3EDE2] rounded-full transition-colors duration-200 cursor-pointer"
            >
              <Search className="w-5 h-5 stroke-[1.75]" />
            </button>

            {/* Bangle Sizer Quick Tool */}
            <button
              id="ring-sizer-btn"
              onClick={onOpenRingSizer}
              title="Bangle Sizing Guide"
              className="hidden lg:flex p-2 text-[#3E342B] hover:text-[#C59A45] hover:bg-[#F3EDE2] rounded-full transition-colors duration-200 cursor-pointer"
            >
              <Ruler className="w-5 h-5 stroke-[1.75]" />
            </button>

            {/* Wishlist Heart */}
            <button
              id="wishlist-btn"
              onClick={onOpenWishlist}
              aria-label="View Wishlist"
              className="relative p-2 text-[#3E342B] hover:text-[#C59A45] hover:bg-[#F3EDE2] rounded-full transition-colors duration-200 cursor-pointer"
            >
              <Heart className="w-5 h-5 stroke-[1.75]" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C59A45] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* User Account */}
            <button
              id="user-account-btn"
              onClick={() => alert("Welcome to Stellify VIP Concierge Club! Sign in / Membership portal is active.")}
              aria-label="User Account"
              className="p-2 text-[#3E342B] hover:text-[#C59A45] hover:bg-[#F3EDE2] rounded-full transition-colors duration-200 cursor-pointer"
            >
              <User className="w-5 h-5 stroke-[1.75]" />
            </button>

            {/* Shopping Cart with Badge (Matches the '2' in the screenshot) */}
            <button
              id="cart-toggle-btn"
              onClick={onOpenCart}
              aria-label="Shopping Cart"
              className="relative p-2 text-[#3E342B] hover:text-[#C59A45] hover:bg-[#F3EDE2] rounded-full transition-colors duration-200 cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
              {totalCartCount > 0 && (
                <span className="absolute top-1 right-1 w-4.5 h-4.5 bg-[#C59A45] text-white text-[11px] font-bold rounded-full flex items-center justify-center leading-none shadow-xs">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 text-[#241E1A] hover:text-[#C59A45] rounded-lg md:hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FAF7F2] border-t border-[#EEDEB8] px-6 py-5 shadow-lg space-y-4 animate-fadeIn">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left text-base font-medium py-2 px-3 rounded-lg transition-colors ${
                    activeSection === link.id ? 'bg-[#F3EDE2] text-[#C59A45] font-bold' : 'text-[#241E1A]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-[#EEDEB8] flex flex-col gap-2">
              <button
                onClick={() => {
                  onOpenRingSizer();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-4 rounded-xl border border-[#DFC68A] text-[#8C6424] text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Ruler className="w-4 h-4" />
                <span>International Bangle Sizing Guide</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
