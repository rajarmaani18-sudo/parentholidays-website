const fs = require('fs');
const path = require('path');

const imgDir = path.resolve(__dirname, '../src/assets/images');

// Read background photos as base64
const seniorCoupleBase64 = fs.readFileSync(path.join(imgDir, 'hero_seniors_travel_1791629726859.jpg')).toString('base64');
const lakeComoBase64 = fs.readFileSync(path.join(imgDir, 'banner_lake_como_1791632620160.jpg')).toString('base64');
const lakeBledBase64 = fs.readFileSync(path.join(imgDir, 'banner_lake_bled_1791632631656.jpg')).toString('base64');
const lakeTerraceBase64 = fs.readFileSync(path.join(imgDir, 'banner_lake_terrace_1791632643375.jpg')).toString('base64');
const santoriniBase64 = fs.readFileSync(path.join(imgDir, 'banner_santorini_sunset_1791632654824.jpg')).toString('base64');

// Common SVG dimensions: 2400 x 750 (aspect ratio 3.2 : 1)
const W = 2400;
const H = 750;

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe).replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

function createBannerSVG({
  leftImageBase64,
  rightImageBase64,
  titlePart1,
  titlePart2,
  subtitle,
  icons,
  ctaText,
}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" preserveAspectRatio="xMidYMid slice">
  <defs>
    <!-- Gradients -->
    <linearGradient id="deepNavyBg" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#0B1A30" />
      <stop offset="25%" stopColor="#0D2342" />
      <stop offset="50%" stopColor="#0F2C54" />
      <stop offset="75%" stopColor="#0D2342" />
      <stop offset="100%" stopColor="#0B1A30" />
    </linearGradient>

    <linearGradient id="fadeLeft" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#0D2342" stop-opacity="0" />
      <stop offset="60%" stopColor="#0D2342" stop-opacity="0.3" />
      <stop offset="90%" stopColor="#0D2342" stop-opacity="0.95" />
      <stop offset="100%" stopColor="#0D2342" stop-opacity="1" />
    </linearGradient>

    <linearGradient id="fadeRight" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#0D2342" stop-opacity="1" />
      <stop offset="10%" stopColor="#0D2342" stop-opacity="0.95" />
      <stop offset="40%" stopColor="#0D2342" stop-opacity="0.3" />
      <stop offset="100%" stopColor="#0D2342" stop-opacity="0" />
    </linearGradient>

    <linearGradient id="goldButton" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#FFD000" />
      <stop offset="100%" stopColor="#FFB300" />
    </linearGradient>

    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000" flood-opacity="0.4" />
    </filter>

    <filter id="textShadow">
      <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#000" flood-opacity="0.6" />
    </filter>
  </defs>

  <!-- Deep Blue Navy Panoramic Backdrop -->
  <rect width="${W}" height="${H}" fill="url(#deepNavyBg)" />

  <!-- Left Photo: Senior Couple Traveling -->
  <g id="leftPhoto">
    <image href="data:image/jpeg;base64,${leftImageBase64}" x="-40" y="-20" width="880" height="790" preserveAspectRatio="xMidYMid slice" />
    <!-- Gradient Fade to Center -->
    <rect x="420" y="0" width="460" height="${H}" fill="url(#fadeLeft)" />
  </g>

  <!-- Right Photo: Scenic Destination Landscape -->
  <g id="rightPhoto">
    <image href="data:image/jpeg;base64,${rightImageBase64}" x="1540" y="-20" width="900" height="790" preserveAspectRatio="xMidYMid slice" />
    <!-- Gradient Fade to Center -->
    <rect x="1540" y="0" width="460" height="${H}" fill="url(#fadeRight)" />
  </g>

  <!-- Center Content Canvas -->
  <g transform="translate(1200, 0)" text-anchor="middle" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">
    <!-- Top Kicker: PARENTHOLIDAYS.COM -->
    <g transform="translate(0, 115)">
      <line x1="-280" y1="-7" x2="-180" y2="-7" stroke="#FFC928" stroke-width="2" />
      <text font-size="24" font-weight="800" fill="#FFC928" letter-spacing="4">PARENTHOLIDAYS.COM</text>
      <line x1="180" y1="-7" x2="280" y2="-7" stroke="#FFC928" stroke-width="2" />
    </g>

    <!-- Main Headline -->
    <g transform="translate(0, 220)" filter="url(#textShadow)">
      <text font-size="74" font-weight="900" fill="#FFFFFF" letter-spacing="-1">
        ${escapeXml(titlePart1)} <tspan fill="#FFC928">${escapeXml(titlePart2)}</tspan>
      </text>
    </g>

    <!-- Subtitle -->
    <text x="0" y="295" font-size="30" font-weight="500" fill="#E2E8F0" max-width="900" letter-spacing="0.2">
      ${escapeXml(subtitle)}
    </text>

    <!-- 4 Value Pillar Icons Row -->
    <g transform="translate(0, 420)">
      ${icons.map((item, idx) => {
        const xOffset = -420 + idx * 280;
        return `
        <g transform="translate(${xOffset}, 0)">
          <!-- Circle Icon Container -->
          <circle cx="0" cy="0" r="42" fill="none" stroke="#FFC928" stroke-width="2.5" />
          <!-- SVG Outline Icon inside circle -->
          <g transform="translate(-20, -20) scale(1.66)" stroke="#FFC928" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            ${item.iconSvg}
          </g>
          <!-- Icon Label underneath -->
          <text x="0" y="70" font-size="20" font-weight="600" fill="#FFFFFF" text-anchor="middle">
            ${escapeXml(item.labelLine1)}
          </text>
          ${item.labelLine2 ? `<text x="0" y="96" font-size="20" font-weight="600" fill="#FFFFFF" text-anchor="middle">${escapeXml(item.labelLine2)}</text>` : ''}
        </g>`;
      }).join('')}
    </g>

    <!-- CTA Button -->
    <g transform="translate(0, 615)" filter="url(#shadow)" cursor="pointer">
      <rect x="-240" y="-38" width="480" height="76" rx="38" fill="url(#goldButton)" />
      <text x="-20" y="10" font-size="27" font-weight="800" fill="#0B1A30" text-anchor="middle">
        ${escapeXml(ctaText)}
      </text>
      <!-- Circular Arrow Icon -->
      <circle cx="170" cy="0" r="22" fill="#0B1A30" />
      <path d="M165 -7 L173 0 L165 7 M162 0 L172 0" stroke="#FFC928" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" />
    </g>
  </g>
</svg>`;
}

// Icon SVGs
const lotusSvg = `<path d="M12 3 C10 8 7 13 4 16 C8 17 11 16 12 18 C13 16 16 17 20 16 C17 13 14 8 12 3 Z M12 18 C9 20 5 19 3 21 C7 21 11 20 12 21 C13 20 17 21 21 21 C19 19 15 20 12 18 Z" />`;
const mealSvg = `<path d="M4 3 L4 11 C4 13 6 14 8 14 L8 21 M4 7 L12 7 M12 3 L12 11 M16 3 L16 21 M16 3 C19 3 20 6 20 10 L20 13 L16 13" />`;
const guideSvg = `<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M19 8 L22 10 L19 12 L19 16" />`;
const shieldSvg = `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>`;
const usersSvg = `<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`;
const bedSvg = `<path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/>`;
const planeSvg = `<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>`;
const busSvg = `<path d="M8 6v6"/><path d="M16 6v6"/><path d="M2 12h20"/><rect width="20" height="14" x="2" y="5" rx="3"/><path d="M6 19v2"/><path d="M18 19v2"/>`;
const heartSvg = `<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>`;

// 1. Discover the World at Your Pace
const banner1Svg = createBannerSVG({
  leftImageBase64: seniorCoupleBase64,
  rightImageBase64: lakeComoBase64,
  titlePart1: 'Discover the World',
  titlePart2: 'at Your Own Pace',
  subtitle: 'Memorable holidays, crafted for senior travellers with comfort, safety and care.',
  icons: [
    { iconSvg: lotusSvg, labelLine1: 'Relaxed', labelLine2: 'itineraries' },
    { iconSvg: mealSvg, labelLine1: 'Senior-Friendly', labelLine2: 'Stays & Meals' },
    { iconSvg: guideSvg, labelLine1: 'Guided', labelLine2: 'Experiences' },
    { iconSvg: shieldSvg, labelLine1: 'Safe &', labelLine2: 'Reliable Travel' },
  ],
  ctaText: 'Create Your Dream Trip',
});

// 2. Travel More, Worry Less_ Alpine Escape
const banner2Svg = createBannerSVG({
  leftImageBase64: seniorCoupleBase64,
  rightImageBase64: lakeBledBase64,
  titlePart1: 'Travel More',
  titlePart2: 'Worry Less',
  subtitle: 'Thoughtfully planned holidays for seniors, with comfort, care and companionship.',
  icons: [
    { iconSvg: usersSvg, labelLine1: 'Small', labelLine2: 'Group Tours' },
    { iconSvg: shieldSvg, labelLine1: 'Safety', labelLine2: '& Care' },
    { iconSvg: bedSvg, labelLine1: 'Senior-Friendly', labelLine2: 'Stays' },
    { iconSvg: lotusSvg, labelLine1: 'Leisurely', labelLine2: 'Itineraries' },
  ],
  ctaText: 'Plan Your Next Holiday',
});

// 3. Meaningful Journeys by the Lake
const banner3Svg = createBannerSVG({
  leftImageBase64: seniorCoupleBase64,
  rightImageBase64: lakeTerraceBase64,
  titlePart1: 'Meaningful Journeys',
  titlePart2: 'for a Brighter Tomorrow',
  subtitle: 'Relax, Explore and Create New Memories with Hassle-Free Travel Designed for Senior Travellers.',
  icons: [
    { iconSvg: planeSvg, labelLine1: 'Curated', labelLine2: 'Destinations' },
    { iconSvg: bedSvg, labelLine1: 'Comfortable', labelLine2: 'Stays' },
    { iconSvg: guideSvg, labelLine1: 'Trusted', labelLine2: 'Travel Support' },
    { iconSvg: usersSvg, labelLine1: 'Travel at', labelLine2: 'Your Own Pace' },
  ],
  ctaText: 'View Holiday Packages',
});

// 4. Senior Couple’s Santorini Sunset Escape
const banner4Svg = createBannerSVG({
  leftImageBase64: seniorCoupleBase64,
  rightImageBase64: santoriniBase64,
  titlePart1: 'All Ready',
  titlePart2: 'Holiday Packages',
  subtitle: 'Handpicked destinations. Comfortable stays. Hassle-free travel for senior travellers and families.',
  icons: [
    { iconSvg: bedSvg, labelLine1: 'Comfortable', labelLine2: 'Stays' },
    { iconSvg: busSvg, labelLine1: 'Safe', labelLine2: 'Transportation' },
    { iconSvg: guideSvg, labelLine1: 'Experienced', labelLine2: 'Guides' },
    { iconSvg: heartSvg, labelLine1: 'Senior-Friendly', labelLine2: 'Itineraries' },
  ],
  ctaText: 'Explore All Packages',
});

// Write to files
fs.writeFileSync(path.join(imgDir, 'banner_discover_world.svg'), banner1Svg);
fs.writeFileSync(path.join(imgDir, 'banner_travel_more_worry_less.svg'), banner2Svg);
fs.writeFileSync(path.join(imgDir, 'banner_meaningful_journeys.svg'), banner3Svg);
fs.writeFileSync(path.join(imgDir, 'banner_santorini_escape.svg'), banner4Svg);

console.log('Successfully regenerated all 4 promotional banner SVG images with XML escaping!');
