import React, { useState } from 'react';

import baliImg from '../assets/images/bali_indonesia_travel_1791626330048.jpg';
import thailandImg from '../assets/images/thailand_travel_1791626345806.jpg';
import singaporeImg from '../assets/images/singapore_travel_1791626357149.jpg';
import sriLankaImg from '../assets/images/sri_lanka_travel_1791626370332.jpg';
import bhutanImg from '../assets/images/bhutan_travel_1791626381535.jpg';
import keralaImg from '../assets/images/kerala_india_travel_1791626393188.jpg';
import kashmirImg from '../assets/images/kashmir_india_travel_1791626404208.jpg';
import dubaiImg from '../assets/images/dubai_uae_travel_1791626414499.jpg';

interface HolidayPackage {
  id: string;
  title: string;
  description: string;
  image: string;
}

const HOLIDAY_PACKAGES: HolidayPackage[] = [
  {
    id: 'bali',
    title: 'Bali, Indonesia',
    description: 'Tropical beaches & culture',
    image: baliImg,
  },
  {
    id: 'thailand',
    title: 'Thailand',
    description: 'Vibrant cities & temples',
    image: thailandImg,
  },
  {
    id: 'singapore',
    title: 'Singapore',
    description: 'Modern city & attractions',
    image: singaporeImg,
  },
  {
    id: 'sri-lanka',
    title: 'Sri Lanka',
    description: 'Nature, heritage & beaches',
    image: sriLankaImg,
  },
  {
    id: 'bhutan',
    title: 'Bhutan',
    description: 'Peaceful valleys & monasteries',
    image: bhutanImg,
  },
  {
    id: 'kerala',
    title: 'Kerala, India',
    description: 'Serene backwaters & nature',
    image: keralaImg,
  },
  {
    id: 'kashmir',
    title: 'Kashmir, India',
    description: 'Mountain valleys & Dal lake',
    image: kashmirImg,
  },
  {
    id: 'dubai',
    title: 'Dubai, UAE',
    description: 'Modern skylines & desert luxury',
    image: dubaiImg,
  },
];

// Duplicate items to ensure seamless infinite loop
const TICKER_ITEMS = [...HOLIDAY_PACKAGES, ...HOLIDAY_PACKAGES];

export const TrendingPackagesTicker: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const togglePlayPause = () => {
    setIsPaused((prev) => !prev);
  };

  const isMotionPaused = isPaused || isHovered;

  return (
    <section
      aria-label="Trending Holiday Packages Ticker"
      className="relative w-full h-[44px] sm:h-[48px] bg-black border-b border-[#FFC928]/40 overflow-hidden select-none flex items-center justify-between"
    >
      {/* Golden-Yellow Badge on the Left */}
      <div className="z-20 ml-2.5 sm:ml-4 shrink-0 flex items-center bg-black pr-2">
        <div className="bg-[#FFC928] text-black font-black text-[11px] sm:text-[12px] tracking-normal uppercase px-2.5 sm:px-3 py-1 rounded-[3px] whitespace-nowrap shadow-xs">
          TRENDING HOLIDAY PACKAGES
        </div>
      </div>

      {/* Continuously Moving Horizontal Track */}
      <div
        className="flex-1 h-full overflow-hidden flex items-center relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="region"
        aria-roledescription="carousel"
        aria-label="Trending Holiday Destinations"
      >
        <div
          className="flex items-center h-full animate-ticker-marquee will-change-transform pl-3"
          style={{
            animationPlayState: isMotionPaused ? 'paused' : 'running',
            width: 'max-content',
          }}
        >
          {TICKER_ITEMS.map((pkg, index) => (
            <React.Fragment key={`${pkg.id}-${index}`}>
              <div className="flex items-center shrink-0 h-full py-1">
                {/* Destination Thumbnail */}
                <div className="w-[54px] sm:w-[62px] h-[30px] sm:h-[34px] shrink-0 overflow-hidden rounded-[3px] bg-[#1a1a1a] mr-2.5 border border-white/10 shadow-xs">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover select-none pointer-events-none"
                    loading="eager"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Destination Text Content */}
                <div className="flex flex-col justify-center">
                  <span className="font-bold text-[13px] sm:text-[14px] text-white leading-tight whitespace-nowrap">
                    {pkg.title}
                  </span>
                  <span className="text-[11px] sm:text-[12px] text-[#cccccc] leading-tight mt-0.5 whitespace-nowrap">
                    {pkg.description}
                  </span>
                </div>
              </div>

              {/* Thin Golden-Yellow Vertical Separator */}
              <div
                className="w-[1.5px] h-[24px] sm:h-[28px] bg-[#FFC928] mx-4 sm:mx-6 shrink-0"
                aria-hidden="true"
              />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Far-Right Golden-Yellow Pause/Play Control Box with Black Icon */}
      <div className="z-20 mr-2.5 sm:ml-2 sm:mr-4 shrink-0 flex items-center bg-black pl-2">
        <button
          type="button"
          onClick={togglePlayPause}
          aria-label={isPaused ? 'Resume holiday packages ticker' : 'Pause holiday packages ticker'}
          title={isPaused ? 'Play' : 'Pause'}
          className="w-[30px] sm:w-[34px] h-[28px] sm:h-[30px] bg-[#FFC928] hover:bg-[#e6b320] active:bg-[#cca019] rounded-[3px] flex items-center justify-center cursor-pointer transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-1 shadow-xs"
        >
          {isPaused ? (
            /* Black Play Icon */
            <svg
              className="w-[14px] h-[14px] sm:w-[15px] sm:h-[15px] text-black fill-black translate-x-[1px]"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            /* Black Pause Icon (Two vertical bars matching reference) */
            <div className="flex items-center gap-[2.5px] select-none" aria-hidden="true">
              <span className="w-[2.5px] sm:w-[3px] h-[13px] sm:h-[14px] bg-black rounded-[0.5px]" />
              <span className="w-[2.5px] sm:w-[3px] h-[13px] sm:h-[14px] bg-black rounded-[0.5px]" />
            </div>
          )}
        </button>
      </div>
    </section>
  );
};

export default TrendingPackagesTicker;
