/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Heart,
  ShieldCheck,
  Award,
  Clock,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Users,
  Compass,
  Star,
  ChevronRight,
  Stethoscope,
  Smile,
  Coffee,
  Check,
  Send,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

import heroCoupleImg from '../assets/images/hero_seniors_travel_1791629726859.jpg';
import careManagerImg from '../assets/images/about_care_manager_1791638888190.jpg';
import doctorAssuranceImg from '../assets/images/about_doctor_assurance_1791638917739.jpg';
import TestimonialsSection from './TestimonialsSection';
import DreamVacationCTA from './DreamVacationCTA';

interface AboutUsProps {
  onNavigateHome?: () => void;
  onExplorePackages?: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({
  onNavigateHome,
  onExplorePackages,
}) => {
  // Active protocol tab
  const [activeSafetyTab, setActiveSafetyTab] = useState<'medical' | 'pace' | 'stays' | 'dining'>('medical');

  return (
    <div className="w-full bg-[#FAF7F0] text-black">
      {/* 1. CINEMATIC HERO BANNER WITH SCENIC SENIOR TRAVEL PHOTOGRAPH */}
      <section className="w-full relative min-h-[480px] sm:min-h-[540px] lg:min-h-[600px] flex items-center bg-black text-white border-b-4 border-[#FFC928] overflow-hidden">
        {/* Background Scenic Travel Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroCoupleImg}
            alt="Senior couple enjoying a peaceful scenic holiday view overlooking lake and hills"
            className="w-full h-full object-cover object-[center_28%]"
          />
          {/* Deep cinematic gradient overlay matching the true-black brand palette */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-black/60 md:to-black/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        </div>

        {/* Content Container */}
        <div className="w-[calc(100%-24px)] sm:w-[calc(100%-48px)] md:w-[calc(100%-76px)] max-w-none mx-auto relative z-10 py-10 sm:py-14 lg:py-16">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300">
              <li>
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="hover:text-[#FFC928] transition-colors cursor-pointer flex items-center gap-1"
                >
                  Home
                </button>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="w-3.5 h-3.5 text-[#FFC928]" />
              </li>
              <li className="text-[#FFC928] font-bold">About Us</li>
            </ol>
          </nav>

          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2.5 mb-3">
            <div className="w-8 h-[2px] bg-[#FFC928]" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FFC928]">
              Handcrafted for Senior Travellers · ParentHolidays
            </span>
            <div className="w-8 h-[2px] bg-[#FFC928]" />
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white max-w-4xl leading-tight drop-shadow-sm">
            Crafting Worry-Free, Dignified Holidays for Senior Parents
          </h1>

          <p className="mt-4 text-sm sm:text-base lg:text-lg text-neutral-200 max-w-3xl leading-relaxed drop-shadow-sm">
            ParentHolidays was created with a single heartfelt mission: ensuring our elderly parents experience the sheer wonder of travel with unhurried paces, accessible barrier-free comforts, doctor-on-call safety, and dedicated companionship.
          </p>

          {/* Direct Hero CTA Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={onExplorePackages}
              className="px-6 py-3 bg-[#FFC928] hover:bg-[#ffbf00] text-black font-extrabold text-sm sm:text-base rounded-xl transition-all shadow-lg hover:shadow-xl cursor-pointer flex items-center gap-2"
            >
              <span>Explore Holiday Packages</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="tel:+918005550199"
              className="px-5 py-3 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white border border-neutral-600 hover:border-[#FFC928] font-bold text-sm sm:text-base rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#FFC928]" />
              <span>Senior Helpdesk: +91 800-555-0199</span>
            </a>
          </div>

          {/* Quick Key Metrics Bar */}
          <div className="mt-10 pt-8 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-black/75 backdrop-blur-md border border-neutral-700/80 rounded-xl p-4 shadow-lg">
              <div className="text-2xl sm:text-3xl font-black text-[#FFC928]">12,500+</div>
              <div className="text-xs sm:text-sm text-neutral-200 font-medium mt-1">Happy Senior Travellers</div>
            </div>
            <div className="bg-black/75 backdrop-blur-md border border-neutral-700/80 rounded-xl p-4 shadow-lg">
              <div className="text-2xl sm:text-3xl font-black text-[#FFC928]">100%</div>
              <div className="text-xs sm:text-sm text-neutral-200 font-medium mt-1">Barrier-Free Hotel Stays</div>
            </div>
            <div className="bg-black/75 backdrop-blur-md border border-neutral-700/80 rounded-xl p-4 shadow-lg">
              <div className="text-2xl sm:text-3xl font-black text-[#FFC928]">24 / 7</div>
              <div className="text-xs sm:text-sm text-neutral-200 font-medium mt-1">Doctor-on-Call Assurance</div>
            </div>
            <div className="bg-black/75 backdrop-blur-md border border-neutral-700/80 rounded-xl p-4 shadow-lg">
              <div className="text-2xl sm:text-3xl font-black text-[#FFC928]">4.95 ★</div>
              <div className="text-xs sm:text-sm text-neutral-200 font-medium mt-1">Family Trust & Care Score</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OUR ORIGIN STORY & FOUNDING PURPOSE */}
      <section className="py-7 sm:py-9 lg:py-10">
        <div className="w-[calc(100%-24px)] sm:w-[calc(100%-48px)] md:w-[calc(100%-76px)] max-w-none mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-stretch">
            {/* Story text column on the left */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black bg-[#FFC928]/20 px-3 py-1 rounded-md border border-[#FFC928]/40 mb-2 sm:mb-2.5">
                  <Heart className="w-3.5 h-3.5 fill-[#FFC928] text-black" />
                  <span>Our Origin Story</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-[25px] xl:text-[28px] 2xl:text-[31px] font-extrabold text-black tracking-tight leading-snug lg:leading-[1.24] mb-2.5 sm:mb-3">
                  <span className="inline lg:block">Born From a Simple Question: Why Is Vacationing</span>{' '}
                  <span className="inline lg:block">So Stressful for Our Aging Parents?</span>
                </h2>

                <p className="text-xs sm:text-sm lg:text-[14.5px] xl:text-[15px] text-neutral-700 leading-relaxed mb-2.5 sm:mb-3">
                  A few years ago, we booked a commercial package tour for our retired parents. On paper, it was billed as a dream vacation. But in reality, it turned into an exhausting trial: rushing down hotel stairs at 6:00 AM, dragging heavy suitcases across train platforms, walking miles without shaded resting benches, and worrying about unfamiliar spicy food and missed heart medications.
                </p>

                <p className="text-xs sm:text-sm lg:text-[14.5px] xl:text-[15px] text-neutral-700 leading-relaxed mb-3 sm:mb-3.5">
                  We realized that mainstream travel is designed solely for rapid, young tourists. Senior citizens who have spent their entire lives providing for their families deserve something profoundly different: gentle itineraries that respect their pace, rooms with walk-in showers and elevators, nutritious mild meals, and on-ground companions who watch over them like family.
                </p>
              </div>

              {/* Founding team quote card positioned naturally beneath paragraphs */}
              <div className="p-3.5 sm:p-4 lg:p-4.5 rounded-2xl bg-black text-white border-l-4 border-[#FFC928] shadow-md mt-3 sm:mt-3.5">
                <p className="italic text-xs sm:text-sm lg:text-[13.5px] text-neutral-200 leading-relaxed">
                  "Our parents spent 30 to 40 years putting everyone else first. When they finally have the time to see Kashmir, Kerala, or Switzerland, they should not have to worry about a single stair, heavy bag, or medicine dose. That is our solemn commitment at ParentHolidays."
                </p>
                <div className="mt-2 sm:mt-2.5 flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-bold text-[#FFC928]">— The Founding Team, ParentHolidays</span>
                  <span className="text-neutral-400 text-[11px] sm:text-xs">Crafted with Gratitude</span>
                </div>
              </div>
            </div>

            {/* Story Image Panel on the right matching left column height */}
            <div className="lg:col-span-5 flex flex-col justify-start">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-neutral-300 bg-white flex flex-col h-full max-h-[460px] lg:max-h-[475px] xl:max-h-[490px]">
                <img
                  src={careManagerImg}
                  alt="Senior couple taking a serene walk with their dedicated ParentHolidays tour care manager"
                  className="w-full flex-1 h-[220px] sm:h-[260px] lg:h-[310px] xl:h-[325px] min-h-[200px] object-cover"
                />
                <div className="p-3.5 sm:p-4 bg-black text-white shrink-0">
                  <div className="flex items-center gap-2 text-[#FFC928] font-bold text-xs sm:text-sm">
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                    <span>Trained Senior Tour Managers on Every Departure</span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-neutral-300 mt-1 leading-relaxed">
                    Every group has a certified bilingual care manager responsible for medication reminders, luggage coordination, and personalized assistance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE 6 PILLARS OF PARENTHOLIDAYS (THE SENIOR-FIRST DIFFERENCE) */}
      <section className="py-7 sm:py-11 bg-white border-y border-neutral-200">
        <div className="w-[calc(100%-24px)] sm:w-[calc(100%-48px)] md:w-[calc(100%-76px)] max-w-none mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black bg-[#FFC928]/30 px-3 py-1 rounded-md border border-[#FFC928]">
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>Thoughtful Engineering for Comfort</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black tracking-tight mt-3">
              The 6 Golden Pillars of Senior-Centric Travel
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-600">
              Every single detail of a ParentHolidays itinerary is vetted against stringent safety, mobility, and wellness standards before any booking is confirmed.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {/* Pillar 1 */}
            <div className="bg-[#FAF7F0] rounded-2xl p-6 sm:p-7 border border-[#E8E2D2] hover:border-black transition-all hover:shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-black text-[#FFC928] flex items-center justify-center mb-5 shadow-sm">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-black mb-2">
                  1. Unhurried, Relaxed Pace
                </h3>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  No 6:00 AM wake-up whistles or sprint through 6 monuments in a day. We schedule a maximum of 2 gentle sights per day, with mandatory 2-hour post-lunch rest breaks at the hotel.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-[#E8E2D2] text-xs font-semibold text-black flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#FFC928]" />
                <span>Zero Rushed Transfers Guaranteed</span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-[#FAF7F0] rounded-2xl p-6 sm:p-7 border border-[#E8E2D2] hover:border-black transition-all hover:shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-black text-[#FFC928] flex items-center justify-center mb-5 shadow-sm">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-black mb-2">
                  2. 24/7 Doctor-on-Call & Medical Concierge
                </h3>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  Every tour includes verified local medical tie-ups in each city, onboard emergency first aid & pulse oximeters, and instant tele-consultation with our retained panel doctors.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-[#E8E2D2] text-xs font-semibold text-black flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#FFC928]" />
                <span>Comprehensive Medical Cover Included</span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-[#FAF7F0] rounded-2xl p-6 sm:p-7 border border-[#E8E2D2] hover:border-black transition-all hover:shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-black text-[#FFC928] flex items-center justify-center mb-5 shadow-sm">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-black mb-2">
                  3. 100% Barrier-Free Hotel Stays
                </h3>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  Hotels are physically inspected for working elevators, wide corridors, zero tall doorstep thresholds, walk-in showers with non-slip flooring, and grab-bar bathroom options.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-[#E8E2D2] text-xs font-semibold text-black flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#FFC928]" />
                <span>Wheelchairs Provided on Request</span>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="bg-[#FAF7F0] rounded-2xl p-6 sm:p-7 border border-[#E8E2D2] hover:border-black transition-all hover:shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-black text-[#FFC928] flex items-center justify-center mb-5 shadow-sm">
                  <Coffee className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-black mb-2">
                  4. Wholesome & Familiar Dining
                </h3>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  We cater to delicate palates: mild, fresh, hygienically prepared vegetarian, Jain, low-spice, and low-sodium meals. Packaged mineral water is provided throughout each day.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-[#E8E2D2] text-xs font-semibold text-black flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#FFC928]" />
                <span>Personal Dietary Plans Respected</span>
              </div>
            </div>

            {/* Pillar 5 */}
            <div className="bg-[#FAF7F0] rounded-2xl p-6 sm:p-7 border border-[#E8E2D2] hover:border-black transition-all hover:shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-black text-[#FFC928] flex items-center justify-center mb-5 shadow-sm">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-black mb-2">
                  5. Door-to-Door Luggage Support
                </h3>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  Seniors should never strain their backs. Dedicated porters collect and deliver baggage right outside the hotel room door, vehicle boot, and airport terminal checkpoints.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-[#E8E2D2] text-xs font-semibold text-black flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#FFC928]" />
                <span>Zero Heavy Lifting for Travellers</span>
              </div>
            </div>

            {/* Pillar 6 */}
            <div className="bg-[#FAF7F0] rounded-2xl p-6 sm:p-7 border border-[#E8E2D2] hover:border-black transition-all hover:shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-black text-[#FFC928] flex items-center justify-center mb-5 shadow-sm">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-black mb-2">
                  6. Small Groups & Warm Camaraderie
                </h3>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  Our group tours never exceed 14–18 senior guests. Everyone shares stories, laughs over evening tea, forms lasting friendships, and travels in a safe, warm, family-like circle.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-[#E8E2D2] text-xs font-semibold text-black flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#FFC928]" />
                <span>Lifelong Friendships Built Here</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SENIOR MEDICAL PROTOCOL ASSURANCE (INTERACTIVE DETAIL SECTION) */}
      <section className="py-7 sm:py-9 lg:py-10">
        <div className="w-[calc(100%-24px)] sm:w-[calc(100%-48px)] md:w-[calc(100%-76px)] max-w-none mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-stretch">
            {/* Interactive Tabs on the left */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black bg-[#FFC928]/20 px-3 py-1 rounded-md border border-[#FFC928]/40 mb-1.5 sm:mb-2">
                  <ShieldCheck className="w-3.5 h-3.5 fill-[#FFC928] text-black" />
                  <span>Total Family Peace of Mind</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-[25px] xl:text-[28px] 2xl:text-[31px] font-extrabold text-black tracking-tight leading-snug lg:whitespace-nowrap mb-1.5 sm:mb-2">
                  How We Safeguard Your Parents at Every Step
                </h2>

                <p className="text-xs sm:text-sm lg:text-[14.5px] text-neutral-700 leading-relaxed mb-2.5 sm:mb-3">
                  When you entrust your parents to ParentHolidays, you receive continuous updates, dedicated phone lines, and complete medical preparedness before, during, and after their journey.
                </p>

                {/* Tab Selector Buttons */}
                <div className="flex flex-nowrap sm:flex-wrap gap-1 sm:gap-2 p-1 sm:p-1.5 bg-[#E8E2D2] rounded-xl w-full mb-2 sm:mb-2.5">
                  <button
                    type="button"
                    onClick={() => setActiveSafetyTab('medical')}
                    className={`flex-1 sm:flex-none text-center px-1 sm:px-4 py-1.5 sm:py-2 text-[10px] min-[375px]:text-[11px] sm:text-sm font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                      activeSafetyTab === 'medical'
                        ? 'bg-black text-[#FFC928] shadow-md'
                        : 'text-neutral-800 hover:text-black'
                    }`}
                  >
                    Medical Care
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSafetyTab('pace')}
                    className={`flex-1 sm:flex-none text-center px-1 sm:px-4 py-1.5 sm:py-2 text-[10px] min-[375px]:text-[11px] sm:text-sm font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                      activeSafetyTab === 'pace'
                        ? 'bg-black text-[#FFC928] shadow-md'
                        : 'text-neutral-800 hover:text-black'
                    }`}
                  >
                    Gentle Trips
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSafetyTab('stays')}
                    className={`flex-1 sm:flex-none text-center px-1 sm:px-4 py-1.5 sm:py-2 text-[10px] min-[375px]:text-[11px] sm:text-sm font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                      activeSafetyTab === 'stays'
                        ? 'bg-black text-[#FFC928] shadow-md'
                        : 'text-neutral-800 hover:text-black'
                    }`}
                  >
                    Easy Stays
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSafetyTab('dining')}
                    className={`flex-1 sm:flex-none text-center px-1 sm:px-4 py-1.5 sm:py-2 text-[10px] min-[375px]:text-[11px] sm:text-sm font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                      activeSafetyTab === 'dining'
                        ? 'bg-black text-[#FFC928] shadow-md'
                        : 'text-neutral-800 hover:text-black'
                    }`}
                  >
                    Special Meals
                  </button>
                </div>
              </div>

              {/* Tab Content Box */}
              <div className="p-3.5 sm:p-4 lg:p-4.5 bg-white rounded-2xl border border-neutral-300 shadow-sm mt-3 sm:mt-3.5">
                {activeSafetyTab === 'medical' && (
                  <div className="space-y-2.5">
                    <h4 className="font-bold text-sm sm:text-base text-black flex items-center gap-2">
                      <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFC928]" />
                      Doctor on Call, Vital Signs Checks & First Aid
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                      Our tour manager carries automated blood pressure monitors, fingertip pulse oximeters, thermometer, and sterile first-aid dressings. In high-altitude trips (like Kashmir or Ladakh), certified supplemental oxygen is maintained in every transport coach.
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-neutral-700 font-medium pt-1">
                      <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Pre-travel medical clearance forms</li>
                      <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Daily medication schedule alerts</li>
                      <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Comprehensive senior insurance</li>
                      <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> 24/7 family emergency hotline</li>
                    </ul>
                  </div>
                )}

                {activeSafetyTab === 'pace' && (
                  <div className="space-y-2.5">
                    <h4 className="font-bold text-sm sm:text-base text-black flex items-center gap-2">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFC928]" />
                      Zero Morning Rush & Ample Leisure
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                      Sightseeing starts only after 9:30 AM following an unhurried, nourishing breakfast. All drives between sights are capped at comfortable 1.5–2 hour stretches with restroom breaks at clean, sanitized partner cafeterias.
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-neutral-700 font-medium pt-1">
                      <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Clean European-style washrooms</li>
                      <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Low-entry coach steps & handrails</li>
                      <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Dedicated seat cushioning</li>
                      <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Ample tea & coffee pauses</li>
                    </ul>
                  </div>
                )}

                {activeSafetyTab === 'stays' && (
                  <div className="space-y-2.5">
                    <h4 className="font-bold text-sm sm:text-base text-black flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFC928]" />
                      Hand-Audited Senior-Friendly Accommodations
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                      We stay only in premium heritage and 4-star/5-star properties audited for elevator accessibility. Room allocations are prioritized for lower floors or direct proximity to the main elevators to eliminate long corridor walks.
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-neutral-700 font-medium pt-1">
                      <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Anti-slip bathroom mats in every room</li>
                      <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Non-slip walking pathways</li>
                      <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Shower stools available upon request</li>
                      <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Well-lit bedside switch controls</li>
                    </ul>
                  </div>
                )}

                {activeSafetyTab === 'dining' && (
                  <div className="space-y-2.5">
                    <h4 className="font-bold text-sm sm:text-base text-black flex items-center gap-2">
                      <Coffee className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFC928]" />
                      Homestyle, Low-Sodium & Vegetarian Delicacies
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                      Enjoying regional flavours should never cause digestive upset. We work directly with executive hotel chefs to ensure mild spices, pure ghee/olive oil preparation, hot khichdi/soups on request, and strict adherence to dietary prescriptions.
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-neutral-700 font-medium pt-1">
                      <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Pure Vegetarian & Jain counters</li>
                      <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Diabetic-friendly dessert options</li>
                      <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Sealed mineral water bottles</li>
                      <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Warm milk at bedtime upon request</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Medical Assurance Photo Card on the right matching left column height */}
            <div className="lg:col-span-5 flex flex-col justify-start">
              <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-black bg-white flex flex-col h-full max-h-[440px] lg:max-h-[455px] xl:max-h-[470px]">
                <img
                  src={doctorAssuranceImg}
                  alt="Doctor and medical care coordinator reviewing senior travel checklist"
                  className="w-full flex-1 h-[220px] sm:h-[250px] lg:h-[295px] xl:h-[310px] min-h-[200px] object-cover"
                />
                <div className="p-3.5 sm:p-4 bg-black text-white shrink-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] sm:text-xs uppercase font-bold tracking-wider text-[#FFC928]">
                      Certified Medical Safety Protocol
                    </span>
                    <span className="text-[11px] sm:text-xs font-semibold text-neutral-300">ISO 9001:2015 Standards</span>
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm lg:text-[14px] mt-1 text-white">
                    Emergency Hospital Network in All 45+ Destinations
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SENIOR TRAVELLER REVIEWS & FAMILY TESTIMONIALS */}
      <TestimonialsSection />

      {/* 7. BOTTOM EXPLORE CTA SECTION */}
      <DreamVacationCTA onExplorePackages={onExplorePackages} />
    </div>
  );
};

export default AboutUs;
