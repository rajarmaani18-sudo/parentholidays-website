import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Clock,
  Star,
  Heart,
  ShieldCheck,
  UtensilsCrossed,
  Bus,
  Check,
  X,
  ChevronRight,
  Phone,
  ArrowRight,
  Search,
  SlidersHorizontal,
  Hotel,
  Share2,
  Calendar,
  UserCheck,
  Sparkles,
} from 'lucide-react';

// Import all 16 generated authentic destination images
import kashmirImg from '../assets/images/kashmir_india_travel_1791626404208.jpg';
import keralaImg from '../assets/images/kerala_india_travel_1791626393188.jpg';
import baliImg from '../assets/images/bali_indonesia_travel_1791634540116.jpg'; // fallback or bali
import baliMainImg from '../assets/images/bali_indonesia_travel_1791626330048.jpg';
import rajasthanImg from '../assets/images/rajasthan_travel_1791634529054.jpg';
import switzerlandImg from '../assets/images/switzerland_alps_travel_1791634780183.jpg';
import varanasiImg from '../assets/images/varanasi_ghats_travel_1791634568134.jpg';
import thailandImg from '../assets/images/thailand_travel_1791626345806.jpg';
import himachalImg from '../assets/images/himachal_pradesh_travel_1791634518279.jpg';
import singaporeImg from '../assets/images/singapore_travel_1791626357149.jpg';
import sriLankaImg from '../assets/images/sri_lanka_travel_1791626370332.jpg';
import bhutanImg from '../assets/images/bhutan_travel_1791626381535.jpg';
import dubaiImg from '../assets/images/dubai_uae_travel_1791626414499.jpg';
import goaImg from '../assets/images/goa_beach_travel_1791634540116.jpg';
import ootyImg from '../assets/images/ooty_hills_travel_1791634554822.jpg';
import vietnamImg from '../assets/images/vietnam_travel_1791634765157.jpg';
import andamanImg from '../assets/images/andaman_islands_travel_1791634794278.jpg';

export interface HolidayPackage {
  id: string;
  title: string;
  destination: string;
  country: string;
  category: 'domestic' | 'international' | 'scenic' | 'spiritual' | 'beach';
  image: string;
  durationNights: number;
  durationDays: number;
  rating: number;
  reviewCount: number;
  originalPrice: number;
  discountedPrice: number;
  currency: string;
  seniorBadge: string;
  overview: string;
  inclusions: string[];
  seniorHighlights: string[];
  itinerary: { day: number; title: string; desc: string }[];
}

