import React from 'react';

interface StellifyLogoProps {
  className?: string;
  showText?: boolean;
  emblemSize?: number | string;
  textColor?: string;
}

export const StellifyEmblem: React.FC<{ size?: number | string; className?: string; color?: string }> = ({
  size = 36,
  className = '',
  color = '#C59A45'
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="Stellify Emblem"
    >
      {/* 4 Symmetrical Outer Quadrants with Inner Interlocking Arcs */}
      <g stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {/* Top-Left Quadrant */}
        <path d="M 50 14 C 30 14 14 30 14 50" />
        <path d="M 14 50 C 14 32 32 32 50 50" />

        {/* Top-Right Quadrant */}
        <path d="M 50 14 C 70 14 86 30 86 50" />
        <path d="M 50 14 C 68 14 68 32 50 50" />

        {/* Bottom-Right Quadrant */}
        <path d="M 86 50 C 86 70 70 86 50 86" />
        <path d="M 86 50 C 86 68 68 68 50 50" />

        {/* Bottom-Left Quadrant */}
        <path d="M 50 86 C 30 86 14 70 14 50" />
        <path d="M 50 86 C 50 68 32 68 50 50" />
      </g>

      {/* Center 4-Point Diamond Sparkle Star */}
      <path
        d="M 50 42 Q 50 50 58 50 Q 50 50 50 58 Q 50 50 42 50 Q 50 50 50 42 Z"
        fill={color}
      />
    </svg>
  );
};

export const StellifyLogo: React.FC<StellifyLogoProps> = ({
  className = '',
  showText = true,
  emblemSize = 34,
  textColor = 'text-[#241E1A]'
}) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <StellifyEmblem size={emblemSize} />
      {showText && (
        <span className={`font-serif text-2xl tracking-[0.16em] font-bold ${textColor} leading-none select-none`}>
          STELLIFY
        </span>
      )}
    </div>
  );
};
