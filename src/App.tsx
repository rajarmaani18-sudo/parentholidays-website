/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import TrendingPackagesTicker from './components/TrendingPackagesTicker';
import NavigationBar, { NavItemKey } from './components/NavigationBar';
import HeroSection from './components/HeroSection';
import PromotionalCarousel from './components/PromotionalCarousel';
import PopularHolidayPackages from './components/PopularHolidayPackages';
import AboutUs from './components/AboutUs';
import TestimonialsSection from './components/TestimonialsSection';
import DreamVacationCTA from './components/DreamVacationCTA';
import ParentsHolidayLogo from './components/ParentsHolidayLogo';
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Heart,
  Award,
  Clock,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
} from 'lucide-react';

const SOCIAL_MEDIA_LINKS = [
  {
    name: 'Instagram',
    icon: Instagram,
    url: 'https://instagram.com', // update with official profile link
  },
  {
    name: 'Facebook',
    icon: Facebook,
    url: 'https://facebook.com', // update with official profile link
  },
  {
    name: 'YouTube',
    icon: Youtube,
    url: 'https://youtube.com', // update with official profile link
  },
  {
    name: 'Twitter / X',
    icon: Twitter,
    url: 'https://twitter.com', // update with official profile link
  },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'about-us'>('home');
  const [activeNavItem, setActiveNavItem] = useState<NavItemKey>('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#about-us' || hash === '#about') {
        setCurrentPage('about-us');
        setActiveNavItem('about-us');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash === '#testimonials') {
        setCurrentPage('home');
        setActiveNavItem('testimonials');
        setTimeout(() => {
          const el = document.getElementById('testimonials');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 120);
      } else if (hash === '#popular-packages') {
        setCurrentPage('home');
        setActiveNavItem('holiday-packages');
        setTimeout(() => {
          const el = document.getElementById('popular-packages');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 120);
      } else {
        // Default or #home
        if (hash === '#home' || !hash) {
          setCurrentPage('home');
          setActiveNavItem('home');
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (key: NavItemKey) => {
    setActiveNavItem(key);
    if (key === 'about-us') {
      setCurrentPage('about-us');
      window.location.hash = '#about-us';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (key === 'home') {
      setCurrentPage('home');
      window.location.hash = '#home';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (key === 'holiday-packages') {
      if (currentPage !== 'home') {
        setCurrentPage('home');
      }
      window.location.hash = '#popular-packages';
      setTimeout(() => {
        const el = document.getElementById('popular-packages');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 400, behavior: 'smooth' });
        }
      }, 100);
    } else if (key === 'testimonials') {
      const scrollToTestimonials = () => {
        const el = document.getElementById('testimonials');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };

      if (currentPage !== 'home') {
        setCurrentPage('home');
        setTimeout(scrollToTestimonials, 100);
      } else {
        scrollToTestimonials();
      }

      if (window.location.hash !== '#testimonials') {
        window.history.pushState(null, '', '#testimonials');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-black flex flex-col overflow-x-hidden">
      {/* Exact Header (ParentHolidays.com) */}
      <header className="w-full bg-black sticky top-0 z-50 shadow-md">
        {/* ROW 1 — TRENDING HOLIDAY PACKAGES TICKER */}
        <TrendingPackagesTicker />

        {/* ROW 2 — MAIN NAVIGATION BAR */}
        <NavigationBar
          currentActiveItem={currentPage === 'about-us' ? 'about-us' : activeNavItem}
          onNavigate={(key) => handleNavigate(key)}
        />
      </header>

      {/* Main Content Sections */}
      <main className="flex-1">
        {currentPage === 'about-us' ? (
          <AboutUs
            onNavigateHome={() => handleNavigate('home')}
            onExplorePackages={() => handleNavigate('holiday-packages')}
          />
        ) : (
          <>
            {/* 1. Hero Section with Search Controls & 7 Trending Destinations */}
            <HeroSection />

            {/* 2. Centered Auto-Sliding Holiday Promotional Carousel */}
            <PromotionalCarousel />

            {/* 3. Replicated Popular Holiday Packages Section (16 Cards) */}
            <PopularHolidayPackages />

            {/* 4. Cherished Moments Testimonials Section */}
            <TestimonialsSection />

            {/* 5. Dream Vacation Call-to-Action Banner */}
            <DreamVacationCTA onExplorePackages={() => handleNavigate('holiday-packages')} />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full bg-black text-white border-t-4 border-[#FFC928]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-10 xl:gap-14">
            <div className="space-y-4 sm:space-y-5 lg:pr-2">
              <button
                type="button"
                onClick={() => handleNavigate('home')}
                className="cursor-pointer focus:outline-none"
                aria-label="Parent's Holiday Home"
              >
                <ParentsHolidayLogo />
              </button>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Dedicated holidays crafted with care for senior travellers. We provide barrier-free stays, unhurried itineraries, medical assurance, and warm companionship.
              </p>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#FFC928]">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>100% Senior Safety & Doctor-on-Call Assurance</span>
              </div>
            </div>

            <div>
              <h4 className="text-sm sm:text-base font-bold text-[#FFC928] uppercase tracking-wider mb-4 sm:mb-5">
                Popular Holiday Categories
              </h4>
              <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-neutral-300">
                <li>
                  <button
                    onClick={() => handleNavigate('holiday-packages')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Domestic Senior Getaways
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigate('holiday-packages')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    International Escorted Tours
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigate('holiday-packages')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Ayurvedic & Wellness Retreats
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigate('holiday-packages')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Sacred Spiritual Pilgrimages
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigate('holiday-packages')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Himalayan & Scenic Hill Stations
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm sm:text-base font-bold text-[#FFC928] uppercase tracking-wider mb-4 sm:mb-5">
                Senior Traveler Services
              </h4>
              <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-neutral-300">
                <li className="flex items-center gap-2">
                  <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFC928] shrink-0" /> Accessible Hotels with Elevators
                </li>
                <li className="flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFC928] shrink-0" /> Mild, Vegetarian & Jain Meals
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFC928] shrink-0" /> Gentle Pace, Zero Early Mornings
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFC928] shrink-0" /> Dedicated Care Managers
                </li>
                <li className="pt-2">
                  <button
                    onClick={() => handleNavigate('about-us')}
                    className="text-[#FFC928] hover:underline font-bold transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>Read About Our Senior Mission →</span>
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm sm:text-base font-bold text-[#FFC928] uppercase tracking-wider mb-4 sm:mb-5">
                Senior Helpdesk & Booking
              </h4>
              <div className="space-y-3 sm:space-y-3.5 text-xs sm:text-sm text-neutral-300">
                <p className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#FFC928] shrink-0" />
                  <a href="tel:+918005550199" className="hover:text-white font-bold text-white transition-colors">
                    +91 800-555-0199 (Toll Free)
                  </a>
                </p>
                <p className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#FFC928] shrink-0" />
                  <span>care@parentholidays.com</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#FFC928] shrink-0 mt-0.5" />
                  <span>Available 7 Days a Week, 8:00 AM – 9:00 PM IST</span>
                </p>

                {/* Four Social Media Buttons */}
                <div className="pt-2 sm:pt-2.5">
                  <div
                    className="flex items-center gap-2.5 sm:gap-3"
                    role="group"
                    aria-label="ParentHolidays on Social Media"
                  >
                    {SOCIAL_MEDIA_LINKS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={item.name}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit ParentHolidays on ${item.name} (opens in new tab)`}
                          title={item.name}
                          className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-neutral-900 border border-neutral-700/80 text-neutral-300 hover:text-black hover:bg-[#FFC928] hover:border-[#FFC928] hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#FFC928]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC928] focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-all duration-200 cursor-pointer"
                        >
                          <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" aria-hidden="true" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-neutral-800 text-xs sm:text-sm text-neutral-400 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} ParentHolidays.com. All rights reserved. Thoughtfully crafted for senior travellers.</p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => handleNavigate('about-us')}
                className="hover:text-white cursor-pointer transition-colors"
              >
                About Us
              </button>
              <span>·</span>
              <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
              <span>·</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
              <span>·</span>
              <button
                type="button"
                onClick={() => handleNavigate('about-us')}
                className="hover:text-white cursor-pointer transition-colors"
              >
                Senior Safety Protocol
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
