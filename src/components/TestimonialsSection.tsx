import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

export interface Testimonial {
  id: string;
  name: string;
  details: string;
  initials: string;
  review: string;
  rating: number;
  isSample?: boolean;
}

export const TESTIMONIALS_DATA: Testimonial[] = [
  // Existing 1
  {
    id: 'kashmir-gupta',
    name: 'Ramesh & Savita Gupta',
    details: 'Ages 73 & 69 · Kashmir Paradise Tour',
    initials: 'RG',
    review:
      '"At 73, I was terrified of going on a group trip to Kashmir. But ParentHolidays took care of everything: hot water bottles in Dal Lake, zero stair climbs, and the wonderful tour manager Mr. Alok checked our BP twice a day. We felt so safe and pampered!"',
    rating: 5,
  },
  // Existing 2
  {
    id: 'switzerland-nambiar',
    name: 'Siddharth Nambiar (Son)',
    details: 'Booked for Mrs. Malini (Age 70) · Switzerland',
    initials: 'SN',
    review:
      '"I booked the Switzerland Alpine Express for my mother\'s 70th birthday. The daily photo updates sent to our family WhatsApp group kept us totally at ease. She made lifelong friends in the group and hasn\'t stopped smiling since she came back!"',
    rating: 5,
  },
  // Existing 3
  {
    id: 'kerala-shastry',
    name: 'Dr. K.K. Shastry & Vimla',
    details: 'Ages 77 & 72 · Kerala Ayurvedic Retreat',
    initials: 'KS',
    review:
      '"The food was purely sattvic and mild, the hotel had direct elevator access to the garden, and our luggage was already in our room before we reached. Never seen such thoughtful service anywhere in India."',
    rating: 5,
  },
  // 4. Comfortable Kerala holiday with attentive support (Sample)
  {
    id: 'kerala-deshmukh',
    name: 'Ananya Deshmukh (Daughter)',
    details: 'Booked for Parents (Ages 71 & 68) · Kerala Backwaters',
    initials: 'AD',
    review:
      '"My parents were nervous about their first holiday after retirement, but the dedicated care manager in Alleppey assisted with boarding the houseboat and ensured luggage handling was completely seamless. They returned rejuvenated!"',
    rating: 5,
    isSample: true,
  },
  // 5. Family trip to Kashmir (Sample)
  {
    id: 'kashmir-mehra',
    name: 'Vikram & Sunita Mehra',
    details: 'Ages 74 & 70 · Kashmir Scenic Valley',
    initials: 'VM',
    review:
      '"Travelling with three generations can be challenging, but ParentHolidays arranged gentle shikara transfers and warm electric blankets in Srinagar. Seeing our grandchildren laughing alongside us in Pahalgam was priceless."',
    rating: 5,
    isSample: true,
  },
  // 6. Switzerland milestone birthday trip (Sample)
  {
    id: 'switzerland-singhal',
    name: 'Pooja & Arvind Singhal',
    details: "Celebrating Father's 75th Birthday · Swiss Alps Tour",
    initials: 'PS',
    review:
      '"We celebrated Dad\'s 75th milestone with the panoramic Glacier Express rail journey. The unhurried pace, barrier-free train carriages, and Indian meals prepared with low spice made his dream celebration utterly unforgettable."',
    rating: 5,
    isSample: true,
  },
  // 7. Peaceful spiritual journey to Varanasi (Sample)
  {
    id: 'varanasi-trivedi',
    name: 'Pandit B.N. Trivedi & Sharda',
    details: 'Ages 78 & 74 · Varanasi Spiritual Journey',
    initials: 'BT',
    review:
      '"Visiting Kashi had been our lifelong pilgrimage wish. ParentHolidays arranged wheelchair access right up to Dashashwamedh Ghat and a private, stable boat for the evening Ganga Aarti. A deeply tranquil spiritual experience."',
    rating: 5,
    isSample: true,
  },
  // 8. Accessible Rajasthan heritage tour (Sample)
  {
    id: 'rajasthan-bakshi',
    name: 'Col. Rajesh Bakshi (Retd.) & Madhu',
    details: 'Ages 76 & 71 · Royal Rajasthan Palaces',
    initials: 'RB',
    review:
      '"The golf cart transfers straight to the inner courtyards of Amber Fort and City Palace made Rajasthan effortless for my wife\'s knee condition. Heritage luxury delivered with genuine respect for senior travellers."',
    rating: 5,
    isSample: true,
  },
  // 9. Family-friendly Singapore holiday (Sample)
  {
    id: 'singapore-rao',
    name: 'Kavita Rao (Daughter)',
    details: 'Family Trip with Mother (Age 72) · Singapore Garden City',
    initials: 'KR',
    review:
      '"Singapore\'s covered walkways and Gardens by the Bay golf buggies made exploring so restful for mom. The daily WhatsApp check-ins and relaxed itinerary meant zero rushing and total peace of mind for our whole family."',
    rating: 5,
    isSample: true,
  },
  // 10. Well-organized Sri Lanka trip with thoughtful meal arrangements (Sample)
  {
    id: 'srilanka-joshi',
    name: 'Deepak & Rohini Joshi',
    details: 'Ages 69 & 66 · Sri Lanka Cultural Circuit',
    initials: 'DJ',
    review:
      '"From fresh coconut water breaks to customized non-spicy South Indian vegetarian meals at every stop, the hospitality in Kandy and Bentota was extraordinary. We felt looked after like family throughout the entire tour."',
    rating: 5,
    isSample: true,
  },
];

