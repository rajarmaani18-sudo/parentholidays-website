import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Shield, Award, Users, Compass } from 'lucide-react';

import banner1 from '../assets/images/banner_discover_world.svg';
import banner2 from '../assets/images/banner_travel_more_worry_less.svg';
import banner3 from '../assets/images/banner_meaningful_journeys.svg';
import banner4 from '../assets/images/banner_santorini_escape.svg';

export interface CarouselSlide {
  id: string;
  title: string;
  image: string;
  destination: string;
  subtitle: string;
  ctaText: string;
}

const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    id: 'discover-world',
    title: 'Discover the World at Your Own Pace',
    image: banner1,
    destination: 'Lake Como & Italian Alps',
    subtitle: 'Memorable holidays, crafted for senior travellers with comfort, safety and care.',
    ctaText: 'Create Your Dream Trip',
  },
  {
    id: 'travel-more-worry-less',
    title: 'Travel More, Worry Less - Alpine Escape',
    image: banner2,
    destination: 'Lake Bled & Julian Alps',
    subtitle: 'Thoughtfully planned holidays for seniors, with comfort, care and companionship.',
    ctaText: 'Plan Your Next Holiday',
  },
  {
    id: 'meaningful-journeys',
    title: 'Meaningful Journeys for a Brighter Tomorrow',
    image: banner3,
    destination: 'Italian Lakeside & Scenic Escapes',
    subtitle: 'Relax, Explore and Create New Memories with Hassle-Free Travel Designed for Senior Travellers.',
    ctaText: 'View Holiday Packages',
  },
  {
    id: 'santorini-sunset',
    title: "Senior Couple's Santorini Sunset Escape",
    image: banner4,
    destination: 'Santorini & Greek Islands',
    subtitle: 'Handpicked destinations. Comfortable stays. Hassle-free travel for senior travellers and families.',
    ctaText: 'Explore All Packages',
  },
];

interface PromotionalCarouselProps {
  onSlideClick?: (slide: CarouselSlide) => void;
}

export const PromotionalCarousel: React.FC<PromotionalCarouselProps> = ({
  onSlideClick,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchActive, setIsTouchActive] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const totalSlides = CAROUSEL_SLIDES.length;

  const goToNextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  }, [totalSlides]);

  const goToPrevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Reset & start automatic advance interval (5.5 seconds)
  useEffect(() => {
    const prefersReducedMotion =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || isHovered || isTouchActive) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      goToNextSlide();
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, isTouchActive, goToNextSlide]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      goToPrevSlide();
    } else if (e.key === 'ArrowRight') {
      goToNextSlide();
    }
  };

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsTouchActive(true);
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsTouchActive(false);
    if (!touchStartXRef.current || !touchEndXRef.current) return;

    const distance = touchStartXRef.current - touchEndXRef.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      goToNextSlide();
    } else if (distance < -minSwipeDistance) {
      goToPrevSlide();
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  const handleImageError = (slideId: string) => {
    setFailedImages((prev) => ({ ...prev, [slideId]: true }));
  };

  return (
    <section
      aria-label="Holiday Promotional Banners"
      className="w-full py-8 sm:py-10 lg:py-12 bg-[#FAF7F0] select-none"
    >
      {/* Centred Container (approx 38px / 1cm space on left & right on desktop, 12-16px on mobile) */}
      <div className="w-[calc(100%-24px)] sm:w-[calc(100%-32px)] md:w-[calc(100%-76px)] max-w-none mx-auto">
        {/* Carousel Frame */}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="ParentHolidays Promotional Offers"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative w-full overflow-hidden rounded-2xl shadow-xl border border-neutral-200/80 bg-black focus-visible:outline-2 focus-visible:outline-[#FFC928] focus-visible:outline-offset-2"
        >
          {/* Slides Track */}
          <div
            className="flex w-full transition-transform duration-600 ease-out will-change-transform"
            style={{
              transform: `translate3d(-${currentIndex * 100}%, 0, 0)`,
            }}
          >
            {CAROUSEL_SLIDES.map((slide, idx) => {
              const isFailed = failedImages[slide.id];

              return (
                <div
                  key={slide.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Slide ${idx + 1} of ${totalSlides}: ${slide.title}`}
                  className="w-full shrink-0 aspect-[2400/750] max-h-[460px] overflow-hidden flex items-center justify-center bg-black relative"
                >
                  {isFailed ? (
                    /* Graceful Fallback Banner to prevent broken icon */
                    <div
                      onClick={() => onSlideClick?.(slide)}
                      className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-white bg-black cursor-pointer"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-8 h-[1px] bg-[#FFC928]" />
                        <span className="text-xs sm:text-sm font-bold text-[#FFC928] tracking-widest uppercase">
                          PARENTHOLIDAYS.COM
                        </span>
                        <span className="w-8 h-[1px] bg-[#FFC928]" />
                      </div>
                      <h3 className="text-xl sm:text-3xl lg:text-4xl font-black mb-2 text-white">
                        {slide.title}
                      </h3>
                      <p className="text-xs sm:text-base text-neutral-300 max-w-2xl mb-4">
                        {slide.subtitle}
                      </p>
                      <div className="flex items-center justify-center gap-4 text-xs text-neutral-300 mb-4 hidden sm:flex">
                        <div className="flex items-center gap-1.5">
                          <Compass className="w-4 h-4 text-[#FFC928]" />
                          <span>Curated Itineraries</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Shield className="w-4 h-4 text-[#FFC928]" />
                          <span>Safe & Reliable</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-[#FFC928]" />
                          <span>Small Groups</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Award className="w-4 h-4 text-[#FFC928]" />
                          <span>Senior Friendly</span>
                        </div>
                      </div>
                      <span className="bg-[#FFC928] hover:bg-[#e6b320] text-black font-bold text-xs sm:text-sm px-6 py-2 rounded-full transition-colors shadow-md">
                        {slide.ctaText}
                      </span>
                    </div>
                  ) : (
                    /* Valid Banner Image with object-fit: cover */
                    <img
                      src={slide.image}
                      alt={slide.title}
                      onError={() => handleImageError(slide.id)}
                      onClick={() => onSlideClick?.(slide)}
                      className="w-full h-full object-cover cursor-pointer transition-opacity duration-300"
                      loading={idx === 0 ? 'eager' : 'lazy'}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Previous Arrow Button */}
          <button
            type="button"
            onClick={goToPrevSlide}
            aria-label="Previous promotional slide"
            className="absolute left-2.5 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/45 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-xs transition-all duration-200 cursor-pointer shadow-md focus-visible:outline-2 focus-visible:outline-[#FFC928] group z-20"
          >
            <ChevronLeft
              className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform"
              strokeWidth={2.5}
            />
          </button>

          {/* Next Arrow Button */}
          <button
            type="button"
            onClick={goToNextSlide}
            aria-label="Next promotional slide"
            className="absolute right-2.5 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/45 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-xs transition-all duration-200 cursor-pointer shadow-md focus-visible:outline-2 focus-visible:outline-[#FFC928] group z-20"
          >
            <ChevronRight
              className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform"
              strokeWidth={2.5}
            />
          </button>

          {/* Slide Indicator Dots (Bottom Center) */}
          <div
            className="absolute bottom-3 sm:bottom-4.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/45 backdrop-blur-xs"
            role="tablist"
            aria-label="Carousel pagination"
          >
            {CAROUSEL_SLIDES.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
                  onClick={() => goToSlide(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FFC928] ${
                    isActive
                      ? 'w-6 sm:w-7 h-2 sm:h-2.5 bg-[#FFC928]'
                      : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/60 hover:bg-white'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionalCarousel;