export const HOLIDAY_PACKAGES: HolidayPackage[] = [
  {
    id: 'kashmir-paradise',
    title: 'Kashmir Paradise & Dal Lake Shikara Retreat',
    destination: 'Srinagar, Gulmarg & Pahalgam',
    country: 'India',
    category: 'scenic',
    image: kashmirImg,
    durationNights: 5,
    durationDays: 6,
    rating: 4.95,
    reviewCount: 182,
    originalPrice: 38999,
    discountedPrice: 32999,
    currency: '₹',
    seniorBadge: 'Gentle Pace',
    overview:
      'Immerse in the breathtaking Kashmir valley at an unhurried, comfortable pace. Stay in heated luxury houseboats with electric blankets, enjoy private shikara rides with comfortable cushions, and visit Mughal gardens with wheelchair-friendly walkways.',
    inclusions: [
      '5 Nights in 4-Star Heated Hotels & Houseboat',
      'Daily Buffet Breakfast & Homestyle Dinners',
      'Private Shikara Ride on Calm Dal Lake',
      'Dedicated Senior Care Tour Manager & Doctor on Call',
      'Private AC Tempo Traveller with Wide Step Boarding',
    ],
    seniorHighlights: [
      'Zero rushed early mornings: departures after 9:30 AM',
      'Heated rooms with electric mattress warmers',
      'Wheelchair and porter assistance at all gardens',
      'Customised mild, non-spicy meals with Jain options',
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Srinagar & Relaxed Houseboat Check-in', desc: 'Welcome garland greeting at airport, comfortable private transfer to Nigeen Lake luxury houseboat, peaceful sunset tea on the deck.' },
      { day: 2, title: 'Mughal Gardens & Shikara Ride', desc: 'Leisurely visit to Shalimar and Nishat Bagh with paved accessible walkways, followed by a gentle 2-hour shikara ride with Kashmiri Kahwa.' },
      { day: 3, title: 'Scenic Day Excursion to Gulmarg Meadow', desc: 'Scenic drive to Gulmarg with scenic stops, gentle phase-1 gondola cable car ride with priority queue assistance.' },
      { day: 4, title: 'Pahalgam Valley & Betaab Gentle Stroll', desc: 'Drive through saffron fields to Pahalgam valley, visit gentle pine trails and riverside gardens at your own pace.' },
      { day: 5, title: 'Srinagar Heritage & Local Handicrafts', desc: 'Visit centuries-old Jamia Masjid and artisan carpet-weaving centers with seated demonstrations and shopping assistance.' },
      { day: 6, title: 'Fond Farewells & Airport Drop', desc: 'Relaxed breakfast on houseboat terrace, luggage assistance, and airport transfer with wheelchair escort.' },
    ],
  },
  {
    id: 'serene-kerala',
    title: 'Serene Kerala Backwaters & Ayurveda Wellness',
    destination: 'Alleppey, Munnar & Kochi',
    country: 'India',
    category: 'domestic',
    image: keralaImg,
    durationNights: 6,
    durationDays: 7,
    rating: 4.92,
    reviewCount: 215,
    originalPrice: 34999,
    discountedPrice: 29499,
    currency: '₹',
    seniorBadge: 'Ayurveda Wellness',
    overview:
      'Recharge with traditional Ayurvedic rejuvenation therapies, cruise through mirror-smooth backwaters on an air-conditioned private houseboat, and stroll through gentle tea gardens in misty Munnar with zero strenuous climbs.',
    inclusions: [
      '6 Nights in Premium Heritage Resorts & AC Houseboat',
      'All Meals: Fresh South & North Indian Cuisine',
      '2 Complimentary Rejuvenating Ayurvedic Massage Sessions',
      'Private AC Vehicle with Extra Legroom & Easy Steps',
      'English & Hindi Speaking Senior Escort',
    ],
    seniorHighlights: [
      'Certified Ayurvedic doctors available for consultation',
      'Smooth cruise on calm canals without motion sickness',
      'Ground-floor resort rooms guaranteed upon booking',
      'Gentle tea garden visits without steep stair climbing',
    ],
    itinerary: [
      { day: 1, title: 'Arrive in Fort Kochi & Colonial Heritage Walk', desc: 'Warm reception at Cochin Airport, check-in to historic heritage hotel, gentle evening sunset view of Chinese Fishing Nets.' },
      { day: 2, title: 'Scenic Drive to Misty Munnar Hills', desc: 'Comfortable air-conditioned drive with tea break at Cheeyappara gentle waterfall viewpoint.' },
      { day: 3, title: 'Tea Museum & Flat Scenic Garden Strolls', desc: 'Visit Munnar Tea Museum with documentary screening and wheelchair access, evening Ayurvedic relaxation session.' },
      { day: 4, title: 'Thekkady Spice Plantations & Nature Cruise', desc: 'Drive to Thekkady, gentle guided walk through fragrant cardamom and pepper plantations with seated spice sampling.' },
      { day: 5, title: 'Alleppey Private Houseboat Cruise', desc: 'Board traditional kettuvallam luxury houseboat, cruise through tranquil backwaters with authentic Kerala lunch and coconut water.' },
      { day: 6, title: 'Marari Beach Resort Serenity', desc: 'Day at leisure in peaceful Marari beach resort, gentle sandy garden walks and relaxing poolside moments.' },
      { day: 7, title: 'Departure with Sweet Memories', desc: 'Leisurely breakfast, souvenir spice gifts, and drop-off at Cochin International Airport.' },
    ],
  },
  {
    id: 'enchanting-bali',
    title: 'Enchanting Bali Temples & Coastal Serenity',
    destination: 'Ubud, Nusa Dua & Tanah Lot',
    country: 'Indonesia',
    category: 'international',
    image: baliMainImg,
    durationNights: 6,
    durationDays: 7,
    rating: 4.91,
    reviewCount: 164,
    originalPrice: 52999,
    discountedPrice: 44999,
    currency: '₹',
    seniorBadge: 'International Comfort',
    overview:
      'Experience the magic of Bali without the hectic pace. Stay in 5-star barrier-free resorts in Nusa Dua, witness the iconic Ulun Danu lake temple with stunning volcanic backdrops, and enjoy serene cultural performances with reserved front-row seating.',
    inclusions: [
      '6 Nights at 5-Star Beachfront & Rainforest Resorts',
      'Daily International Buffet Breakfast & 4 Curated Dinners',
      'VIP Seated Entry to Kecak Dance & Cultural Shows',
      'Private Chauffeur-Driven Air-Conditioned Van Throughout',
      'Complimentary Indonesian SIM Card & 24/7 Concierge',
    ],
    seniorHighlights: [
      'Elevator and ramp access across all visited landmarks',
      'Indian vegetarian and international dining options daily',
      'Private vehicle stays with you for flexible rest breaks',
      'Slow-paced cultural encounters avoiding steep stairs',
    ],
    itinerary: [
      { day: 1, title: 'Welcome to Denpasar Bali & Nusa Dua Resort', desc: 'Traditional flower garland welcome at Ngurah Rai Airport, direct transfer to luxury beachfront resort with private beach promenade.' },
      { day: 2, title: 'Ubud Cultural Village & Artisan Boutiques', desc: 'Scenic morning drive to Ubud, visit Puri Saren Royal Palace with paved courtyards, relaxing afternoon tea.' },
      { day: 3, title: 'Lake Beratan Ulun Danu Floating Temple', desc: 'Visit the peaceful lakeside temple surrounded by cool mountain breezes and manicured flower gardens.' },
      { day: 4, title: 'Coffee Plantation Tasting & Balinese Spa', desc: 'Gentle plantation walk tasting herbal teas, followed by a soothing 90-minute Balinese massage tailored for seniors.' },
      { day: 5, title: 'Tanah Lot Sunset & Ocean View Dinner', desc: 'Afternoon excursion to Tanah Lot coastal temple with accessible viewing pavilions, sunset dinner overlooking Indian Ocean.' },
      { day: 6, title: 'Leisure Day at Nusa Dua Beach Club', desc: 'Relax by the swimming pool or stroll along flat paved beachfront boulevard with shaded lounge chairs.' },
      { day: 7, title: 'Departure Flight Back Home', desc: 'Enjoy buffet breakfast, hotel check-out, and airport transfer with baggage assistance.' },
    ],
  },
  {
    id: 'royal-rajasthan',
    title: 'Royal Rajasthan Heritage & Palaces Tour',
    destination: 'Jaipur, Jodhpur & Udaipur',
    country: 'India',
    category: 'domestic',
    image: rajasthanImg,
    durationNights: 6,
    durationDays: 7,
    rating: 4.88,
    reviewCount: 142,
    originalPrice: 41000,
    discountedPrice: 34500,
    currency: '₹',
    seniorBadge: 'Heritage Luxury',
    overview:
      'Walk like royalty through Rajasthan’s majestic palaces with golf cart transfers, elevator access at City Palace, tranquil boat rides on Lake Pichola, and royal Rajput hospitality designed for your utmost ease.',
    inclusions: [
      '6 Nights in Luxury Heritage Havelis & 4-Star Palaces',
      'Royal Dining: Multi-Cuisine Breakfasts & Grand Dinners',
      'Golf Cart Transfers at Amber Fort & City Palace',
      'Exclusive Sunset Boat Cruise on Lake Pichola',
      'Senior Guide with Deep Historical Knowledge',
    ],
    seniorHighlights: [
      'No steep climbs: Golf carts provided inside major forts',
      'Elevator access guaranteed inside Udaipur City Palace',
      'Mild royal dining with pure vegetarian & Jain options',
      'Luggage porterage included at all hotels and rail/airports',
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Pink City Jaipur', desc: 'Traditional Rajasthani Aarti & Tika welcome at heritage hotel, relaxing evening with live sitar music.' },
      { day: 2, title: 'Amber Fort Golf Cart Ride & City Palace', desc: 'Comfortable golf cart ascent to Amber Fort courtyard, private guided tour of City Palace museum with elevator access.' },
      { day: 3, title: 'Scenic Highway to Sun City Jodhpur', desc: 'Smooth highway drive in executive AC coach, rest stop at luxury midway lounge, evening arrival in Jodhpur.' },
      { day: 4, title: 'Mehrangarh Fort Elevator Tour & Jaswant Thada', desc: 'Elevator access straight to top ramparts of Mehrangarh Fort, visit serene marble cenotaph at Jaswant Thada.' },
      { day: 5, title: 'Drive to Romantic Udaipur & Lake Pichola', desc: 'En route visit Ranakpur Jain Temple with 1444 intricately carved pillars, check-in to lakeside Udaipur palace.' },
      { day: 6, title: 'Udaipur City Palace & Sunset Boat Cruise', desc: 'Leisurely morning visit to Saheliyon Ki Bari fountains, followed by a tranquil evening boat ride on Lake Pichola.' },
      { day: 7, title: 'Departure from Udaipur Airport', desc: 'Breakfast, souvenir shopping assistance for textiles and handicrafts, airport drop.' },
    ],
  },
  {
    id: 'majestic-switzerland',
    title: 'Majestic Switzerland Alps & Panoramic Lakes',
    destination: 'Lucerne, Interlaken & Zurich',
    country: 'Switzerland',
    category: 'international',
    image: switzerlandImg,
    durationNights: 7,
    durationDays: 8,
    rating: 4.98,
    reviewCount: 98,
    originalPrice: 168000,
    discountedPrice: 145000,
    currency: '₹',
    seniorBadge: 'Panoramic Rail',
    overview:
      'Glide through postcard-perfect Swiss alpine valleys aboard the world-famous Glacier Express and GoldenPass trains. Sail across Lake Lucerne and enjoy gentle strolls in flower-decked villages with crisp, pure mountain air.',
    inclusions: [
      '7 Nights in Premium 4-Star Swiss Centrally-Located Hotels',
      'First-Class Swiss Rail Pass with Reserved Panoramic Seats',
      'Lake Lucerne & Lake Brienz Steamboat Excursions',
      'Daily Swiss Breakfast Buffet & Curated Indian/Continental Dinners',
      'Dedicated Swiss Tour Escort & 24/7 Emergency Support',
    ],
    seniorHighlights: [
      'Seamless, barrier-free Swiss train stations with elevators',
      'Zero road fatigue: smooth, spacious first-class rail travel',
      'Scenic viewpoints reachable via gentle cable cars & funiculars',
      'Warm hot-water kettles and familiar Indian tea in all rooms',
    ],
    itinerary: [
      { day: 1, title: 'Zurich Airport to Charming Lucerne', desc: 'Meet tour escort at Zurich Airport, scenic 45-minute train directly into historic Lucerne, check-in near the lake.' },
      { day: 2, title: 'Lake Lucerne Cruise & Mount Rigi Gentle Cogwheel', desc: 'Tranquil steamboat cruise across the lake, take Europe oldest cogwheel train to Mount Rigi with panoramic alpine benches.' },
      { day: 3, title: 'GoldenPass Panoramic Express to Interlaken', desc: 'Sit back in plush oversized seats with ceiling-high windows as the train winds through green pastures and turquoise lakes.' },
      { day: 4, title: 'Lauterbrunnen Valley of 72 Waterfalls', desc: 'Flat, paved nature stroll along Lauterbrunnen valley floor, view cascading Staubbach Falls without climbing.' },
      { day: 5, title: 'Lake Thun Boat Trip & Oberhofen Castle', desc: 'Relaxing morning cruise on Lake Thun, visit lakeside medieval castle gardens filled with blooming roses.' },
      { day: 6, title: 'Scenic Bern Old Town & Capital Highlights', desc: 'Short train to Bern, explore covered arcade walkways (protecting from sun/rain) and the famous Zytglogge clock tower.' },
      { day: 7, title: 'Zurich Lakeside Promenade & Farewell Dinner', desc: 'Return to Zurich, peaceful walk along Limmat riverfront, farewell Swiss-Indian gala dinner.' },
      { day: 8, title: 'Return Flight Departure', desc: 'Hotel breakfast, assistance with Swiss tax refund at Zurich Airport, and return boarding.' },
    ],
  },
  {
    id: 'spiritual-varanasi',
    title: 'Spiritual Varanasi & Sacred Ganga Aarti',
    destination: 'Varanasi, Sarnath & Prayagraj',
    country: 'India',
    category: 'spiritual',
    image: varanasiImg,
    durationNights: 4,
    durationDays: 5,
    rating: 4.96,
    reviewCount: 310,
    originalPrice: 26500,
    discountedPrice: 21999,
    currency: '₹',
    seniorBadge: 'VIP Darshan',
    overview:
      'Fulfil your spiritual pilgrimage in the timeless holy city of Kashi with utmost comfort. Enjoy reserved VIP seating for the world-famous Dashashwamedh Ghat Ganga Aarti, private motorboats with shaded seating, and special assisted Darshan.',
    inclusions: [
      '4 Nights in 5-Star Hotel in Varanasi Cantt with Elevator',
      'All Pure Vegetarian Meals with Satvik Dining Options',
      'Private Motorboat with Cushioned Chairs for Ganga Aarti',
      'Assisted VIP Special Darshan at Kashi Vishwanath Corridor',
      'Electric E-Rickshaws & Golf Carts for Ghat Navigation',
    ],
    seniorHighlights: [
      'Zero walking on steep ghat steps: direct boat-side boarding',
      'Priority assisted access at Kashi Vishwanath Corridor',
      'Doctor-on-call and oxygen concentrator standby at hotel',
      'Satvik, freshly prepared, onion-garlic free food on request',
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Varanasi & Evening Ganga Aarti', desc: 'Warm reception at Lal Bahadur Shastri Airport, check-in to 5-star hotel, transfer by e-rickshaw and private boat for mesmerizing Aarti.' },
      { day: 2, title: 'Sunrise Boat Ride & Kashi Vishwanath VIP Darshan', desc: 'Gentle dawn boat ride as bells chime along the ghats, assisted priority Darshan at the new accessible Vishwanath Temple corridor.' },
      { day: 3, title: 'Peaceful Sarnath & Buddhist Deer Park', desc: 'Visit peaceful Sarnath where Lord Buddha gave his first sermon, flat shaded pathways, visit Dhamek Stupa and museum.' },
      { day: 4, title: 'Day Trip to Prayagraj Triveni Sangam', desc: 'Drive in comfortable AC coach to Prayagraj, assisted boat ride to the confluence of Ganga, Yamuna & Saraswati for holy dip.' },
      { day: 5, title: 'Sankat Mochan Temple & Departure', desc: 'Morning darshan at Sankat Mochan and Durga Kund, souvenir holy Prasad packages, drop at Varanasi airport.' },
    ],
  },
  {
    id: 'tropical-thailand',
    title: 'Tropical Thailand: Bangkok & Relaxed Phuket',
    destination: 'Bangkok & Phuket',
    country: 'Thailand',
    category: 'international',
    image: thailandImg,
    durationNights: 5,
    durationDays: 6,
    rating: 4.87,
    reviewCount: 189,
    originalPrice: 45500,
    discountedPrice: 38999,
    currency: '₹',
    seniorBadge: 'Comfort Beach & City',
    overview:
      'Experience the warmth and hospitality of the Land of Smiles. Savor a luxurious Chao Phraya River dinner cruise, explore golden temples with golf buggy assistance, and unwind at a tranquil 5-star beachfront resort in Phuket.',
    inclusions: [
      '5 Nights in 5-Star City & Beachfront Resorts',
      'Chao Phraya Luxury Grand River Cruise with Live Music',
      'Domestic Flight Bangkok to Phuket Included with Luggage',
      'All Sightseeing in Private Air-Conditioned Coach',
      'Bilingual Senior Escort and Indian Chef Meals',
    ],
    seniorHighlights: [
      'Barrier-free river cruise boarding with elevators',
      'Flat, paved beachfront promenade in Phuket',
      'Wheelchairs available upon request at Grand Palace',
      'Authentic Indian vegetarian buffets at all hotels',
    ],
    itinerary: [
      { day: 1, title: 'Arrive in Bangkok & Evening River Cruise', desc: 'VIP meet and greet at Suvarnabhumi Airport, hotel rest, board multi-deck luxury cruise for international buffet along illuminated temples.' },
      { day: 2, title: 'Golden Buddha & Reclining Buddha Temples', desc: 'Guided visit to Wat Traimit and Wat Pho with level flooring, evening foot massage session designed for seniors.' },
      { day: 3, title: 'Flight to Tropical Phuket & Resort Check-in', desc: 'Short 1-hour flight to Phuket, check-in to peaceful Bang Tao bay resort with zero stairs to beach.' },
      { day: 4, title: 'Phuket Scenic Viewpoint & Old Town Walk', desc: 'Drive to Promthep Cape for gentle ocean views, stroll through Sino-Portuguese heritage street with cafe stops.' },
      { day: 5, title: 'Calm Island Catamaran Excursion', desc: 'Smooth, stable catamaran cruise to Coral Island with shaded loungers and calm, waist-deep turquoise swimming.' },
      { day: 6, title: 'Farewell Thailand & Airport Transfer', desc: 'Buffet breakfast, tropical fruit tasting, and direct transfer to Phuket International Airport.' },
    ],
  },
  {
    id: 'himachal-serenity',
    title: 'Himachal Serenity: Shimla & Manali Valleys',
    destination: 'Shimla, Kullu & Manali',
    country: 'India',
    category: 'scenic',
    image: himachalImg,
    durationNights: 6,
    durationDays: 7,
    rating: 4.89,
    reviewCount: 176,
    originalPrice: 32000,
    discountedPrice: 26999,
    currency: '₹',
    seniorBadge: 'Scenic Mountain',
    overview:
      'Breathe in the rejuvenating mountain air of the Himalayas. Walk the historic vehicle-free Shimla Mall Road with convenient golf cart access, take a gentle cable car ride in Solang Valley, and stay in cozy valley-view hotels with heaters.',
    inclusions: [
      '6 Nights in Premium Valley-View Heated Mountain Hotels',
      'All Breakfasts & Warm Multi-Cuisine Dinners',
      'Mall Road Lift Tickets & Golf Cart Passes Included',
      'Dedicated AC Vehicle with Hill-Experienced Chauffeur',
      'Complimentary Hot Kashmiri Kahwa & Tea on Drives',
    ],
    seniorHighlights: [
      'Heated rooms with hot water 24/7 and electric blankets',
      'Slow, gentle driving pace on mountain roads to prevent nausea',
      'Golf cart access across Mall Road and Ridge',
      'No strenuous treks; focus on scenic benches and viewpoints',
    ],
    itinerary: [
      { day: 1, title: 'Chandigarh to Shimla Hills', desc: 'Pick up from Chandigarh airport/station, scenic drive via Himalayan expressway, check-in to valley-view Shimla hotel.' },
      { day: 2, title: 'Shimla Mall Road, Ridge & Viceregal Lodge', desc: 'Use municipal lift and golf cart to reach the flat Ridge, leisurely visit to historic British Viceregal Lodge gardens.' },
      { day: 3, title: 'Scenic Valley Drive to Manali via Kullu', desc: 'Comfortable day drive along Beas River, stop at famous Kullu shawl weaving center with hot tea.' },
      { day: 4, title: 'Solang Valley Cable Car & Hadimba Pines', desc: 'Gentle enclosed cable car ride to Solang peak for snow mountain vistas, visit ancient wooden Hadimba temple in flat cedar woods.' },
      { day: 5, title: 'Atal Tunnel Drive to Sissu Valley', desc: 'Drive through engineering marvel Atal Tunnel to sunny Lahaul Valley, see Sissu waterfall with zero climbing.' },
      { day: 6, title: 'Vashisht Hot Springs & Old Manali Cafes', desc: 'Visit natural sulfur springs, peaceful afternoon in orchard gardens tasting fresh Himachal apples.' },
      { day: 7, title: 'Return Drive to Chandigarh & Departure', desc: 'Leisurely descent to Chandigarh with comfortable lunch break, drop at airport/railway station.' },
    ],
  },
  {
    id: 'futuristic-singapore',
    title: 'Futuristic Singapore & Gardens by the Bay',
    destination: 'Singapore City & Sentosa Island',
    country: 'Singapore',
    category: 'international',
    image: singaporeImg,
    durationNights: 5,
    durationDays: 6,
    rating: 4.93,
    reviewCount: 156,
    originalPrice: 67000,
    discountedPrice: 58500,
    currency: '₹',
    seniorBadge: '100% Barrier Free',
    overview:
      'Experience the world’s most accessible, green, and senior-friendly metropolis. Marvel at the indoor cooled Flower Dome and Cloud Forest at Gardens by the Bay, glide on the Singapore River bumboat, and stay in pristine luxury hotels.',
    inclusions: [
      '5 Nights at 4-Star Superior Downtown Singapore Hotel',
      'Gardens by the Bay Flower Dome & Cloud Forest Tickets',
      'Singapore River Electric Bumboat Cruise',
      'Sentosa Cable Car Round Trip & S.E.A. Aquarium Entry',
      'Private Transport with Dedicated Driver-Guide',
    ],
    seniorHighlights: [
      'Ranked #1 accessible city worldwide: ramps & escalators everywhere',
      'Climate-controlled indoor gardens offering respite from tropical heat',
      'Spacious electric cruise bumboats with easy level ramp boarding',
      'Wide variety of authentic vegetarian and South/North Indian food',
    ],
    itinerary: [
      { day: 1, title: 'Arrival at Changi Jewel & Hotel Check-in', desc: 'Admire the indoor Rain Vortex waterfall at Changi Jewel, private transfer to city hotel, evening rest.' },
      { day: 2, title: 'City Highlights & Singapore River Bumboat', desc: 'Explore Merlion Park, Civic District, and enjoy a gentle 40-minute scenic river cruise through Clarke Quay.' },
      { day: 3, title: 'Gardens by the Bay Conservatories & Light Show', desc: 'Air-conditioned stroll inside Flower Dome, evening seated viewing of the spectacular Supertree light & sound show.' },
      { day: 4, title: 'Sentosa Island Cable Car & S.E.A. Aquarium', desc: 'Gentle aerial cable car over the harbor, explore wheelchair-friendly S.E.A. Aquarium with oversized viewing panels.' },
      { day: 5, title: 'Botanic Gardens UNESCO National Orchid Garden', desc: 'Morning visit to flat, paved National Orchid Garden with over 1,000 species, afternoon shopping at Orchard Road.' },
      { day: 6, title: 'Fond Farewell & Departure Flight', desc: 'Late checkout option, Changi Airport duty-free assistance, and departure.' },
    ],
  },
  {
    id: 'tranquil-sri-lanka',
    title: 'Tranquil Sri Lanka: Sigiriya & Kandy Hills',
    destination: 'Colombo, Kandy, Nuwara Eliya & Bentota',
    country: 'Sri Lanka',
    category: 'international',
    image: sriLankaImg,
    durationNights: 6,
    durationDays: 7,
    rating: 4.90,
    reviewCount: 134,
    originalPrice: 47000,
    discountedPrice: 39500,
    currency: '₹',
    seniorBadge: 'Island Charm',
    overview:
      'Immerse in the serene beauty of the Pearl of the Indian Ocean. Discover the ancient Temple of the Tooth in Kandy, sip Ceylon tea in misty Nuwara Eliya hills, and take a gentle river safari in Bentota with lush mangroves.',
    inclusions: [
      '6 Nights in Handpicked 4-Star Heritage Resorts',
      'Daily Buffet Breakfasts & Traditional Sri Lankan/Indian Dinners',
      'Madu River Mangrove Boat Safari with Safety Life Vests',
      'Ceylon Tea Factory Tour with Tasting Experience',
      'Private AC High-Roof Van with Senior-Trained Chauffeur',
    ],
    seniorHighlights: [
      'View Sigiriya rock fortress from ground-level royal water gardens without climbing',
      'Elevator and wheelchair facilities available at Colombo and Kandy hotels',
      'Mild spices tailored to Indian palate with fresh coconut curries',
      'Frequent restroom stops arranged on scenic highway drives',
    ],
    itinerary: [
      { day: 1, title: 'Arrive in Colombo & Transfer to Cultural Triangle', desc: 'Warm Sri Lankan Ayubowan greeting, comfortable highway drive to Dambulla, check-in to peaceful eco-resort.' },
      { day: 2, title: 'Sigiriya Royal Gardens & Minneriya Gentle Safari', desc: 'Explore level ground water gardens of Sigiriya, gentle jeep safari in Minneriya to view wild elephants grazing by the lake.' },
      { day: 3, title: 'Kandy Temple of Tooth & Spice Gardens', desc: 'Scenic drive to Kandy, visit fragrant spice garden with seated demonstration, evening visit to sacred Temple of the Tooth.' },
      { day: 4, title: 'Nuwara Eliya "Little England" & Tea Plantations', desc: 'Scenic mountain climb to Nuwara Eliya, tour historic tea factory with tea tasting and walk around Gregory Lake.' },
      { day: 5, title: 'Bentota Coastal Paradise & Madu River Boat', desc: 'Descend to coastal Bentota, gentle boat safari through mangrove tunnels, turtle conservation project visit.' },
      { day: 6, title: 'Relaxed Day by the Indian Ocean', desc: 'Unwind at beachfront resort with soothing coconut oil head massage and gentle sunset stroll on golden sands.' },
      { day: 7, title: 'Colombo City Drive & Airport Departure', desc: 'Visit Independence Memorial Hall in Colombo, souvenir shopping for Ceylon gems & tea, airport transfer.' },
    ],
  },
  {
    id: 'bhutan-kingdom',
    title: 'Bhutan Kingdom: Thimphu & Paro Valley',
    destination: 'Paro, Thimphu & Punakha',
    country: 'Bhutan',
    category: 'spiritual',
    image: bhutanImg,
    durationNights: 5,
    durationDays: 6,
    rating: 4.97,
    reviewCount: 112,
    originalPrice: 61000,
    discountedPrice: 52000,
    currency: '₹',
    seniorBadge: 'Happiness Tour',
    overview:
      'Travel to the world’s happiest kingdom nestled in the high Himalayas. Experience the spiritual peace of majestic Dzongs, marvel at the sacred Tiger’s Nest from an accessible mountain viewpoint, and savor fresh organic mountain cuisine.',
    inclusions: [
      '5 Nights in Luxury Bhutanese Heritage Boutique Hotels',
      'All Meals Included: Fresh Organic Himalayan & Indian Dishes',
      'Bhutan Government Sustainable Development Fee (SDF) Included',
      'Private Vehicle with Certified Senior Escort Guide',
      'Traditional Bhutanese Kira/Gho Cultural Attire Photo Session',
    ],
    seniorHighlights: [
      'No strenuous mountain hiking required: scenic viewpoints by car',
      'Clean, crisp mountain air with zero pollution or heavy traffic',
      'Paved courtyards at Punakha Dzong with low, wide steps',
      'Doctor on call and oxygen facilities maintained in all tour vehicles',
    ],
    itinerary: [
      { day: 1, title: 'Fly into Paro & Scenic Drive to Thimphu Capital', desc: 'Dramatic flight landing past Himalayan peaks, traditional white scarf welcome, drive along Paro Chu river to Thimphu.' },
      { day: 2, title: 'Buddha Dordenma Giant Statue & Memorial Chorten', desc: 'Visit massive golden Buddha with panoramic Thimphu valley vista, join local elders circumambulating Memorial Chorten.' },
      { day: 3, title: 'Dochula Pass 108 Chortens & Warm Punakha Valley', desc: 'Stop at Dochula Pass with panoramic views of snow-capped peaks, descend to subtropical Punakha Dzong by Pho Chu river.' },
      { day: 4, title: 'Drive to Paro & Traditional Farmhouse Lunch', desc: 'Scenic drive back to Paro valley, experience authentic Bhutanese farmhouse hospitality and butter tea.' },
      { day: 5, title: 'Tiger’s Nest Monastery Viewpoint Cafeteria', desc: 'Gentle pony ride or viewpoint visit to Tiger’s Nest cafeteria for photography without climbing the steep mountain.' },
      { day: 6, title: 'Farewell Bhutan & Return Flight', desc: 'Traditional Tashi Delek farewell ceremony, private transfer to Paro International Airport.' },
    ],
  },
  {
    id: 'dazzling-dubai',
    title: 'Dazzling Dubai & Abu Dhabi Oasis',
    destination: 'Dubai & Abu Dhabi',
    country: 'UAE',
    category: 'international',
    image: dubaiImg,
    durationNights: 5,
    durationDays: 6,
    rating: 4.86,
    reviewCount: 204,
    originalPrice: 63500,
    discountedPrice: 54999,
    currency: '₹',
    seniorBadge: 'Luxury Comfort',
    overview:
      'Indulge in modern luxury and desert wonders with absolute convenience. Ascend Burj Khalifa with priority express elevator passes, tour the breathtaking Sheikh Zayed Grand Mosque in golf buggies, and enjoy a lavish Dubai Creek dhow dinner cruise.',
    inclusions: [
      '5 Nights at 5-Star Centrally Located Dubai Hotel',
      'Burj Khalifa 124th Floor Express Elevator Tickets',
      'Sheikh Zayed Grand Mosque Tour with Golf Cart Access',
      'Marina Luxury Glass Dhow Cruise with International Buffet',
      'Private High-Roof Luxury Coach for Sightseeing',
    ],
    seniorHighlights: [
      'Zero standing queues: Priority express access at all major sights',
      'Electric club cars inside Sheikh Zayed Mosque & Dubai Mall',
      'Strictly air-conditioned environments avoiding desert midday heat',
      'Diverse international and pure vegetarian Indian restaurants included',
    ],
    itinerary: [
      { day: 1, title: 'Welcome to Dubai & Marina Dhow Cruise', desc: 'Meet and assist at Dubai Airport, check-in to luxury hotel, evening relaxed cruise aboard glass-enclosed luxury dhow with live Tanoura show.' },
      { day: 2, title: 'Dubai City Highlights & Burj Khalifa Top', desc: 'Visit Dubai Frame, drive past Burj Al Arab, express elevator ascent to 124th floor of Burj Khalifa with panoramic skyline.' },
      { day: 3, title: 'Gentle Desert Oasis Experience', desc: 'Comfortable late afternoon desert excursion in luxury SUV (no rough dune bashing), traditional seated bedouin dinner with falconry show.' },
      { day: 4, title: 'Day Tour to Abu Dhabi Grand Mosque & Louvre', desc: 'Drive to Abu Dhabi, golf cart tour through white marble Sheikh Zayed Grand Mosque, visit tranquil Louvre Abu Dhabi museum.' },
      { day: 5, title: 'Miracle Garden & Gold Souk Heritage', desc: 'Stroll along paved pathways of Miracle Garden admiring 150 million blooming flowers, traditional Abra boat ride across Dubai Creek.' },
      { day: 6, title: 'Shopping Assistance & Departure', desc: 'Late checkout, shopping assistance for dates and perfumes, transfer to Dubai International Airport.' },
    ],
  },
  {
    id: 'sunny-goa',
    title: 'Sunny Goa: Gentle Sands & Portuguese Heritage',
    destination: 'South Goa & Panaji',
    country: 'India',
    category: 'beach',
    image: goaImg,
    durationNights: 4,
    durationDays: 5,
    rating: 4.88,
    reviewCount: 198,
    originalPrice: 27000,
    discountedPrice: 22500,
    currency: '₹',
    seniorBadge: 'Coastal Calm',
    overview:
      'Relax on the quiet, uncrowded white sand beaches of South Goa. Experience Portuguese colonial architecture in Fontainhas, admire historic basilicas, and sail on a peaceful sunset cruise along the Mandovi River with Goan folk dances.',
    inclusions: [
      '4 Nights in 5-Star South Goa Beachfront Resort with Private Lawns',
      'All Buffet Breakfasts & Gourmet Coastal/North Indian Dinners',
      'Mandovi River Sunset Luxury Cruise with Live Music',
      'Guided Tour of Old Goa Churches with Seated Historical Walk',
      'Private AC Vehicle with Dedicated Senior Chauffeur',
    ],
    seniorHighlights: [
      'Quiet South Goa location away from loud night clubs and crowds',
      'Resort features flat green lawns leading directly to calm shore',
      'Elevators and ground-level suites with walk-in showers',
      'Complimentary doctor consultation available on resort premises',
    ],
    itinerary: [
      { day: 1, title: 'Arrive in Goa & Beachfront Resort Check-in', desc: 'Warm coconut water welcome at Mopa/Dabolim Airport, transfer to South Goa resort, afternoon rest by the shaded cabana.' },
      { day: 2, title: 'Old Goa Heritage Churches & Fontainhas Latin Quarter', desc: 'Visit Basilica of Bom Jesus and Se Cathedral, gentle walk through colorful Portuguese houses of Fontainhas with pastry tasting.' },
      { day: 3, title: 'Spice Village Traditional Lunch & River Cruise', desc: 'Visit lush Sahakari spice plantation with seated elephant greeting and traditional Goan lunch served on banana leaves, evening Mandovi sunset cruise.' },
      { day: 4, title: 'Leisure Day on Private Beach & Sunset Cocktail', desc: 'Complete day at leisure to walk soft sands, read on breezy lawns, or indulge in a soothing foot reflexology session.' },
      { day: 5, title: 'Farewell Goa & Airport Drop', desc: 'Leisurely breakfast, purchase authentic Goan cashew and feni souvenirs, airport transfer.' },
    ],
  },
  {
    id: 'ooty-hills',
    title: 'Ooty & Coonoor: Queen of Nilgiri Hills',
    destination: 'Ooty, Coonoor & Pykara',
    country: 'India',
    category: 'scenic',
    image: ootyImg,
    durationNights: 4,
    durationDays: 5,
    rating: 4.85,
    reviewCount: 165,
    originalPrice: 28500,
    discountedPrice: 23800,
    currency: '₹',
    seniorBadge: 'Heritage Toy Train',
    overview:
      'Relive nostalgia among eucalyptus and pine trees in the Nilgiris. Ride the UNESCO World Heritage Nilgiri Mountain Toy Train in first class, stroll the flat paved pathways of the Government Botanical Gardens, and sip aromatic Nilgiri tea.',
    inclusions: [
      '4 Nights in British Colonial Heritage Resort with Fireplaces',
      'First-Class Reserved Nilgiri Mountain Toy Train Tickets',
      'All Breakfasts & Home-Style Dinners with South & North Indian Cuisines',
      'Boat Ride on Calm Pykara Lake with Life Jackets',
      'Private AC Vehicle with Hill-Specialist Driver',
    ],
    seniorHighlights: [
      'First-class cushioned seating reserved on heritage mountain train',
      'Botanical Gardens feature gentle paved paths with resting benches',
      'Charming fireplace heated suites avoiding chilly hill nights',
      'Moderate elevations comfortable for senior heart and lung health',
    ],
    itinerary: [
      { day: 1, title: 'Coimbatore Airport to Ooty Hill Station', desc: 'Pickup from Coimbatore, picturesque ascent through Nilgiri Ghat roads with roadside view of silver waterfalls, check-in to heritage bungalow.' },
      { day: 2, title: 'UNESCO Toy Train to Coonoor & Tea Estates', desc: 'Board the historic steam toy train from Ooty to Coonoor, visit Sim’s Park with exotic trees and high tea at Highfield Tea Estate.' },
      { day: 3, title: 'Ooty Botanical Gardens & Peaceful Boat Ride', desc: 'Leisurely morning among 20-million-year-old fossil trees and rose gardens, afternoon flat boat ride on Ooty Lake.' },
      { day: 4, title: 'Pykara Lake & Pine Forest Walk', desc: 'Scenic drive to Pykara Lake surrounded by rolling downs, gentle boat ride, and walk through fragrant pine forest trails.' },
      { day: 5, title: 'Descent to Coimbatore & Return Flight', desc: 'Leisurely breakfast, visit handmade chocolate and eucalyptus oil boutique, airport drop in Coimbatore.' },
    ],
  },
  {
    id: 'vietnam-halong',
    title: 'Vietnam Halong Bay & Ancient Hanoi',
    destination: 'Hanoi & Ha Long Bay',
    country: 'Vietnam',
    category: 'international',
    image: vietnamImg,
    durationNights: 6,
    durationDays: 7,
    rating: 4.94,
    reviewCount: 129,
    originalPrice: 54000,
    discountedPrice: 46800,
    currency: '₹',
    seniorBadge: 'Calm Water Cruise',
    overview:
      'Discover timeless Southeast Asian charm with utmost grace. Sail on an emerald cruise through Halong Bay’s majestic limestone karsts without ocean swells, ride electric buggies through Hanoi’s French Quarter, and attend an authentic Water Puppet Show.',
    inclusions: [
      '5 Nights in 5-Star Boutique Hotels + 1 Night Luxury Halong Bay Cruise',
      'All Meals Included with Indian Vegetarian & Fresh Asian Menus',
      'Electric Buggy Sightseeing Tour of Hanoi Old Quarter',
      'Reserved VIP Front-Row Water Puppet Theatre Tickets',
      'Private Limousine Van with Reclining Leather Seats',
    ],
    seniorHighlights: [
      'Halong Bay cruise waters are mirror-calm with zero seasickness',
      'Modern cruise ship equipped with passenger elevator and broad decks',
      'Electric golf carts replace long walking in Hanoi Old Quarter',
      'Warm Vietnamese hospitality with dedicated staff assisting at every step',
    ],
    itinerary: [
      { day: 1, title: 'Welcome to Hanoi & French Quarter Hotel', desc: 'Warm reception at Noi Bai International Airport, transfer in luxury limousine van to 5-star French colonial hotel, rest.' },
      { day: 2, title: 'Hanoi Highlights by Electric Buggy & Puppet Show', desc: 'Electric cart tour of 36 Guild Streets, visit Temple of Literature with level courtyards, evening water puppet performance.' },
      { day: 3, title: 'Scenic Highway to Halong Bay & Cruise Check-in', desc: 'Smooth highway drive to Halong harbor, embark luxury cruise vessel, welcome lunch sailing past stone islands.' },
      { day: 4, title: 'Tai Chi on Sun Deck & Halong Cave Elevator Visit', desc: 'Gentle sunrise morning breathing exercises on upper deck, visit accessible caves, cooking demonstration with chef.' },
      { day: 5, title: 'Disembark Cruise & Return to Hanoi', desc: 'Brunch while sailing back to port, disembarkation with luggage assistance, afternoon high tea in Hanoi.' },
      { day: 6, title: 'Ho Chi Minh Mausoleum Complex & Silk Village', desc: 'Visit presidential botanical grounds, leisurely drive to Van Phuc traditional silk village with tailored shopping.' },
      { day: 7, title: 'Departure Flight Back Home', desc: 'Breakfast buffet, farewell gift of Vietnamese lotus tea, and airport limousine transfer.' },
    ],
  },
  {
    id: 'pristine-andaman',
    title: 'Pristine Andaman: Havelock & Port Blair',
    destination: 'Port Blair & Havelock Island',
    country: 'India',
    category: 'beach',
    image: andamanImg,
    durationNights: 5,
    durationDays: 6,
    rating: 4.91,
    reviewCount: 147,
    originalPrice: 43000,
    discountedPrice: 36500,
    currency: '₹',
    seniorBadge: 'Tropical Island',
    overview:
      'Discover India’s cleanest tropical paradise with pristine turquoise waters and powdery white beaches. Watch the historic Cellular Jail Light & Sound show from reserved front-row chairs and cruise on luxury air-conditioned catamarans.',
    inclusions: [
      '5 Nights in Premium Beachfront Resorts & Port Blair 4-Star Hotel',
      'Luxury Catamaran Cruise Tickets (Makruzz/Nautika) in Royal Class',
      'All Breakfasts & Fresh Coastal & Multi-Cuisine Dinners',
      'Reserved Seated Entry for Cellular Jail Light & Sound Show',
      'Dedicated Tour Manager & 24/7 Island Coordinator',
    ],
    seniorHighlights: [
      'Catamaran ferry offers stabilized ride with comfortable airplane seats',
      'Radhanagar Beach features smooth, gradual sandy slope with gentle waves',
      'Wheelchairs and assistance available at Cellular Jail & jetty ports',
      'Doctor on call and medical facilities pre-verified at all resort stops',
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Port Blair & Cellular Jail Show', desc: 'Airport welcome by tour executive, check-in to oceanview hotel, evening seated viewing of Cellular Jail Light & Sound show.' },
      { day: 2, title: 'Luxury Catamaran Cruise to Havelock Island', desc: 'Board high-speed AC catamaran Makruzz to Havelock Island, transfer to beachfront resort with private palm grove.' },
      { day: 3, title: 'World Famous Radhanagar Beach Sunset', desc: 'Leisurely afternoon at Asia’s cleanest beach Radhanagar, enjoy calm turquoise surf and complimentary tender coconut.' },
      { day: 4, title: 'Kalapathar Beach Gentle Stroll & Return to Port Blair', desc: 'Visit scenic Kalapathar beach with black volcanic rocks and blue water, afternoon catamaran return to Port Blair.' },
      { day: 5, title: 'Ross Island Heritage & Coral Glass-Bottom Boat', desc: 'Short boat ride to historic Ross Island with friendly deer roaming freely, view coral reefs through dry glass-bottom boat.' },
      { day: 6, title: 'Departure from Port Blair with Shell Souvenirs', desc: 'Breakfast, visit Sagarika government handicraft emporium, transfer to Veer Savarkar Airport.' },
    ],
  },
];

