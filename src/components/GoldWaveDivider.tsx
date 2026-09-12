import React from 'react';

interface GoldWaveDividerProps {
  inverted?: boolean;
  className?: string;
  bgFill?: string; // background of surrounding section
}

export const GoldWaveDivider: React.FC<GoldWaveDividerProps> = ({
  inverted = false,
  className = '',
  bgFill = '#0A0A0A',
}) => {
  return (
    <div
      className={`w-full overflow-hidden leading-none select-none pointer-events-none relative z-10 ${
        inverted ? 'rotate-180 -mb-1' : '-mt-1'
      } ${className}`}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full h-14 sm:h-20 block"
      >
        <defs>
          <linearGradient id="goldRibbonSheen" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7A5A2E" />
            <stop offset="25%" stopColor="#C9A66B" />
            <stop offset="50%" stopColor="#F4E3B2" />
            <stop offset="70%" stopColor="#B8874E" />
            <stop offset="85%" stopColor="#F4E3B2" />
            <stop offset="100%" stopColor="#7A5A2E" />
          </linearGradient>

          <linearGradient id="goldRibbonShadow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4A3416" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#8F652B" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#31220E" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="goldSpecular" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFEFC7" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#E0BD79" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#FFF4D9" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* Base dark/container blend */}
        <path
          d="M0,0 C150,90 350,-40 500,60 C650,150 900,10 1200,80 L1200,0 L0,0 Z"
          fill={bgFill}
          opacity="0.3"
        />

        {/* Deep under-wave shadow */}
        <path
          d="M0,45 C180,110 380,10 600,85 C820,150 1020,40 1200,95 L1200,120 L0,120 Z"
          fill="url(#goldRibbonShadow)"
        />

        {/* Primary lush gold satin ribbon */}
        <path
          d="M0,30 C200,95 400,5 600,75 C800,140 1000,30 1200,85 L1200,110 C1000,55 800,165 600,100 C400,30 200,120 0,55 Z"
          fill="url(#goldRibbonSheen)"
        />

        {/* Top specular highlight curve */}
        <path
          d="M0,32 C200,97 400,7 600,77 C800,142 1000,32 1200,87"
          fill="none"
          stroke="url(#goldSpecular)"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Secondary softer silk ripple */}
        <path
          d="M0,52 C220,115 420,25 620,95 C820,160 1020,50 1200,105"
          fill="none"
          stroke="url(#goldRibbonSheen)"
          strokeWidth="1.5"
          opacity="0.6"
        />
      </svg>
    </div>
  );
};
