import React, { useState } from 'react';
import { X, Ruler, Info } from 'lucide-react';

interface RingSizerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RingSizerModal: React.FC<RingSizerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const bangleSizes = [
    {
      size: '2-2 (or 2.2)',
      label: '2-2',
      category: 'Extra Small (XS)',
      innerDiameterMm: '54.0 mm',
      innerDiameterInches: '2.125 in',
      handCircumferenceMm: '169.4 mm',
      handCircumferenceInches: '6.67 in',
      diameterNum: 54.0,
    },
    {
      size: '2-4 (or 2.4)',
      label: '2-4',
      category: 'Small (S)',
      innerDiameterMm: '57.2 mm',
      innerDiameterInches: '2.250 in',
      handCircumferenceMm: '179.6 mm',
      handCircumferenceInches: '7.06 in',
      diameterNum: 57.2,
    },
    {
      size: '2-6 (or 2.6)',
      label: '2-6',
      category: 'Medium (M)',
      innerDiameterMm: '60.3 mm',
      innerDiameterInches: '2.375 in',
      handCircumferenceMm: '189.5 mm',
      handCircumferenceInches: '7.46 in',
      diameterNum: 60.3,
    },
    {
      size: '2-8 (or 2.8)',
      label: '2-8',
      category: 'Large (L)',
      innerDiameterMm: '63.5 mm',
      innerDiameterInches: '2.500 in',
      handCircumferenceMm: '199.4 mm',
      handCircumferenceInches: '7.85 in',
      diameterNum: 63.5,
    },
    {
      size: '2-10 (or 2.10)',
      label: '2-10',
      category: 'Extra Large (XL)',
      innerDiameterMm: '66.7 mm',
      innerDiameterInches: '2.625 in',
      handCircumferenceMm: '209.3 mm',
      handCircumferenceInches: '8.24 in',
      diameterNum: 66.7,
    },
    {
      size: '2-12 (or 2.12)',
      label: '2-12',
      category: 'Double XL (2XL)',
      innerDiameterMm: '69.9 mm',
      innerDiameterInches: '2.750 in',
      handCircumferenceMm: '219.5 mm',
      handCircumferenceInches: '8.64 in',
      diameterNum: 69.9,
    },
  ];

  const [activeSize, setActiveSize] = useState('2-6 (or 2.6)');
  const currentSizeObj = bangleSizes.find(s => s.size === activeSize) || bangleSizes[2];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      <div 
        className="relative bg-[#FAF7F2] rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#EEDEB8] my-6 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#EEDEB8] bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#DFC68A] flex items-center justify-center">
              <Ruler className="w-5 h-5 text-[#C59A45]" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#241E1A]">International Bangle Conversion Chart</h3>
              <p className="text-xs text-[#6E5D4F]">Find your flawless luxury fit with millimetric precision</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full hover:bg-[#FAF7F2] flex items-center justify-center text-[#241E1A] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Interactive Screen Overlay Circle Sizer */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#EEDEB8] text-center space-y-4">
            <h4 className="font-serif text-sm sm:text-base font-bold text-[#241E1A]">
              Place an Existing Bangle Over This Guide
            </h4>
            <p className="text-xs text-[#6E5D4F] max-w-md mx-auto">
              Align the inside edge of your physical bangle with the golden circular border below to verify your size.
            </p>

            {/* Dynamic Scaled Golden Circle */}
            <div className="flex flex-col items-center justify-center py-4">
              <div 
                className="rounded-full border-2 border-[#C59A45] bg-[#FAF7F2] flex flex-col items-center justify-center shadow-inner transition-all duration-300 relative"
                style={{
                  width: `${currentSizeObj.diameterNum * 2.6}px`,
                  height: `${currentSizeObj.diameterNum * 2.6}px`
                }}
              >
                <span className="font-serif text-xs sm:text-sm font-bold text-[#241E1A]">
                  Size {currentSizeObj.label}
                </span>
                <span className="text-[10px] text-[#8C6424] font-medium">
                  {currentSizeObj.category}
                </span>
                <span className="absolute -bottom-6 text-[10px] text-[#8C6424] font-medium whitespace-nowrap">
                  {currentSizeObj.innerDiameterMm} ({currentSizeObj.innerDiameterInches}) inside diameter
                </span>
              </div>
            </div>

            {/* Size Selector Buttons */}
            <div className="flex items-center justify-center gap-2 flex-wrap pt-4">
              {bangleSizes.map((s) => (
                <button
                  key={s.size}
                  onClick={() => setActiveSize(s.size)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeSize === s.size
                      ? 'bg-[#C59A45] text-white shadow-sm'
                      : 'bg-[#FAF7F2] text-[#241E1A] border border-[#EEDEB8] hover:border-[#DFC68A]'
                  }`}
                >
                  {s.label} ({s.category})
                </button>
              ))}
            </div>
          </div>

          {/* International Bangle Conversion Chart */}
          <div className="bg-white p-5 rounded-2xl border border-[#EEDEB8] space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#241E1A]">
              International Bangle Conversion Chart
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left min-w-[550px]">
                <thead>
                  <tr className="border-b border-[#EEDEB8] text-[#8C6424] font-semibold">
                    <th className="pb-2.5 pr-3">Bangle Size (Inches / Standard)</th>
                    <th className="pb-2.5 pr-3">Size Category</th>
                    <th className="pb-2.5 pr-3">Inner Diameter (mm)</th>
                    <th className="pb-2.5 pr-3">Inner Diameter (inches)</th>
                    <th className="pb-2.5 pr-3">Hand Circumference (mm)</th>
                    <th className="pb-2.5">Hand Circumference (inches)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#FAF7F2]">
                  {bangleSizes.map((s) => (
                    <tr 
                      key={s.size}
                      onClick={() => setActiveSize(s.size)}
                      className={`cursor-pointer hover:bg-[#FAF7F2] transition-colors ${
                        activeSize === s.size ? 'bg-[#F9F5EC] font-bold text-[#C59A45]' : 'text-[#6E5D4F]'
                      }`}
                    >
                      <td className="py-2.5 pr-3 font-medium">{s.size}</td>
                      <td className="py-2.5 pr-3">{s.category}</td>
                      <td className="py-2.5 pr-3">{s.innerDiameterMm}</td>
                      <td className="py-2.5 pr-3">{s.innerDiameterInches}</td>
                      <td className="py-2.5 pr-3">{s.handCircumferenceMm}</td>
                      <td className="py-2.5">{s.handCircumferenceInches}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sizing Tips */}
          <div className="bg-[#F6EFE3] p-4 rounded-2xl border border-[#EEDEB8] flex items-start gap-3 text-xs text-[#6E5D4F]">
            <Info className="w-4 h-4 text-[#C59A45] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="text-[#241E1A] block">How to Measure Your Bangle Size:</strong>
              <p>Bring your thumb across your palm towards your pinky finger as if slipping on a bangle, and measure around the widest part of your hand (knuckles) using a soft measuring tape.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