type CategoryFilter = 'all' | 'domestic' | 'international' | 'scenic' | 'spiritual' | 'beach';

export const PopularHolidayPackages: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'duration'>('recommended');
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const [selectedPackage, setSelectedPackage] = useState<HolidayPackage | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<'overview' | 'itinerary' | 'senior-care' | 'inquiry'>('overview');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states inside modal
  const [inquirerName, setInquirerName] = useState('');
  const [inquirerPhone, setInquirerPhone] = useState('');
  const [travelMonth, setTravelMonth] = useState('October 2026');
  const [numTravellers, setNumTravellers] = useState('2 Seniors');
  const [specialRequests, setSpecialRequests] = useState('Require ground-floor room and mild vegetarian meals');

  const toggleWishlist = (id: string, title: string) => {
    setWishlist((prev) => {
      const nextState = !prev[id];
      showToast(nextState ? `Saved "${title}" to your wishlist!` : `Removed "${title}" from wishlist.`);
      return { ...prev, [id]: nextState };
    });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const filteredPackages = useMemo(() => {
    return HOLIDAY_PACKAGES.filter((pkg) => {
      const matchesCategory =
        activeCategory === 'all'
          ? true
          : activeCategory === 'domestic'
          ? pkg.category === 'domestic' || pkg.country === 'India'
          : activeCategory === 'international'
          ? pkg.category === 'international' || pkg.country !== 'India'
          : pkg.category === activeCategory;

      const matchesSearch =
        searchQuery.trim() === ''
          ? true
          : pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pkg.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pkg.country.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.discountedPrice - b.discountedPrice;
      if (sortBy === 'price-desc') return b.discountedPrice - a.discountedPrice;
      if (sortBy === 'duration') return b.durationDays - a.durationDays;
      return 0; // recommended
    });
  }, [activeCategory, searchQuery, sortBy]);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
    showToast(`Thank you ${inquirerName || 'valued guest'}! Our Senior Travel Specialist will contact you shortly.`);
    setTimeout(() => {
      setInquirySubmitted(false);
      setSelectedPackage(null);
    }, 2800);
  };

  return (
    <section id="popular-packages" className="w-full bg-[#FAF7F0] pt-3 sm:pt-4 pb-10 sm:pb-12 border-t border-[#E8E2D2]">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#000000] text-white px-5 py-3.5 rounded-xl shadow-2xl border border-[#FFC928]/40 flex items-center gap-3 animate-fade-in max-w-md">
          <div className="w-8 h-8 rounded-full bg-[#FFC928]/20 flex items-center justify-center text-[#FFC928] shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <p className="text-sm font-medium">{toastMessage}</p>
        </div>
      )}

      {/* Shared Container: exactly aligned with the Promotional Carousel (38px margin on desktop, 12-16px on mobile) */}
      <div className="w-[calc(100%-24px)] sm:w-[calc(100%-32px)] md:w-[calc(100%-76px)] max-w-none mx-auto">
        {/* Section Header matching exact specification */}
        <div className="text-center mb-4 sm:mb-5">
          <div className="inline-flex items-center justify-center gap-1.5 mb-1 sm:mb-1.5 px-0">
            <span className="h-0.5 w-10 sm:w-16 bg-[#FFC928] hidden sm:inline-block" />
            <span className="text-[9px] sm:text-xs md:text-sm font-bold uppercase tracking-widest text-[#000000] whitespace-nowrap">
              Handcrafted for Senior Travellers
            </span>
            <span className="h-0.5 w-10 sm:w-16 bg-[#FFC928] hidden sm:inline-block" />
          </div>

          <h2 className="text-[11.5px] sm:text-3xl md:text-4xl lg:text-[40px] font-black text-[#000000] tracking-tight uppercase leading-tight whitespace-nowrap">
            POPULAR HOLIDAY PACKAGES
          </h2>

          <p className="mt-1 sm:mt-2 text-[7.5px] sm:text-base md:text-lg text-slate-600 max-w-none whitespace-nowrap mx-auto font-normal px-0 tracking-tight">
            Handpicked destinations for senior travellers. Relax, explore and create new memories.
          </p>
        </div>

        {/* Filter Tabs & Search Controls */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-5 sm:mb-6 bg-white p-3 sm:p-4 rounded-2xl shadow-sm border border-slate-200">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {[
              { id: 'all', label: `All Packages (${HOLIDAY_PACKAGES.length})` },
              { id: 'domestic', label: 'Domestic' },
              { id: 'international', label: 'International' },
              { id: 'scenic', label: 'Scenic & Hills' },
              { id: 'spiritual', label: 'Spiritual' },
              { id: 'beach', label: 'Beach & Coastal' },
            ].map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as CategoryFilter)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#000000] text-[#FFC928] shadow-sm'
                      : 'text-slate-600 hover:text-[#000000] hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search Input & Sort Selector */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search destination..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#000000]/30 transition-all text-slate-800 placeholder-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <SlidersHorizontal className="w-4 h-4 text-slate-500 hidden sm:inline" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort packages by"
                className="text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#000000]/30 cursor-pointer"
              >
                <option value="recommended">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="duration">Longest Duration</option>
              </select>
            </div>
          </div>
        </div>

        {/* 16 Holiday Packages Grid */}
        {filteredPackages.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <p className="text-slate-500 text-base">No holiday packages matched your search criteria.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-[#000000] text-[#FFC928] text-sm font-semibold rounded-xl hover:bg-[#000000] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPackages.map((pkg) => {
              const isSaved = wishlist[pkg.id] || false;
              const discountPercent = Math.round(
                ((pkg.originalPrice - pkg.discountedPrice) / pkg.originalPrice) * 100
              );

              return (
                <div
                  key={pkg.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(11,26,48,0.06)] hover:shadow-[0_12px_32px_rgba(11,26,48,0.14)] transition-all duration-300 border border-slate-200 flex flex-col justify-between hover:border-[#FFC928]"
                >
                  {/* Top Image Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient Overlay for Top Badges */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                    {/* Duration Badge Top Left */}
                    <div className="absolute top-3 left-3 bg-[#000000]/90 backdrop-blur-md text-[#FFC928] px-2.5 py-1 rounded-md text-xs font-bold tracking-wide shadow-md flex items-center gap-1 border border-[#FFC928]/30">
                      <Clock className="w-3 h-3" />
                      <span>{pkg.durationNights}N / {pkg.durationDays}D</span>
                    </div>

                    {/* Wishlist Button Top Right */}
                    <button
                      onClick={() => toggleWishlist(pkg.id, pkg.title)}
                      aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white backdrop-blur-md flex items-center justify-center shadow-md transition-transform active:scale-90 cursor-pointer"
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          isSaved ? 'fill-red-500 text-red-500' : 'text-slate-600 hover:text-red-500'
                        }`}
                      />
                    </button>

                    {/* Senior Comfort Pill Bottom Left */}
                    <div className="absolute bottom-3 left-3 bg-white/95 text-[#000000] px-2 py-0.5 rounded text-[11px] font-bold tracking-wide shadow-sm flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{pkg.seniorBadge}</span>
                    </div>

                    {/* Rating Bottom Right */}
                    <div className="absolute bottom-3 right-3 bg-white/95 text-slate-800 px-2 py-0.5 rounded text-[11px] font-bold tracking-wide shadow-sm flex items-center gap-1">
                      <Star className="w-3 h-3 fill-[#FFC928] text-[#FFC928]" />
                      <span>{pkg.rating}</span>
                      <span className="text-[10px] text-slate-500">({pkg.reviewCount})</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Destination & Country */}
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#000000] shrink-0" />
                        <span className="truncate">{pkg.destination}</span>
                        <span aria-hidden="true">·</span>
                        <span>{pkg.country}</span>
                      </div>

                      {/* Package Title */}
                      <h3
                        onClick={() => setSelectedPackage(pkg)}
                        className="text-base font-bold text-[#000000] group-hover:text-[#000000] line-clamp-2 leading-snug cursor-pointer transition-colors mb-2.5"
                        title={pkg.title}
                      >
                        {pkg.title}
                      </h3>

                      {/* Key Senior Inclusions Icons Row */}
                      <div className="grid grid-cols-4 gap-1 py-2.5 border-y border-slate-100 text-slate-600 my-2">
                        <div className="flex flex-col items-center text-center p-1" title="Comfort 4-Star Stay">
                          <Hotel className="w-4 h-4 text-[#000000] mb-0.5" />
                          <span className="text-[10px] font-medium leading-tight">4★ Stays</span>
                        </div>
                        <div className="flex flex-col items-center text-center p-1" title="Daily Fresh Meals">
                          <UtensilsCrossed className="w-4 h-4 text-[#000000] mb-0.5" />
                          <span className="text-[10px] font-medium leading-tight">All Meals</span>
                        </div>
                        <div className="flex flex-col items-center text-center p-1" title="Private AC Transfers">
                          <Bus className="w-4 h-4 text-[#000000] mb-0.5" />
                          <span className="text-[10px] font-medium leading-tight">AC Coach</span>
                        </div>
                        <div className="flex flex-col items-center text-center p-1" title="Senior Tour Manager & Doctor on Call">
                          <UserCheck className="w-4 h-4 text-emerald-600 mb-0.5" />
                          <span className="text-[10px] font-medium leading-tight">Senior Escort</span>
                        </div>
                      </div>
                    </div>

                    {/* Price and CTA Actions */}
                    <div className="pt-3">
                      <div className="flex items-baseline justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-400 line-through">
                              {pkg.currency}{pkg.originalPrice.toLocaleString('en-IN')}
                            </span>
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                              {discountPercent}% OFF
                            </span>
                          </div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-xs font-medium text-slate-600">From</span>
                            <span className="text-xl sm:text-2xl font-black text-[#000000]">
                              {pkg.currency}{pkg.discountedPrice.toLocaleString('en-IN')}
                            </span>
                            <span className="text-[11px] text-slate-500">/ person</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Button Grid: Details & Inquire */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => {
                            setSelectedPackage(pkg);
                            setActiveModalTab('overview');
                          }}
                          className="w-full py-2.5 px-3 rounded-xl border border-[#000000] text-[#000000] hover:bg-slate-50 text-xs sm:text-sm font-bold transition-all text-center cursor-pointer"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => {
                            setSelectedPackage(pkg);
                            setActiveModalTab('inquiry');
                          }}
                          className="w-full py-2.5 px-3 rounded-xl bg-[#FFC928] hover:bg-[#FFB300] text-[#000000] text-xs sm:text-sm font-black transition-all shadow-sm hover:shadow text-center flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>Book Trip</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Senior Assistance Assurance Banner */}
        <div className="mt-8 sm:mt-12 mx-3 sm:mx-0 bg-gradient-to-r from-[#000000] via-[#000000] to-[#000000] rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-[#FFC928]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4 text-left">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#FFC928]/20 flex items-center justify-center text-[#FFC928] shrink-0 border border-[#FFC928]/40">
              <Phone className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <h4 className="text-base sm:text-xl font-bold text-white">
                Need Help Choosing the Perfect Holiday for Your Parents?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Speak with our Senior Travel Counsellors for personalized itineraries and wheelchair assistance.
              </p>
            </div>
          </div>
          <div className="w-full sm:w-auto flex justify-end">
            <a
              href="tel:+918005550199"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#FFC928] hover:bg-[#FFB300] text-[#000000] font-black text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <Phone className="w-4 h-4" />
              <span>Call +91 800-555-0199</span>
            </a>
          </div>
        </div>
      </div>

      {/* Interactive Package Details & Booking Modal */}
      {selectedPackage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          <div className="bg-white w-full max-w-4xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="relative bg-[#000000] text-white p-5 sm:p-6 shrink-0 flex items-start justify-between border-b border-[#FFC928]/30">
              <div className="pr-8">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#FFC928] uppercase tracking-wider mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{selectedPackage.destination}, {selectedPackage.country}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedPackage.durationNights}N / {selectedPackage.durationDays}D</span>
                </div>
                <h3 className="text-lg sm:text-2xl font-black text-white">
                  {selectedPackage.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedPackage(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex items-center gap-2 px-5 sm:px-6 pt-3 border-b border-slate-200 bg-slate-50 shrink-0 overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview & Highlights' },
                { id: 'itinerary', label: 'Day-by-Day Itinerary' },
                { id: 'senior-care', label: 'Senior Care Inclusions' },
                { id: 'inquiry', label: 'Book / Request Callback' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveModalTab(tab.id as any)}
                  className={`py-2.5 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                    activeModalTab === tab.id
                      ? 'border-[#000000] text-[#000000]'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
              {activeModalTab === 'overview' && (
                <div className="space-y-6">
                  {/* Photo and Quick Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-md border border-slate-200">
                      <img
                        src={selectedPackage.image}
                        alt={selectedPackage.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-3">
                      <div className="inline-block bg-[#FFC928]/20 text-[#000000] border border-[#FFC928] px-3 py-1 rounded-full text-xs font-bold">
                        {selectedPackage.seniorBadge} Guaranteed
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {selectedPackage.overview}
                      </p>
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                        <div className="flex justify-between text-xs text-slate-500">
                          <span>Standard Twin Sharing:</span>
                          <span className="line-through">{selectedPackage.currency}{selectedPackage.originalPrice.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between items-baseline">
                          <span className="text-sm font-bold text-[#000000]">Discounted Senior Fare:</span>
                          <span className="text-2xl font-black text-[#000000]">
                            {selectedPackage.currency}{selectedPackage.discountedPrice.toLocaleString('en-IN')}
                            <span className="text-xs font-normal text-slate-500"> / guest</span>
                          </span>
                        </div>
                        <p className="text-[11px] text-emerald-700 font-medium">✓ Inclusive of all stays, private transfers, meals & tax.</p>
                      </div>
                      <button
                        onClick={() => setActiveModalTab('inquiry')}
                        className="w-full py-3 bg-[#FFC928] hover:bg-[#FFB300] text-[#000000] font-black rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Reserve Package Now</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Highlights Grid */}
                  <div>
                    <h4 className="text-sm font-bold text-[#000000] uppercase tracking-wider mb-3">
                      Package Inclusions
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {selectedPackage.inclusions.map((inc, i) => (
                        <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                          <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                          <span className="text-xs sm:text-sm text-slate-700 font-medium">{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeModalTab === 'itinerary' && (
                <div className="space-y-4">
                  <p className="text-xs sm:text-sm text-slate-600 bg-amber-50 p-3 rounded-xl border border-amber-200">
                    💡 <strong>Parent-Friendly Itinerary:</strong> Designed with relaxed start times (no 6 AM wake-ups), maximum 2 hours continuous driving with scheduled tea breaks, and elevator access.
                  </p>
                  <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
                    {selectedPackage.itinerary.map((item) => (
                      <div key={item.day} className="p-4 sm:p-5 bg-white hover:bg-slate-50/60 transition-colors">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="px-2.5 py-0.5 bg-[#000000] text-[#FFC928] text-xs font-black rounded-md">
                            Day {item.day}
                          </span>
                          <h4 className="text-sm sm:text-base font-bold text-slate-900">{item.title}</h4>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 pl-1 leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeModalTab === 'senior-care' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-base font-bold text-[#000000] mb-2">
                      Our Senior Traveler Promise
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Every ParentHolidays trip is tailored specifically to ensure elderly travellers feel safe, respected, and physically comfortable at every mile.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedPackage.seniorHighlights.map((hl, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-[#FAF7F0] border border-[#E8E2D2] flex items-start gap-3">
                        <ShieldCheck className="w-5 h-5 text-black mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs sm:text-sm font-semibold text-slate-800">{hl}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-2xl bg-[#000000] text-white flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold text-[#FFC928]">Need special wheelchair or dietary arrangements?</p>
                      <p className="text-xs text-slate-300">We coordinate ground-floor rooms, elevators, and pure vegetarian / satvik meal options.</p>
                    </div>
                    <button
                      onClick={() => setActiveModalTab('inquiry')}
                      className="px-4 py-2 bg-[#FFC928] text-[#000000] font-black text-xs rounded-xl hover:bg-[#FFB300] transition-colors shrink-0"
                    >
                      Request Details
                    </button>
                  </div>
                </div>
              )}

              {activeModalTab === 'inquiry' && (
                <div className="max-w-xl mx-auto py-2">
                  {inquirySubmitted ? (
                    <div className="text-center py-12 space-y-4">
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                        <Check className="w-8 h-8" />
                      </div>
                      <h4 className="text-2xl font-black text-[#000000]">Booking Inquiry Received!</h4>
                      <p className="text-sm text-slate-600 max-w-md mx-auto">
                        Our Senior Holiday Consultant will call you at {inquirerPhone || 'your contact number'} within 2 hours with customized date options and group savings.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleInquirySubmit} className="space-y-4">
                      <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                        You are inquiring for <strong>{selectedPackage.title}</strong> ({selectedPackage.durationNights}N / {selectedPackage.durationDays}D) starting at {selectedPackage.currency}{selectedPackage.discountedPrice.toLocaleString('en-IN')}/person.
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Ramesh Sharma"
                            value={inquirerName}
                            onChange={(e) => setInquirerName(e.target.value)}
                            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#000000]/30"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 98765 43210"
                            value={inquirerPhone}
                            onChange={(e) => setInquirerPhone(e.target.value)}
                            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#000000]/30"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                            Preferred Month
                          </label>
                          <select
                            value={travelMonth}
                            onChange={(e) => setTravelMonth(e.target.value)}
                            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#000000]/30"
                          >
                            <option>October 2026</option>
                            <option>November 2026</option>
                            <option>December 2026</option>
                            <option>January 2027</option>
                            <option>February 2027</option>
                            <option>March 2027</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                            Travellers
                          </label>
                          <select
                            value={numTravellers}
                            onChange={(e) => setNumTravellers(e.target.value)}
                            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#000000]/30"
                          >
                            <option>2 Seniors (Twin Sharing)</option>
                            <option>1 Senior (Single Room)</option>
                            <option>Family with Senior Parents (4 Guests)</option>
                            <option>Senior Group (6+ Guests)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          Special Care Requests / Dietary Needs
                        </label>
                        <textarea
                          rows={3}
                          value={specialRequests}
                          onChange={(e) => setSpecialRequests(e.target.value)}
                          placeholder="Wheelchair assistance, ground-floor room, pure Jain / vegetarian diet, doctor consultation, etc."
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#000000]/30 resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 bg-[#FFC928] hover:bg-[#FFB300] text-[#000000] font-black rounded-xl text-base transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Send Free Inquiry & Get Best Quote</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>

            {/* Modal Sticky Bottom Bar */}
            <div className="bg-slate-50 border-t border-slate-200 px-5 sm:px-6 py-3 shrink-0 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                100% Verified Senior-Safe Properties
              </span>
              <button
                onClick={() => setSelectedPackage(null)}
                className="text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PopularHolidayPackages;
