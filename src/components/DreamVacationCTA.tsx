import React from 'react';
import { Phone, Gift } from 'lucide-react';

interface DreamVacationCTAProps {
  onExplorePackages?: () => void;
}

export const DreamVacationCTA: React.FC<DreamVacationCTAProps> = ({
  onExplorePackages,
}) => {
  return (
    <section aria-label="Dream Vacation Call to Action" className="w-full">
      <div className="w-[calc(100%-24px)] sm:w-[calc(100%-48px)] md:w-[calc(100%-64px)] max-w-[1600px] mx-auto py-4 sm:py-5 lg:py-5.5">
        <div className="w-full bg-black border border-[#FFC928] rounded-[18px] sm:rounded-[20px] shadow-xl px-4 sm:px-6 lg:px-7 py-4 sm:py-5 lg:py-0 lg:h-[120px] lg:max-h-[140px] flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6">
          {/* Left & Middle Wrapper */}
          <div className="flex items-center gap-3.5 sm:gap-4 lg:gap-5 w-full lg:w-auto flex-1 min-w-0">
            {/* Left: Compact rounded-square icon container with subtle dark-gold background */}
            <div
              className="w-11 h-11 sm:w-13 sm:h-13 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl bg-[#FFC928]/15 border border-[#FFC928]/40 flex items-center justify-center text-[#FFC928] shrink-0 shadow-inner"
              aria-hidden="true"
            >
              <Gift className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 stroke-[1.8]" />
            </div>

            {/* Center: Headline and description stacked vertically */}
            <div className="flex-1 min-w-0 text-left">
              <h2 className="text-sm sm:text-base md:text-lg lg:text-[19px] xl:text-[21px] font-bold text-white tracking-tight leading-snug">
                Ready to Gift Your Parents Their Dream Vacation?
              </h2>
              <p className="text-[11px] sm:text-xs md:text-[13px] text-neutral-300 mt-0.5 sm:mt-1 leading-normal">
                Explore our curated catalogue of 16 popular domestic and international packages handpicked for senior comfort and safety.
              </p>
            </div>
          </div>

          {/* Right: Both buttons side by side on tablet/desktop, stacked on narrow mobile */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-end gap-2.5 sm:gap-3 shrink-0">
            {/* Primary Button */}
            <button
              type="button"
              onClick={onExplorePackages}
              className="h-10 sm:h-11 px-4 sm:px-5 bg-[#FFC928] hover:bg-[#ffbf00] active:bg-[#e6b320] text-black font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center whitespace-nowrap cursor-pointer"
            >
              Explore Popular Holiday Packages
            </button>

            {/* Secondary Call Button */}
            <a
              href="tel:+918005550199"
              className="h-10 sm:h-11 px-3.5 sm:px-4.5 bg-[#18181b] hover:bg-[#27272a] active:bg-[#121214] text-white border border-neutral-700 hover:border-[#FFC928] font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFC928] shrink-0" />
              <span>Call Senior Helpdesk: +91 800-555-0199</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DreamVacationCTA;
