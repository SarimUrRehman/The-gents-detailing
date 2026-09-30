import React, { useEffect, useState } from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

/**
 * Recreates The Gents Detailing Co emblem:
 * Sleek white/icy-silver front-view sports car silhouette above bold "THE GENTS"
 * and widely letter-spaced "DETAILING CO" on a pure black badge.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  animated = false,
  className = '',
}) => {
  const dimensions = {
    sm: { svgWidth: 112, svgHeight: 34, titleClass: 'text-sm tracking-[0.14em]', subClass: 'text-[8px] tracking-[0.36em]' },
    md: { svgWidth: 136, svgHeight: 40, titleClass: 'text-base tracking-[0.16em]', subClass: 'text-[9px] tracking-[0.38em]' },
    lg: { svgWidth: 210, svgHeight: 64, titleClass: 'text-2xl tracking-[0.18em]', subClass: 'text-[11px] tracking-[0.44em]' },
  }[size];

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <svg
        width={dimensions.svgWidth}
        height={dimensions.svgHeight}
        viewBox="0 0 240 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="gentsCarGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8FA7BA" />
            <stop offset="28%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#CFE3F2" />
            <stop offset="72%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#8FA7BA" />
          </linearGradient>
          <filter id="iceGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Sleek front-view sports car roofline & wide-body fenders silhouette */}
        <path
          d="M22 54 C26 40, 42 32, 62 29 L82 14 C92 8, 148 8, 158 14 L178 29 C198 32, 214 40, 218 54"
          stroke="url(#gentsCarGradient)"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#iceGlow)"
          style={
            animated
              ? {
                  strokeDasharray: 260,
                  strokeDashoffset: 0,
                  animation: 'carDraw 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                }
              : undefined
          }
        />

        {/* Side mirrors */}
        <path
          d="M58 28 L46 25 C43 25, 42 28, 45 29 L56 31 M182 28 L194 25 C197 25, 198 28, 195 29 L184 31"
          stroke="#CFE3F2"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Sculpted hood creases */}
        <path
          d="M78 29 L96 45 M162 29 L144 45"
          stroke="#8FA7BA"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Aggressive LED DRL Headlight signatures (Icy Silver-Blue) */}
        <path
          d="M34 44 L66 47 L60 51 L32 48 Z"
          fill="#EAF5FF"
          filter="url(#iceGlow)"
        />
        <path
          d="M206 44 L174 47 L180 51 L208 48 Z"
          fill="#EAF5FF"
          filter="url(#iceGlow)"
        />

        {/* Front splitter & central grille intake */}
        <path
          d="M16 58 L54 58 L68 52 L172 52 L186 58 L224 58"
          stroke="url(#gentsCarGradient)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M84 57 L156 57"
          stroke="#CFE3F2"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.75"
        />
      </svg>

      <span
        className={`font-display font-black uppercase text-white leading-none -mt-0.5 whitespace-nowrap ${dimensions.titleClass}`}
      >
        THE GENTS
      </span>
      <span
        className={`font-display font-semibold uppercase text-[#CFE3F2] leading-none mt-1 whitespace-nowrap ${dimensions.subClass}`}
      >
        DETAILING CO
      </span>
    </div>
  );
};

/**
 * Brief animated entrance screen with the sports car silhouette drawing itself in.
 * Includes an immediate skip button and auto-completes swiftly so content is never blocked.
 */
export const LoadingScreen: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setFading(true), 850);
    const hideTimer = window.setTimeout(() => setVisible(false), 1200);
    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-label="Loading The Gents Detailing Co"
      onClick={() => setVisible(false)}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-300 cursor-pointer ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <style>{`
        @keyframes carDraw {
          0% { stroke-dashoffset: 260; opacity: 0.3; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
      `}</style>
      <div className="relative p-8 rounded-2xl border border-white/10 bg-[#0A0A0B]/90 shadow-[0_0_60px_rgba(207,227,242,0.12)] flex flex-col items-center">
        <BrandLogo size="lg" animated />
        <div className="mt-6 w-40 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#8FA7BA] via-[#EAF5FF] to-[#CFE3F2] w-full origin-left animate-pulse" />
        </div>
        <p className="mt-3 text-[11px] font-mono-tabular text-[#A7ABB3] tracking-widest uppercase">
          Perth Mobile Showroom
        </p>
      </div>
    </div>
  );
};
