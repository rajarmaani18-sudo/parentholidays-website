import React from 'react';

interface ParentsHolidayLogoProps {
  className?: string;
  height?: number;
}

export const ParentsHolidayLogo: React.FC<ParentsHolidayLogoProps> = ({
  className = '',
  height = 36,
}) => {
  return (
    <div className={`flex items-center gap-2 select-none shrink-0 ${className}`}>
      {/* Sun / Globe Emblem with Airplane & Swoosh */}
      <svg
        width={height * 1.05}
        height={height}
        viewBox="0 0 44 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        aria-hidden="true"
      >
        <defs>
          {/* Sun / Sunset Gradient */}
          <linearGradient id="sunGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFD200" />
            <stop offset="45%" stopColor="#FF7A00" />
            <stop offset="100%" stopColor="#E62E00" />
          </linearGradient>

          {/* Cyan to Royal Blue Ocean Wave Swoosh */}
          <linearGradient id="swooshGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E5FF" />
            <stop offset="50%" stopColor="#0099FF" />
            <stop offset="100%" stopColor="#0055EE" />
          </linearGradient>
        </defs>

        {/* Sun Disk */}
        <circle cx="23" cy="20" r="15" fill="url(#sunGrad)" />

        {/* Airplane Silhouette Flying Diagonally Up-Right */}
        <g transform="translate(14, 11) rotate(-15 10 10)">
          {/* Airplane Fuselage */}
          <path
            d="M2 13 C4 11 14 7 19 6 C20.5 5.5 21 6.5 20 7.5 C16 11 11 17 8 20 L6 19 L8 14 L4 15 L2 14 Z"
            fill="#000000"
          />
          {/* Airplane Wings */}
          <path
            d="M8 10 L15 2 C15.5 1.5 16.5 2 16 3 L12 9 Z"
            fill="#000000"
          />
          <path
            d="M9 13 L8 19 C8 19.5 7.5 19.5 7 19 L6 14 Z"
            fill="#000000"
          />
          {/* Airplane Tail */}
          <path
            d="M3 14 L2 10.5 C2 10 2.5 10 3 10.5 L4.5 13.5 Z"
            fill="#000000"
          />
        </g>

        {/* Dynamic Ocean Swoosh / Hook under the Sun */}
        <path
          d="M5 24 C5 22 7 24 9 27 C12 32 17 37 25 36 C31 35 36 31 38 27 C34 32 29 34 23 34 C15 34 9 29 8 25 C7.5 23 6 21 5 24 Z"
          fill="url(#swooshGrad)"
        />
        {/* Curving tail on the far left */}
        <path
          d="M5 24 C4 20 6 18 7 17 C6.5 19 5.5 21 5 24 Z"
          fill="#00E5FF"
        />
      </svg>

      {/* Brand Text Stack */}
      <div className="flex flex-col justify-center leading-none tracking-tight">
        <span
          className="font-black text-[#FFC928] uppercase text-[15px] sm:text-[16px] tracking-wide"
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          PARENT&apos;S
        </span>
        <div className="flex items-center gap-1 mt-[2px]">
          <span
            className="font-black text-white uppercase text-[15px] sm:text-[16px] tracking-wide"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            HOLIDAY
          </span>
          {/* Red square/rectangle accent block right after HOLIDAY */}
          <span className="w-[8px] h-[12px] bg-[#E52020] inline-block shrink-0" />
        </div>
      </div>
    </div>
  );
};

export default ParentsHolidayLogo;