// Triplicated array for seamless continuous infinite looping (10 * 3 = 30 items)
const SLIDES = [...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA];
const TOTAL_ITEMS = TESTIMONIALS_DATA.length; // 10

export const TestimonialsSection: React.FC = () => {
  // Number of cards visible simultaneously: 1 on mobile, 2 on tablet, 3 on desktop
  const [visibleCount, setVisibleCount] = useState<number>(3);
  // Start in the middle replica (index 10)
  const [currentIndex, setCurrentIndex] = useState<number>(TOTAL_ITEMS);
  const [withTransition, setWithTransition] = useState<boolean>(true);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Touch tracking for mobile swipe gestures
  const touchStartXRef = useRef<number>(0);
  const touchEndXRef = useRef<number>(0);
  const isSwipingRef = useRef<boolean>(false);

  // Respect prefers-reduced-motion
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Update visible cards count based on viewport width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCount(1);
      } else if (width < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handlers for next / prev
  const nextSlide = useCallback(() => {
    setWithTransition(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setWithTransition(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  // Autoplay loop: advances every 4 seconds unless paused or reduced-motion enabled
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, prefersReducedMotion, nextSlide]);

  // Seamless jump without jump or blank gap when transition ends
  const handleTransitionEnd = () => {
    if (currentIndex >= TOTAL_ITEMS * 2) {
      setWithTransition(false);
      setCurrentIndex((prev) => (prev % TOTAL_ITEMS) + TOTAL_ITEMS);
    } else if (currentIndex < TOTAL_ITEMS) {
      setWithTransition(false);
      setCurrentIndex((prev) => (prev % TOTAL_ITEMS) + TOTAL_ITEMS);
    }
  };

  // Re-enable transition after seamless index wrap
  useEffect(() => {
    if (!withTransition) {
      const raf = requestAnimationFrame(() => {
        setWithTransition(true);
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [withTransition]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchEndXRef.current = e.touches[0].clientX;
    isSwipingRef.current = true;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwipingRef.current) return;
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isSwipingRef.current) return;
    isSwipingRef.current = false;
    setIsPaused(false);
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
  };

  // Active indicator dot index (0..9)
  const activeDotIndex = ((currentIndex % TOTAL_ITEMS) + TOTAL_ITEMS) % TOTAL_ITEMS;

  return (
    <section
      id="testimonials"
      className="py-5 sm:py-6 lg:py-7 bg-white border-y border-neutral-200 scroll-mt-[96px] sm:scroll-mt-[104px] relative overflow-hidden"
      aria-label="Cherished Moments from Our Senior Travelers"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="w-[calc(100%-24px)] sm:w-[calc(100%-48px)] md:w-[calc(100%-76px)] max-w-none mx-auto">
        {/* Section Header: Compact, centered, single line on desktop */}
        <div className="text-center max-w-4xl mx-auto mb-3 sm:mb-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black bg-[#FFC928]/30 px-3 py-0.5 rounded-md border border-[#FFC928] mb-1.5">
            <Star className="w-3.5 h-3.5 fill-[#FFC928] text-black" />
            <span>Real Stories From Real Families</span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-black tracking-tight lg:whitespace-nowrap">
            Cherished Moments from Our Senior Travelers
          </h2>

          <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm md:text-base text-neutral-600">
            Read how parents and their sons and daughters felt about travelling with ParentHolidays.
          </p>
        </div>

        {/* Carousel Viewport: strictly contains horizontal overflow */}
        <div
          className="relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Animated Carousel Track */}
          <div
            className={`flex ${
              withTransition && !prefersReducedMotion
                ? 'transition-transform duration-500 ease-out'
                : 'transition-none'
            }`}
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {SLIDES.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-2 sm:px-2.5 py-1"
              >
                <div className="h-full p-4 sm:p-5 lg:p-5.5 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D2] flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow duration-200">
                  <div>
                    {/* 5-Star Rating Header */}
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-1 text-[#FFC928]">
                        {[...Array(item.rating)].map((_, starIdx) => (
                          <Star key={starIdx} className="w-4 h-4 fill-[#FFC928]" />
                        ))}
                      </div>
                      {item.isSample && (
                        <span className="text-[10px] font-semibold text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded-full border border-neutral-200">
                          Sample Review
                        </span>
                      )}
                    </div>

                    {/* Review Quote Body */}
                    <p className="italic text-xs sm:text-sm text-neutral-800 leading-relaxed mb-3 min-h-[72px] sm:min-h-[80px] lg:min-h-[86px]">
                      {item.review}
                    </p>
                  </div>

                  {/* Reviewer Details & Initials Avatar */}
                  <div className="pt-3 border-t border-[#E8E2D2] flex items-center justify-between gap-3">
                    <div className="min-w-0 pr-1">
                      <div className="font-bold text-xs sm:text-sm text-black truncate">
                        {item.name}
                      </div>
                      <div className="text-[11px] sm:text-xs text-neutral-500 truncate">
                        {item.details}
                      </div>
                    </div>
                    <div
                      className="w-8 h-8 rounded-full bg-black text-[#FFC928] flex items-center justify-center font-bold text-xs shrink-0 shadow-xs"
                      aria-hidden="true"
                    >
                      {item.initials}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accessible Controls: Previous, Next & Pagination Dots */}
        <div className="flex items-center justify-center gap-3 mt-3 sm:mt-3.5">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous testimonial"
            className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-white hover:bg-[#FFC928] text-black border border-neutral-300 hover:border-[#FFC928] shadow-xs flex items-center justify-center transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FFC928]"
          >
            <ChevronLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>

          {/* 10 Testimonials Progress Dots */}
          <div
            className="flex items-center gap-1.5 px-2"
            role="tablist"
            aria-label="Testimonial slides"
          >
            {TESTIMONIALS_DATA.map((t, dotIdx) => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setWithTransition(true);
                  setCurrentIndex(TOTAL_ITEMS + dotIdx);
                }}
                role="tab"
                aria-selected={activeDotIndex === dotIdx}
                aria-label={`Show testimonial ${dotIdx + 1} of ${TOTAL_ITEMS}: ${t.name}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  activeDotIndex === dotIdx
                    ? 'w-6 bg-[#FFC928]'
                    : 'w-2 bg-neutral-300 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next testimonial"
            className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-white hover:bg-[#FFC928] text-black border border-neutral-300 hover:border-[#FFC928] shadow-xs flex items-center justify-center transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FFC928]"
          >
            <ChevronRight className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
