export type MetalType = '18K Yellow Gold' | '18K Rose Gold' | 'Platinum' | '14K White Gold';

export interface ProductDetailSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'SHERISH' | 'CHAROAL' | 'MEHER' | 'LUSTROUS' | 'Necklaces' | 'Rings' | 'Bracelets' | 'Pendants' | 'Collections';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  description: string;
  metal: MetalType;
  availableMetals: MetalType[];
  isBestSeller?: boolean;
  isNew?: boolean;
  inStock: boolean;
  caratWeight?: string;
  stoneType?: string;
  dimensions?: string;
  chainLengthOptions?: string[];
  ringSizes?: number[];
  features?: string[];
  customDetails?: ProductDetailSpec[];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedMetal: MetalType;
  selectedRingSize?: number;
  selectedChainLength?: string;
  customEngraving?: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  image: string;
  itemCount: number;
  tagline: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  productName: string;
  userAvatar?: string;
}

export interface StylistAdviceResponse {
  greeting: string;
  stylingAdvice: string;
  recommendedTypes: string[];
  curatedTips: string[];
  suggestedKeywords: string[];
}
