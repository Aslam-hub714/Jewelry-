import { Product, CategoryItem, CustomerReview } from '../types';

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'sherish',
    name: 'SHERISH',
    image: '/category_sherish.jpg',
    itemCount: 24,
    tagline: 'Handcrafted signature bangles & jewelry'
  },
  {
    id: 'charoal',
    name: 'CHAROAL',
    image: '/category_charoal.jpg',
    itemCount: 32,
    tagline: 'Artisanal jewellery & statement pieces'
  },
  {
    id: 'meher',
    name: 'MEHER',
    image: '/category_meher.jpg',
    itemCount: 28,
    tagline: 'Heritage bangles & silk thread artistry'
  },
  {
    id: 'lustrous',
    name: 'LUSTROUS',
    image: '/category_lustrous.jpg',
    itemCount: 19,
    tagline: 'Radiant gold accents & sparkling gemstone artistry'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'sherish-collection',
    name: 'SHERISH',
    category: 'SHERISH',
    price: 150.00,
    rating: 5.0,
    reviewsCount: 128,
    images: [
      '/category_sherish.jpg'
    ],
    description: 'Handcrafted signature bangles suite crafted with royal blue and cyan silk thread, white Kundan floral motifs, embedded mirrors, and continuous pearl-and-gold bead chains.',
    metal: '18K Yellow Gold',
    availableMetals: [],
    isBestSeller: true,
    isNew: true,
    inStock: true,
    customDetails: [
      { label: 'Color & Finish', value: 'Royal blue and cyan silk thread with a soft sheen finish.' },
      { label: 'Centerpiece', value: 'Wide bangle with white Kundan floral motifs and embedded mirror accents.' },
      { label: 'Secondary Pieces', value: 'Medium bangles with light blue crystals and small pearl clusters.' },
      { label: 'Accent Rings', value: 'Thin teal bangles framed with continuous pearl-and-gold bead chains.' },
      { label: 'Best For', value: 'Festive occasions, bridal wear, and high-fashion ethnic styling.' }
    ]
  },
  {
    id: 'charoal-collection',
    name: 'CHAROAL',
    category: 'CHAROAL',
    price: 79.00,
    originalPrice: 110.00,
    rating: 5.0,
    reviewsCount: 96,
    images: [
      '/category_charoal.jpg'
    ],
    description: 'Jet black silk thread base with a subtle matte-satin sheen, adorned with a geometric Kundan arrangement of teardrop and diamond-cut champagne stones and gold-framed pearl accents.',
    metal: '18K Yellow Gold',
    availableMetals: [],
    isBestSeller: true,
    inStock: true,
    customDetails: [
      { label: 'Color & Finish', value: 'Jet black silk thread base with a subtle matte-satin sheen.' },
      { label: 'Centerpiece', value: 'Central band featuring a geometric Kundan arrangement of teardrop and diamond-cut champagne stones.' },
      { label: 'Secondary Pieces', value: 'Matching black thread bangles accented with small round floral pearl-and-gold clusters.' },
      { label: 'Accent Rings', value: 'Fine spacer bangles embellished with delicate white pearl strings and golden stone lines.' },
      { label: 'Outer Borders', value: 'Broad top and bottom bangles lined with a full row of gold-framed pearl studs.' },
      { label: 'Best For', value: 'Evening wear, dark-themed aesthetics, and modern festive fusion looks.' }
    ]
  },
  {
    id: 'meher-collection',
    name: 'MEHER',
    category: 'MEHER',
    price: 120.00,
    originalPrice: 145.00,
    rating: 5.0,
    reviewsCount: 84,
    images: [
      '/category_meher.jpg'
    ],
    description: 'Exquisite MEHER handcrafted bangles suite showcasing rich silk thread artistry, intricate Kundan stone work, and glistening golden bead trims.',
    metal: '18K Yellow Gold',
    availableMetals: [],
    isBestSeller: true,
    isNew: true,
    inStock: true,
    customDetails: [
      { label: 'Collection', value: 'MEHER Signature Heritage Suite' },
      { label: 'Craft & Detailing', value: 'Hand-wound silk thread with hand-set Kundan stones and mirror accents.' },
      { label: 'Secondary Bangles', value: 'Complementary gold bead chains and floral cluster spacers.' },
      { label: 'Best For', value: 'Traditional celebrations, festive soirées, and bridal statements.' }
    ]
  },
  {
    id: 'lustrous-collection',
    name: 'LUSTROUS',
    category: 'LUSTROUS',
    price: 135.00,
    originalPrice: 160.00,
    rating: 5.0,
    reviewsCount: 42,
    images: [
      '/category_lustrous.jpg'
    ],
    description: 'The LUSTROUS collection features radiant silk thread artistry paired with sparkling gemstone accents and polished gold-toned motifs for a truly brilliant aesthetic.',
    metal: '18K Yellow Gold',
    availableMetals: [],
    isBestSeller: false,
    isNew: true,
    inStock: true,
    customDetails: [
      { label: 'Theme', value: 'Radiant Brilliance & Modern Opulence' },
      { label: 'Material', value: 'Premium silk thread, brilliant-cut crystals, and golden bead overlays.' },
      { label: 'Design', value: 'Gradient silk winding with interlaced metallic threads for a unique shimmer effect.' },
      { label: 'Best For', value: 'Cocktail parties, wedding receptions, and high-glamour events.' }
    ]
  }
];

export const REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    author: 'Eleanor Vance',
    rating: 5,
    date: '2 days ago',
    title: 'Breathtaking quality & exquisite glow',
    comment: 'The SHERISH bangles exceeded all my expectations. The silk thread work and Kundan mirror motifs are stunning. I receive compliments every single time I wear them!',
    verified: true,
    productName: 'SHERISH'
  },
  {
    id: 'rev-2',
    author: 'Sophia Kensington',
    rating: 5,
    date: '1 week ago',
    title: 'The perfect gift',
    comment: 'My husband surprised me with the CHAROAL collection. The packaging was top-tier luxury—velvet box, golden ribbon, and a handwritten note.',
    verified: true,
    productName: 'CHAROAL'
  },
  {
    id: 'rev-3',
    author: 'Camilla Dupont',
    rating: 5,
    date: '2 weeks ago',
    title: 'Sparkles brilliantly under any lighting',
    comment: 'The CHAROAL piece sits so comfortably and catches the light effortlessly. Stellify has earned a customer for life.',
    verified: true,
    productName: 'CHAROAL'
  }
];
