import React, { useState } from 'react';
import { Star, CheckCircle2, MessageSquarePlus, Sparkles, X } from 'lucide-react';
import { REVIEWS } from '../data/products';
import { CustomerReview } from '../types';
import confetti from 'canvas-confetti';

export const ReviewsSection: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<CustomerReview[]>(REVIEWS);
  const [showAddReview, setShowAddReview] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newProduct, setNewProduct] = useState('Golden Petal Necklace');

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newComment) return;

    const newRev: CustomerReview = {
      id: `rev-${Date.now()}`,
      author: newAuthor,
      rating: newRating,
      date: 'Just now',
      title: newTitle || 'Exceptional craftsmanship & service',
      comment: newComment,
      verified: true,
      productName: newProduct
    };

    setReviewsList([newRev, ...reviewsList]);
    setShowAddReview(false);
    setNewAuthor('');
    setNewTitle('');
    setNewComment('');

    confetti({
      particleCount: 60,
      spread: 70,
      colors: ['#C59A45', '#DFC68A', '#EEDEB8', '#FFFFFF']
    });
  };

  return (
    <section id="reviews-section" className="py-16 sm:py-20 bg-white border-t border-[#EEDEB8]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#8C6424] uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#C59A45]" />
              <span>Verified Patron Testimonials</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#241E1A] tracking-tight">
              Cherished Across the Globe
            </h2>
            <div className="flex items-center gap-2 pt-1 text-sm text-[#6E5D4F]">
              <div className="flex text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                ))}
              </div>
              <span className="font-bold text-[#241E1A]">4.98 / 5.0</span>
              <span>• Over 2,400+ 5-Star Reviews</span>
            </div>
          </div>

          <button
            onClick={() => setShowAddReview(true)}
            className="px-5 py-2.5 rounded-full border border-[#DFC68A] hover:border-[#C59A45] bg-[#FAF7F2] hover:bg-[#F3EDE2] text-[#241E1A] text-xs font-semibold tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-2xs self-start md:self-auto"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#C59A45]" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#EEDEB8] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#DFC68A] transition-all"
            >
              <div className="space-y-3">
                {/* Stars & Verified Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex text-[#D4AF37]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>
                  {rev.verified && (
                    <span className="flex items-center gap-1 text-[11px] text-[#8C6424] font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C59A45]" />
                      <span>Verified Buyer</span>
                    </span>
                  )}
                </div>

                <h4 className="font-serif text-base font-bold text-[#241E1A]">
                  "{rev.title}"
                </h4>

                <p className="text-xs text-[#6E5D4F] leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Reviewer & Product */}
              <div className="pt-3 border-t border-[#EEDEB8]/60 flex items-center justify-between text-xs">
                <div>
                  <p className="font-serif font-bold text-[#241E1A]">{rev.author}</p>
                  <p className="text-[11px] text-[#8C6424]">{rev.productName}</p>
                </div>
                <span className="text-[10px] text-[#A89887]">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Add Review Modal */}
      {showAddReview && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div 
            className="bg-[#FAF7F2] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#EEDEB8] space-y-5 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAddReview(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-white flex items-center justify-center text-[#241E1A] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="font-serif text-xl font-bold text-[#241E1A]">Share Your Stellify Experience</h3>
              <p className="text-xs text-[#6E5D4F]">We cherish every story from our valued patrons.</p>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-[#8C6424] mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="e.g. Genevieve Thorne"
                  className="w-full bg-white border border-[#DFC68A] rounded-xl p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C59A45]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#8C6424] mb-1">Piece Purchased</label>
                <select
                  value={newProduct}
                  onChange={(e) => setNewProduct(e.target.value)}
                  className="w-full bg-white border border-[#DFC68A] rounded-xl p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C59A45]"
                >
                  <option>SHERISH</option>
                  <option>CHAROAL</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#8C6424] mb-1">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewRating(star)}
                      className="p-1 cursor-pointer"
                    >
                      <Star className={`w-5 h-5 ${star <= newRating ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-gray-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#8C6424] mb-1">Review Headline</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Unbelievable shimmer & timeless grace"
                  className="w-full bg-white border border-[#DFC68A] rounded-xl p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C59A45]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#8C6424] mb-1">Review Details</label>
                <textarea
                  rows={3}
                  required
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Describe the fit, luster, packaging, and compliments received..."
                  className="w-full bg-white border border-[#DFC68A] rounded-xl p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C59A45] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#C59A45] hover:bg-[#B08333] text-white font-semibold text-xs tracking-wider uppercase shadow-md transition-all cursor-pointer"
              >
                Submit Verified Review
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
