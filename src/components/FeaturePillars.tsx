import React from 'react';
import { Diamond, Truck, ShieldCheck, Award } from 'lucide-react';

export const FeaturePillars: React.FC = () => {
  const pillars = [
    {
      icon: Diamond,
      title: 'Premium Quality',
      description: 'Handpicked & crafted with perfection',
      id: 'pillar-quality'
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Free & fast delivery on all orders',
      id: 'pillar-shipping'
    },
    {
      icon: ShieldCheck,
      title: 'Secure Payment',
      description: '100% secure payment guarantee',
      id: 'pillar-payment'
    },
    {
      icon: Award,
      title: 'Easy Returns',
      description: '30 days easy return policy',
      id: 'pillar-returns'
    }
  ];

  return (
    <section className="relative z-20 -mt-6 sm:-mt-8 md:-mt-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Floating White/Cream Pill Container with Soft Golden Border */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl md:rounded-full border border-[#EEDEB8] shadow-xl shadow-[#241E1A]/5 py-5 px-6 sm:px-8 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-[#EEDEB8]/60">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={pillar.id}
                id={pillar.id}
                className="flex items-center gap-3.5 pt-4 sm:pt-0 sm:px-4 first:pt-0 first:pl-0 last:pr-0 group"
              >
                {/* Thin Golden Icon Circle */}
                <div className="w-12 h-12 shrink-0 rounded-full bg-[#FAF7F2] border border-[#DFC68A] flex items-center justify-center group-hover:bg-[#C59A45] group-hover:border-[#C59A45] transition-all duration-300 shadow-2xs">
                  <Icon className="w-5 h-5 text-[#C59A45] group-hover:text-white stroke-[1.5] transition-colors duration-300" />
                </div>
                
                {/* Title & Description */}
                <div className="flex flex-col">
                  <h4 className="font-serif text-sm sm:text-base font-bold text-[#241E1A] tracking-tight group-hover:text-[#C59A45] transition-colors duration-200">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-[#6E5D4F] leading-tight mt-0.5">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
