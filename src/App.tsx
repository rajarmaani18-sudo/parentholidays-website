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
import ParentsHolidayLogo from './components/ParentsHolidayLogo';
import { Phone, Mail, MapPin, ShieldCheck, Heart, Award, Clock } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'about-us'>('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#about-us' || hash === '#about') {
        setCurrentPage('about-us');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash === '#popular-packages') {
        setCurrentPage('home');
      } else {
        // Default or #home
        if (hash === '#home' || !hash) {
          setCurrentPage('home');
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (key: NavItemKey) => {
    if (key === 'about-us') {
      setCurrentPage('about-us');
      window.location.hash = '#about-us';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (key === 'home') {
      setCurrentPage('home');
      window.location.hash = '#home';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (key === 'holiday-packages') {
      setCurrentPage('home');
      window.location.hash = '#popular-packages';
      setTimeout(() => {
        const el = document.getElementById('popular-packages');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 400, behavior: 'smooth' });
        }
      }, 100);
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
          currentActiveItem={currentPage === 'about-us' ? 'about-us' : 'home'}
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
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full bg-black text-white border-t-4 border-[#FFC928]">
        <div className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => handleNavigate('home')}
                className="cursor-pointer focus:outline-none"
                aria-label="Parent's Holiday Home"
              >
                <ParentsHolidayLogo />
              </button>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Dedicated holidays crafted with care for senior travellers. We provide barrier-free stays, unhurried itineraries, medical assurance, and warm companionship.
              </p>
              <div className="flex items-center gap-2 text-xs text-[#FFC928]">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Senior Safety & Doctor-on-Call Assurance</span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-[#FFC928] uppercase tracking-wider mb-4">
                Popular Holiday Categories
              </h4>
              <ul className="space-y-2 text-xs text-neutral-300">
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
              <h4 className="text-sm font-bold text-[#FFC928] uppercase tracking-wider mb-4">
                Senior Traveler Services
              </h4>
              <ul className="space-y-2 text-xs text-neutral-300">
                <li className="flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-[#FFC928]" /> Accessible Hotels with Elevators
                </li>
                <li className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#FFC928]" /> Mild, Vegetarian & Jain Meals
                </li>
                <li className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#FFC928]" /> Gentle Pace, Zero Early Mornings
                </li>
                <li className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FFC928]" /> Dedicated Care Managers
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
              <h4 className="text-sm font-bold text-[#FFC928] uppercase tracking-wider mb-4">
                Senior Helpdesk & Booking
              </h4>
              <div className="space-y-3 text-xs text-neutral-300">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#FFC928]" />
                  <a href="tel:+918005550199" className="hover:text-white font-bold text-white">
                    +91 800-555-0199 (Toll Free)
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#FFC928]" />
                  <span>care@parentholidays.com</span>
                </p>
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#FFC928] shrink-0 mt-0.5" />
                  <span>Available 7 Days a Week, 8:00 AM – 9:00 PM IST</span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-neutral-800 text-center text-xs text-neutral-400 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>© {new Date().getFullYear()} ParentHolidays.com. All rights reserved. Thoughtfully crafted for senior travellers.</p>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => handleNavigate('about-us')}
                className="hover:text-white cursor-pointer"
              >
                About Us
              </button>
              <span>·</span>
              <span className="hover:text-white cursor-pointer">Privacy Policy</span>
              <span>·</span>
              <span className="hover:text-white cursor-pointer">Terms of Service</span>
              <span>·</span>
              <button
                type="button"
                onClick={() => handleNavigate('about-us')}
                className="hover:text-white cursor-pointer"
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
