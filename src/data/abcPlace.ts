export type Floor = "Ground" | "First" | "Second";
import broodExterior from "@/assets/brood-exterior.webp";
import broodCounter from "@/assets/brood-counter.webp";
import broodInterior from "@/assets/brood-interior.webp";
import fahrenheitExterior from "@/assets/fahrenheit-exterior.webp";
import fahrenheitInterior from "@/assets/fahrenheit-interior.webp";
import fahrenheitPour from "@/assets/fahrenheit-pour.webp";
import javaHouseExterior from "@/assets/java-house-exterior.webp";
import javaHouseCounter from "@/assets/java-house-counter.webp";
import javaHouseInterior from "@/assets/java-house-interior.webp";
import javaHousePatio from "@/assets/java-house-patio.webp";
import threeSixtyExterior from "@/assets/360-exterior.webp";
import threeSixtyDining from "@/assets/360-dining.webp";
import threeSixtyOven from "@/assets/360-oven.webp";
import threeSixtyInterior from "@/assets/360-interior.webp";
import tefalStorefront from "@/assets/tefal-storefront.webp";
import tefalExterior from "@/assets/tefal-exterior.webp";
import tefalDisplay from "@/assets/tefal-display.webp";
import uplandsCounter from "@/assets/uplands-counter.webp";
import uplandsExterior from "@/assets/uplands-exterior.webp";
import zucchiniProduce from "@/assets/zucchini-produce.webp";
import zucchiniInterior from "@/assets/zucchini-interior.webp";
import zucchiniMarket from "@/assets/zucchini-market.webp";
import samsungInterior from "@/assets/samsung-interior.webp";
import samsungStorefront from "@/assets/samsung-storefront.webp";
import healthyuStorefront from "@/assets/healthyu-storefront.webp";
import healthyuExterior from "@/assets/healthyu-exterior.webp";
import foodplusStorefront from "@/assets/foodplus-storefront.webp";
import foodplusInterior from "@/assets/foodplus-interior.webp";
import onyxPieces from "@/assets/onyx-pieces.webp";
import onyxModel from "@/assets/onyx-model.webp";
import forexBanner from "@/assets/forex-banner.webp";
import forexRates from "@/assets/forex-rates.webp";
import decanterWine from "@/assets/decanter-wine-1.webp";
import decanterWine2 from "@/assets/decanter-wine-2.webp";
import shiaYoga from "@/assets/shia-yoga-group.webp";
import shiaYoga2 from "@/assets/shia-yoga-class.webp";
import toyworldImg from "@/assets/toyworld-christmas.webp";
import drMattress from "@/assets/dr-mattress-storefront.webp";
import drMattress2 from "@/assets/dr-mattress-showroom.webp";
import tintoriaImg from "@/assets/tintoria.webp";
import imBank from "@/assets/im-bank.webp";
import absaStorefront from "@/assets/absa-storefront.webp";
import absaLogo from "@/assets/absa-logo.webp";
import ncbaTwende from "@/assets/ncba-twende.webp";
import ncbaLogo from "@/assets/ncba-logo.webp";
import imBankBranches from "@/assets/im-bank-branches.webp";
import imBankAbcLaunch from "@/assets/im-bank-abc-launch.webp";
import drAshokDental from "@/assets/dr-ashok-dental.webp";
export type TenantStatus = "open" | "now-open" | "coming-soon";
export type TenantCategory =
  | "Dining & Culinary"
  | "Retail & Lifestyle"
  | "Gourmet & Grocery"
  | "Professional Services"
  | "Health & Wellness"
  | "Guest & Building Services";

export const CATEGORIES: TenantCategory[] = [
  "Dining & Culinary",
  "Retail & Lifestyle",
  "Gourmet & Grocery",
  "Professional Services",
  "Health & Wellness",
  "Guest & Building Services",
];

export const categoryToPath = (c: TenantCategory): string => {
  switch (c) {
    case "Dining & Culinary":
      return "/dining";
    case "Retail & Lifestyle":
      return "/retail";
    case "Gourmet & Grocery":
      return "/retail";
    case "Health & Wellness":
      return "/wellness";
    case "Professional Services":
      return "/services";
    case "Guest & Building Services":
      return "/services";
  }
};

export type Tenant = {
  name: string;
  slug: string;
  tagline: string;
  editorial: string;
  image: string;
  /** Optional additional gallery images (used in store detail) */
  gallery?: string[];
  category: TenantCategory;
  subcategory: string;
  floor: Floor;
  location: string; // e.g. "Ground Floor, West Wing"
  status: TenantStatus;
  /** Long-form editorial paragraph for the store detail page */
  about?: string;
  /** Signature pull-quote */
  signature?: string;
  /** Editor's pick label/value */
  editorPick?: string;
  /** Phone number */
  phone?: string;
  /** Hours label, e.g. "07:00 – 21:00 daily" */
  hours?: string;
};

/* ===== Dining ===== */
export const dining: Tenant[] = [
  {
    name: "Java House",
    slug: "java-house",
    tagline: "THE MORNING RITUAL",
    editorial:
      "A neighborhood institution where every cortado is an exercise in precision — the beating heart of ABC Place.",
    image: javaHouseExterior,
    gallery: [javaHouseExterior, javaHouseInterior, javaHousePatio, javaHouseCounter],
    category: "Dining & Culinary",
    subcategory: "Cafés",
    floor: "Ground",
    location: "Ground Floor, Central Court",
    status: "open",
    about:
      "A neighborhood institution where single-origin Ethiopian beans are roasted in small batches and every cortado is an exercise in precision. Java House is the beating heart of ABC Place — a third space for professionals, creatives, and coffee enthusiasts who understand that coffee is ritual, not just caffeine. The counter culture in its truest form.",
    signature:
      "Start your morning with a cortado from their single-origin Ethiopian beans, prepared by award-winning baristas. Arrive early; the best tables fill fast.",
    editorPick: "Single-Origin Ethiopian Cortado",
    phone: "+254 715 456 222",
    hours: "07:00 – 21:00 daily",
  },
  {
    name: "360 Degrees Pizza",
    slug: "360-pizza",
    tagline: "NEAPOLITAN BY CONVICTION",
    editorial:
      "Authentic Neapolitan pizza — dough imported from Naples, technique classical, toppings seasonal. Pizza as a conversation about what Nairobi deserves.",
    image: threeSixtyExterior,
    gallery: [threeSixtyExterior, threeSixtyInterior, threeSixtyOven, threeSixtyDining],
    category: "Dining & Culinary",
    subcategory: "Restaurants",
    floor: "First",
    location: "First Floor, Central Court",
    status: "open",
    about:
      "Artisanal Neapolitan pizza specializing in authentic wood-fired mastery. The dough is imported from Naples, the technique is classical, and the toppings are seasonal. 360 Degrees isn't casual pizza — it's pizza as a conversation about what Nairobi deserves. A small selection of natural wine pairings completes the table.",
    signature:
      "Reserve a table for an authentic Neapolitan experience. Seven minutes in the wood-fired oven. Wine chosen with intention. Conversation that matters.",
    editorPick: "Wood-Fired Margherita + Natural Wine Pairing",
    phone: "+254 715 456 222",
    hours: "11:00 – 23:00 daily",
  },
  {
    name: "Fahrenheit Bar",
    slug: "fahrenheit-bar",
    tagline: "THE AFTER-HOUR",
    editorial:
      "A high-energy social destination where craft cocktails are made with thought, spirits selected with care, and conversation flows naturally.",
    image: fahrenheitExterior,
    gallery: [fahrenheitExterior, fahrenheitInterior, fahrenheitPour],
    category: "Dining & Culinary",
    subcategory: "Bars",
    floor: "Ground",
    location: "Ground Floor, East Wing",
    status: "now-open",
    about:
      "A high-energy social destination and nightlife hub where craft cocktails are made with thought, spirits are selected with care, and conversation flows naturally. Fahrenheit doesn't try to be loud — it doesn't need to. The bar programme is expert, the ambiance sophisticated, and the people who gather here are choosing intention over hype.",
    signature:
      "An evening of craft cocktails at Fahrenheit. Seven-minute preparation. Spirits that mean something. Company that matters.",
    editorPick: "Craft Negroni + Seasonal Small Plates",
    phone: "+254 715 456 222",
    hours: "16:00 – 02:00 daily (Fri & Sat until 05:00)",
  },
  {
    name: "Brood Bakery",
    slug: "brood-bakery",
    tagline: "THE SLOW MORNING",
    editorial:
      "Dutch-inspired sourdough and fresh pastries crafted daily in a wood-fired oven. A place where time genuinely slows down.",
    image: broodExterior,
    gallery: [broodExterior, broodCounter, broodInterior],
    category: "Dining & Culinary",
    subcategory: "Bakeries",
    floor: "Ground",
    location: "First Floor, North Wing",
    status: "now-open",
    about:
      "Dutch-inspired artisanal sourdough and fresh pastries crafted daily in a wood-fired oven. Brood honors the craft of fermentation — every loaf hand-shaped, every crumb a testament to patience. They pair their breads with curated seasonal spreads and European jams, creating rituals of slow mornings for ABC Place regulars. For those who believe bread is more than carbohydrates.",
    signature:
      "Wake up to warm sourdough and specialty Ethiopian coffee, best enjoyed on the terrace overlooking Waiyaki Way.",
    editorPick: "48-Hour Sourdough + Almond Croissant",
    phone: "+254 715 456 222",
    hours: "06:30 – 18:00 daily",
  },
  {
    name: "Decanter Wine Shop",
    slug: "decanter-wine-shop",
    tagline: "WINES WITH A STORY",
    editorial:
      "Curated small-production and natural wines, premium spirits — chosen by sommeliers who believe wine should tell a story.",
    image: decanterWine,
    gallery: [decanterWine, decanterWine2],
    category: "Dining & Culinary",
    subcategory: "Gourmet Food",
    floor: "First",
    location: "First Floor, Retail Wing",
    status: "open",
    about:
      "A curated wine shop specializing in small-production, natural wines and premium spirits from around the world. Decanter's selection is thoughtfully chosen by sommeliers who believe wine should tell a story. Whether you're exploring natural wines, seeking rare vintages, or discovering your next favorite bottle, Decanter offers expertise without pretension. The perfect companion to ABC Place's dining experiences.",
    signature:
      "Discover wines chosen for character, not just prestige. Expert tasting notes. Recommendations that respect your palate, not your budget.",
    editorPick: "Natural Wine Edit + Curated Spirits",
    phone: "+254 715 456 222",
    hours: "10:00 – 19:00 Mon–Sat · 11:00 – 17:00 Sun",
  },
];

/* ===== Retail ===== */
export const retail: Tenant[] = [
  {
    name: "Healthy U",
    slug: "healthy-u",
    tagline: "NOURISHED LIVING",
    editorial:
      "A sanctuary for wellness, organic supplements, and thoughtful nutrition — your health deserves precision.",
    image: healthyuStorefront,
    gallery: [healthyuStorefront, healthyuExterior],
    category: "Health & Wellness",
    subcategory: "Nutrition",
    floor: "First",
    location: "First Floor, North Wing",
    status: "open",
    about:
      "A sanctuary for wellness, organic supplements, and thoughtful nutrition. Healthy U is a retreat for those who believe wellness starts from the inside. Curated organic products, expert nutritional guidance, and supplements sourced with intention. Your health deserves precision.",
    signature:
      "Expert nutritional guidance. Organic supplements. The foundation of feeling good.",
    editorPick: "Certified Organic Supplements + Nutritionist Consultation",
    phone: "+254 715 456 222",
    hours: "08:00 – 20:00 daily",
  },
  {
    name: "Samsung",
    slug: "samsung",
    tagline: "PRECISION BY DESIGN",
    editorial:
      "Cutting-edge mobile technology and innovation meet timeless design — technology that serves life, not the other way around.",
    image: samsungStorefront,
    gallery: [samsungStorefront, samsungInterior],
    category: "Retail & Lifestyle",
    subcategory: "Electronics",
    floor: "Ground",
    location: "Ground Floor, East Wing",
    status: "open",
    about:
      "Cutting-edge mobile technology and innovation meet timeless design. Samsung at ABC Place is a curated experience where technology serves life, not the other way around. Precision engineering as a philosophy. The newest devices, explained by people who understand them.",
    signature:
      "Discover the latest innovation in mobile technology. Expert guidance. Devices that work as hard as you do.",
    editorPick: "Galaxy S Series · Neo QLED Range",
    phone: "+254 715 456 222",
    hours: "09:00 – 20:00 daily",
  },
  {
    name: "Eyecare",
    slug: "eyecare",
    tagline: "THE WELL-FRAMED LIFE",
    editorial:
      "Specialized optometry and designer eyewear for those who believe vision is an investment.",
    image: healthyuExterior,
    category: "Retail & Lifestyle",
    subcategory: "Optical",
    floor: "First",
    location: "First Floor, North Wing",
    status: "open",
    about:
      "Specialized optometry and designer eyewear for those who believe vision is an investment. Expert eye care paired with frames that are as much about self-expression as clarity. From prescription precision to designer frames, Eyecare treats your vision — and your appearance — with equal seriousness.",
    signature:
      "Professional eye care and designer eyewear. Precision testing. Frames that reflect who you are.",
    editorPick: "Comprehensive Eye Examination + Designer Frame Edit",
    phone: "+254 715 456 222",
    hours: "08:30 – 19:00 Mon–Sat · 10:00 – 17:00 Sun",
  },
  {
    name: "Tefal",
    slug: "tefal",
    tagline: "THE CONSIDERED KITCHEN",
    editorial:
      "Premium professional-grade cookware for those who take cooking seriously. French precision engineering meets everyday functionality.",
    image: tefalExterior,
    gallery: [tefalExterior, tefalStorefront, tefalDisplay],
    category: "Retail & Lifestyle",
    subcategory: "Home & Kitchen",
    floor: "First",
    location: "First Floor, Central Court",
    status: "open",
    about:
      "Premium professional-grade cookware and appliances for those who take cooking seriously. Tefal doesn't just sell pans — they curate your kitchen. French precision engineering meets everyday functionality. The kinds of tools that turn cooking from a chore into a ritual.",
    signature:
      "Discover the right cookware for your kitchen. Professional-grade equipment. Tools that inspire daily cooking.",
    editorPick: "Ingenio Cookware · OptiGrill Series",
    phone: "+254 715 456 222",
    hours: "09:00 – 19:00 daily",
  },
  {
    name: "Foodplus",
    slug: "foodplus",
    tagline: "THE WELL-STOCKED HOME",
    editorial:
      "A curated international and local supermarket experience — Foodplus (Chandarana) curates instead of just stocks.",
    image: foodplusStorefront,
    gallery: [foodplusStorefront, foodplusInterior],
    category: "Gourmet & Grocery",
    subcategory: "Supermarket",
    floor: "Ground",
    location: "Ground Floor, Central Area",
    status: "open",
    about:
      "A curated international and local supermarket experience where every product is chosen with intention. Foodplus (Chandarana) curates instead of just stocks. From European provisions to local artisanal goods, this is where your pantry becomes an extension of your taste.",
    signature:
      "Discover curated international and local provisions. Your kitchen deserves better than ordinary.",
    editorPick: "Imported European Provisions · Local Artisanal Goods",
    phone: "+254 715 456 222",
    hours: "07:30 – 21:00 daily",
  },
  {
    name: "Uplands Butchery",
    slug: "uplands-butchery",
    tagline: "THE CRAFT OF THE CUT",
    editorial:
      "High-quality cuts and artisanal meats — every animal treated with respect, every cut explained with expertise.",
    image: uplandsExterior,
    gallery: [uplandsExterior, uplandsCounter],
    category: "Gourmet & Grocery",
    subcategory: "Butchery",
    floor: "Ground",
    location: "Ground Floor, Central Court",
    status: "open",
    about:
      "High-quality cuts and artisanal meats where every animal is treated with respect. Uplands Butchery isn't just a counter — it's a consultation. The butchers understand aging, sourcing, and the philosophy of ethical meat. Every cut is chosen with care and explained with expertise.",
    signature:
      "Expert butchery. Ethically sourced. Cuts that reflect the craft of the profession.",
    editorPick: "Dry-Aged Ribeye · Heritage Lamb Rack",
    phone: "+254 715 456 222",
    hours: "07:00 – 20:00 daily",
  },
  {
    name: "Onyx Jewellery",
    slug: "onyx-jewellery",
    tagline: "WORN WITH INTENTION",
    editorial:
      "High-end jewelry and timeless elegance — Onyx doesn't sell pieces, they curate heirlooms.",
    image: onyxPieces,
    gallery: [onyxPieces, onyxModel],
    category: "Retail & Lifestyle",
    subcategory: "Jewellery",
    floor: "First",
    location: "First Floor, Central Court",
    status: "open",
    about:
      "High-end jewelry and timeless elegance. Onyx doesn't sell pieces — they curate heirlooms. Each item is chosen for quality, intention, and lasting value. From watches that mark decades to jewels that mark moments, this is where acquisition becomes curation.",
    signature:
      "Discover jewelry worn with intention. Expert curation. Pieces that outlast trends.",
    editorPick: "Curated Designer & Luxury Edit",
    phone: "+254 715 456 222",
    hours: "09:00 – 19:00 Mon–Sat · 10:00 – 17:00 Sun",
  },
  {
    name: "Zucchini",
    slug: "zucchini",
    tagline: "FRESH BY DESIGN",
    editorial:
      "Nairobi's premier greengrocer — sourcing directly from farmers, displays composed like still life.",
    image: zucchiniMarket,
    gallery: [zucchiniMarket, zucchiniProduce, zucchiniInterior],
    category: "Gourmet & Grocery",
    subcategory: "Greengrocer",
    floor: "Ground",
    location: "Ground Floor, South Court",
    status: "open",
    about:
      "Nairobi's premier greengrocer for farm-fresh produce. Zucchini sources directly from farmers, ensuring quality, freshness, and fair pricing. The displays aren't random — they're composed like still life paintings. Every tomato matters. Every leaf is checked for perfection. This is where shopping becomes appreciation.",
    signature:
      "Discover farm-fresh produce sourced directly from farmers. Quality you can taste.",
    editorPick: "Farm-Direct Seasonal Vegetables",
    phone: "+254 715 456 222",
    hours: "07:00 – 20:00 daily",
  },
  {
    name: "ABC Marketplace",
    slug: "abc-marketplace",
    tagline: "THE DAILY ANCHOR",
    editorial:
      "A boutique marketplace for curated local finds — open all week, spectacular on Saturdays.",
    image: zucchiniMarket,
    category: "Gourmet & Grocery",
    subcategory: "Marketplace",
    floor: "Ground",
    location: "Ground Floor, Central Hub",
    status: "open",
    about:
      "A boutique marketplace for curated local finds. Every Saturday, producers, growers, and small-batch makers set up alongside the retail anchors. ABC Marketplace isn't just a space — it's a gathering. Where you meet the farmer who grew your vegetables. Where you discover that artisanal really means something. Open all week for daily essentials, spectacular on Saturdays.",
    signature:
      "The ABC Weekend Market. Every Saturday. Fresh, local, curated. The real Westlands gathers here.",
    editorPick: "Saturday Farmer's Market (08:00 – 14:00)",
    phone: "+254 715 456 222",
     hours: "07:00 – 17:00 daily · Saturday Market 08:00 – 14:00",
  },
  {
    name: "Toyworld",
    slug: "toyworld",
    tagline: "PLAY WITH PURPOSE",
    editorial:
      "Curated toys and games chosen for quality, learning value, and lasting joy — for parents who believe play is serious business.",
    image: toyworldImg,
    gallery: [toyworldImg],
    category: "Retail & Lifestyle",
    subcategory: "Toys & Children",
    floor: "Ground",
    location: "Ground Floor, Family Zone",
    status: "open",
    about:
      "A carefully curated toy and games retailer focused on quality, educational value, and developmental appropriateness. Toyworld goes beyond mass-market toys, offering curated selections from international brands and artisanal makers. Every toy is chosen for its ability to inspire learning, creativity, and imagination. For parents who believe play is serious business.",
    signature:
      "Discover toys that inspire learning. Expert staff guidance. Games that bring families together.",
    editorPick: "STEM Building Sets · Family Board Games",
    phone: "+254 715 456 222",
    hours: "09:00 – 19:00 daily",
  },
  {
    name: "Dr. Mattress",
    slug: "dr-mattress",
    tagline: "SLEEP WITH SCIENCE",
    editorial:
      "Premium mattresses and sleep solutions backed by sleep science — expert consultation for the bed that changes everything.",
    image: drMattress,
    gallery: [drMattress, drMattress2],
    category: "Retail & Lifestyle",
    subcategory: "Home & Kitchen",
    floor: "First",
    location: "First Floor, Home Wellness",
    status: "open",
    about:
      "A specialized mattress retailer offering premium sleep solutions backed by sleep science. Dr. Mattress curates mattresses from leading manufacturers, ensuring proper support, durability, and comfort. With expert consultation, customers discover the mattress that transforms their sleep quality. Sleep is the foundation of wellness — Dr. Mattress treats it as such.",
    signature:
      "Expert mattress fitting. Sleep science applied. The bed that changes everything.",
    editorPick: "Orthopedic & Luxury Mattress Edit",
    phone: "+254 715 456 222",
    hours: "09:00 – 18:00 daily",
  },
];

/* ===== Services (used in directory + mega menu) ===== */
export const services: Tenant[] = [
  {
    name: "Absa Bank",
    slug: "absa-bank",
    tagline: "BANKING SIMPLIFIED",
    editorial:
      "Comprehensive banking services, ATM access, and financial solutions for individuals and businesses.",
    image: absaStorefront,
    gallery: [absaStorefront, absaLogo],
    category: "Professional Services",
    subcategory: "Banking",
    floor: "Ground",
    location: "Ground Floor, Banking Hub",
    status: "open",
    about:
      "Absa Bank offers comprehensive banking services, ATM access, and financial solutions for individuals and businesses. Professional service with the convenience of Westlands location.",
    signature: "Banking made simple. Expert service. ATM access 24/7.",
    editorPick: "Full-Service Branch + 24/7 ATM",
    phone: "+254 715 456 222",
    hours: "09:00 – 16:00 Mon–Fri (Closed Weekends)",
  },
  {
    name: "NCBA",
    slug: "ncba-bank",
    tagline: "BANKING YOU CAN TRUST",
    editorial:
      "Comprehensive banking services with ATM access and professional customer support — a trusted banking partner in the heart of Westlands.",
    image: ncbaTwende,
    gallery: [ncbaTwende, ncbaLogo],
    category: "Professional Services",
    subcategory: "Banking",
    floor: "Ground",
    location: "Ground Floor, Banking Hub",
    status: "open",
    about:
      "NCBA Bank provides comprehensive banking services with ATM access and professional customer support. A trusted banking partner in the heart of Westlands.",
    signature: "Banking you can rely on. Service that works for you.",
    editorPick: "Personal & Business Banking",
    phone: "+254 715 456 222",
    hours: "09:00 – 16:00 Mon–Fri (Closed Weekends)",
  },
  {
    name: "I&M Bank",
    slug: "im-bank",
    tagline: "BANKING WITH PURPOSE",
    editorial:
      "A Tier 1 East African bank — premier banking, wealth management, and personal advisory rooted in stability and expertise.",
    image: imBankAbcLaunch,
    gallery: [imBankAbcLaunch, imBankBranches],
    category: "Professional Services",
    subcategory: "Banking",
    floor: "First",
    location: "First Floor, Professional Banking",
    status: "open",
    about:
      "I&M Bank, a Tier 1 bank with deep roots in East African banking, offers comprehensive financial solutions with personal touch. From personal banking to corporate solutions, I&M combines stability, expertise, and customer focus. Professional advisory services for those managing wealth seriously.",
    signature:
      "Expert banking. Personal service. Financial solutions that fit your life.",
    editorPick: "Premier Banking + Wealth Advisory",
    phone: "+254 715 456 222",
    hours: "09:00 – 16:00 Mon–Fri (Closed Weekends)",
  },
  {
    name: "Muthaiga-ABC Forex Bureau",
    slug: "muthaiga-abc-forex",
    tagline: "RATES, TRANSPARENT",
    editorial:
      "Professional currency exchange and elite forex services with transparent rates and expert guidance.",
    image: forexBanner,
    gallery: [forexBanner, forexRates],
    category: "Professional Services",
    subcategory: "Banking",
    floor: "Ground",
    location: "Ground Floor, Financial Services",
    status: "open",
    about:
      "Professional currency exchange and elite forex services with transparent rates and expert guidance. Muthaiga-ABC Forex offers both retail and corporate forex solutions with the integrity and expertise Westlands expects.",
    signature: "Expert currency exchange. Transparent rates. Professional forex guidance.",
    editorPick: "Multi-Currency Exchange + Corporate Forex",
    phone: "+254 715 456 222",
    hours: "08:00 – 18:00 Mon–Fri · 09:00 – 14:00 Sat (Closed Sun)",
  },
  {
    name: "Dr. Ashok Desai - Dental Practice",
    slug: "dr-ashok-desai",
    tagline: "QUIET, MODERN DENTISTRY",
    editorial:
      "Comprehensive, patient-centered dental care — cosmetic, restorative, and preventive — in a calm, modern environment.",
    image: drAshokDental,
    gallery: [drAshokDental],
    category: "Health & Wellness",
    subcategory: "Medical & Dental",
    floor: "Second",
    location: "Second Floor, Professional Services",
    status: "open",
    about:
      "Dr. Ashok Desai's dental practice offers comprehensive, patient-centered dental care in a modern, welcoming environment. With expertise in cosmetic dentistry, restorative procedures, and preventive care, Dr. Desai and his team prioritize comfort and results. Every patient receives personalized attention and the latest dental techniques.",
    signature: "Expert dental care. Modern technology. A comfortable, professional experience.",
    editorPick: "Cosmetic & Restorative Dentistry",
    phone: "+254 715 456 222",
    hours: "08:00 – 17:00 Mon–Fri · 09:00 – 13:00 Sat (Closed Sun)",
  },
  {
    name: "Shia Yoga Studio",
    slug: "shia-yoga-studio",
    tagline: "PRACTICE WITH PURPOSE",
    editorial:
      "A premier yoga and mindfulness studio — traditional philosophy meets contemporary wellness in a serene, beautifully designed space.",
    image: shiaYoga,
    gallery: [shiaYoga, shiaYoga2],
    category: "Health & Wellness",
    subcategory: "Therapy",
    floor: "Second",
    location: "Second Floor, Wellness Studio",
    status: "open",
    about:
      "A premier yoga and mindfulness studio designed for practitioners of all levels. Shia Yoga combines traditional yoga philosophy with contemporary wellness practices. Expert instructors create transformative experiences in a serene, beautifully designed space. More than just exercise — it's a practice for body, mind, and spirit.",
    signature: "Transform your practice. Expert instruction. A sanctuary for mind and body.",
    editorPick: "Hatha · Vinyasa · Yin · Restorative",
    phone: "+254 715 456 222",
    hours: "06:00 – 20:00 daily",
  },
  {
    name: "Tintoria Dry Cleaners",
    slug: "tintoria-dry-cleaners",
    tagline: "CLEAN WITH CARE",
    editorial:
      "Professional dry cleaning specializing in delicate fabrics — European technique, modern technology, same-day service.",
    image: tintoriaImg,
    gallery: [tintoriaImg],
    category: "Guest & Building Services",
    subcategory: "Business Support",
    floor: "Ground",
    location: "Ground Floor, Service Hub",
    status: "open",
    about:
      "A professional dry cleaning service specializing in delicate fabrics and premium garment care. Tintoria combines traditional European dry cleaning techniques with modern technology. For those who believe their wardrobe deserves expert attention and careful handling. Same-day service and specialized treatments available.",
    signature: "Expert garment care. Premium dry cleaning. Clothes that last.",
    editorPick: "Same-Day Dry Cleaning + Tailoring",
    phone: "+254 715 456 222",
    hours: "08:00 – 18:00 Mon–Fri · 09:00 – 14:00 Sat (Closed Sun)",
  },
];

export const allTenants: Tenant[] = [...dining, ...retail, ...services];

/* ===== Mega menu structure ===== */
export const diningSubcategories = [
  "Cafés",
  "Casual Dining",
  "Bars",
  "Bakery",
];
export const retailSubcategories = [
  "Technology",
  "Home & Kitchen",
  "Grocery",
  "Specialty Food",
  "Jewellery",
  "Marketplace",
];

/* ===== Journal ===== */
export type JournalArticle = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  body: string[];
  pullQuote?: string;
};

export const journal: JournalArticle[] = [
  {
    slug: "a-saturday-at-abc-place",
    category: "FEATURES",
    title: "A Saturday at ABC Place: From Morning Yoga to Midnight Cocktails",
    excerpt:
      "Follow a day in the life of an ABC Place regular — from sunrise rituals to sunset indulgence — and discover how Westlands' most curated destination serves every moment of modern life.",
    image: javaHouseExterior,
    date: "May 4, 2025",
    body: [
      "The Saturday morning light catches the glass façade of ABC Place as professionals, creatives, and home cooks converge on Waiyaki Way for a ritual older than any of the businesses inside: the pursuit of quality.",
      "07:00 AM — The Slow Morning. Before the city wakes, before the inbox floods, there's coffee at Java House. A cortado, pulled with precision by baristas who understand that the first cup isn't caffeine — it's intention. Next door, Brood Bakery's ovens have been running since 4 AM. The sourdough is warm. The croissants glisten with butter that knows what it's doing.",
      "09:30 AM — Market Discovery. By mid-morning, the ABC Marketplace is alive. Zucchini's produce display is a still life. Uplands Butchery's counter gleams with cuts that tell you the animal was treated well. This is the ABC Weekend Market — where producers, growers, and small-batch makers set up alongside the retail anchors.",
      "12:00 PM — Lunch with Purpose. 360 Degrees Pizza pulls a pie from the wood-fired oven. It's been seven minutes. The dough is from Naples, via Amsterdam, via years of craft. This is not casual pizza — it's pizza as a conversation about what Nairobi deserves.",
      "04:00 PM — Retail as Ritual. Onyx Jewellery isn't a store — it's a consultation. Samsung feels like a retreat for those who think technology should be quiet and capable. Tefal's cookware catches the light like investment in future Saturdays. Healthy U doesn't sell supplements — it sells the belief that you deserve to feel good.",
      "08:00 PM — The Dinner. ABC Place doesn't have restaurants. It has destinations. Places where the chef thinks about what they're doing. Where the wine list reflects care. Where you're not just fed — you're considered.",
      "10:00 PM — The After. Fahrenheit Bar hums with the evening's second wind. The cocktails are crafted — they take time, they're made with spirits that mean something. This is where Saturday becomes memory. Where the day doesn't end — it transitions.",
      "What makes ABC Place special isn't that it's a mall. It's that every business inside is there because someone decided it belonged. ABC Place is where Westlands comes to take itself seriously. Nairobi's most considered destination. And it's waiting for you.",
    ],
    pullQuote:
      "ABC Place isn't exclusive — it's curated. There's a difference.",
  },
  {
    slug: "considered-wardrobe-abc-place",
    category: "THE GUIDE",
    title: "Building a Considered Wardrobe in One Afternoon at ABC Place",
    excerpt:
      "A small, deliberate edit beats a full bag every time. A short itinerary for an afternoon spent buying less, but better.",
    image: onyxModel,
    date: "April 28, 2025",
    body: [
      "The trick to dressing well in Nairobi is the same as the trick to dressing well anywhere: own fewer things, choose them carefully, and replace them when they wear out — not before.",
      "Start at Onyx Jewellery. The foundation pieces — a watch, simple gold, a single intentional stone. Onyx doesn't sell pieces; they curate heirlooms. Begin here, and the rest of the wardrobe will know what tone to take.",
      "Move to Samsung. Timeless technology that works as hard as you do. The phone, the watch, the headphones — choose what disappears into your life rather than crowds it.",
      "Consult at Tefal. Consider your kitchen. It is the third place after home and office, and the right pan is a wardrobe choice in its own right. The team will help you select for the way you actually cook.",
      "Finish at Healthy U. Because what you wear outside starts with how you feel inside. The right supplement, the right counsel, the right small change to the morning. The wardrobe is not only what hangs in the closet.",
    ],
    pullQuote: "Buy less. Buy better. Replace it when it wears out — not before.",
  },
  {
    slug: "morning-rituals-first-hour",
    category: "PERSPECTIVE",
    title: "On Morning Rituals: Why the First Hour Sets the Standard",
    excerpt:
      "The argument for treating the first sixty minutes of your day as a small, repeatable ceremony — and where to keep that ritual sacred.",
    image: javaHouseCounter,
    date: "April 22, 2025",
    body: [
      "There is a strong case for arriving early. Not for productivity reasons — those are well-rehearsed and largely beside the point — but because the first hour of a day, properly used, is a quiet act of self-respect.",
      "Java House's cortado matters because precision is a form of care. Beans single-origin, espresso dialled, milk steamed to a temperature someone bothered to learn. The cup is small. The intention is not.",
      "Brood's sourdough is the philosophy of fermentation made edible. Forty-eight hours of patience for a crumb that takes two minutes to enjoy. That ratio is the whole argument.",
      "A slow morning changes everything else. The meetings land differently. The decisions take a beat longer. The afternoon does not need to be reclaimed from the morning, because the morning was never lost in the first place.",
    ],
    pullQuote: "The first hour of the day is a quiet act of self-respect.",
  },
  {
    slug: "westlands-evening-after-six",
    category: "FIELD NOTES",
    title: "The Westlands Evening: A Short Map of the Hours After Six",
    excerpt:
      "Where to sit, what to order, and how to make a Tuesday feel like the small occasion it deserves to be.",
    image: fahrenheitPour,
    date: "April 15, 2025",
    body: [
      "The Westlands evening, properly handled, is a sequence of three rooms: somewhere to settle in, somewhere to eat, and somewhere to draw a quiet line under the day.",
      "360 Degrees Pizza owns the 18:00 – 19:30 sweet spot. Order on the way in, take the table near the window, and let the wood-fired oven do its seven-minute work. The wine list is short for a reason.",
      "Fahrenheit Bar at 21:00 is the right time for the right reasons. The room has settled. The bartenders have found their rhythm. Order something brown, sit in the corner banquette, and let the conversation deepen.",
      "There is a particular conversation that only happens after sunset — the one where work is finally set down and the people opposite become the point of the evening rather than its excuse. Professionals do not leave Westlands on weekday evenings because the building knows how to host them.",
    ],
    pullQuote: "Three rooms, in sequence, is enough to make a Tuesday feel deliberate.",
  },
  {
    slug: "abc-weekend-market-story",
    category: "SPOTLIGHTS",
    title: "Markets, Makers, and Meaning: The ABC Weekend Market Story",
    excerpt:
      "How a Saturday morning at the ABC Marketplace became Nairobi's most genuine gathering of producers, growers, and people who believe food matters.",
    image: zucchiniMarket,
    date: "April 8, 2025",
    body: [
      "The ABC Weekend Market did not begin as a project. It began as a habit — Zucchini's farmer arriving early, Uplands' butcher setting up beside, Foodplus opening its doors a little wider on Saturday mornings. The gathering named itself.",
      "Zucchini's farm-to-table philosophy is the engine. Direct relationships with growers, transparency about provenance, and a refusal to compromise on what 'fresh' actually means. The displays change weekly because the harvest does.",
      "Uplands Butchery brings the craft of the cut. Sourcing, ageing, respect — the three words the head butcher uses most often. Ask, and you will get an education before you get a cut.",
      "Foodplus (Chandarana) curates rather than stocks. The shelves are an edit, not an inventory. Imported staples sit beside local artisanal goods, and every product on the floor has earned its place.",
      "The farmers and growers who show up on Saturdays are the heart of it. They drive in early. They stay late. They know their customers by name. 'Marketplace' here means community first, commerce second.",
    ],
    pullQuote: "A market is what happens when producers and customers stop being strangers.",
  },
  {
    slug: "westlands-after-dark",
    category: "CULTURE",
    title: "Westlands After Dark: Where Nairobi's Creatives Actually Go",
    excerpt:
      "The real Westlands nightlife isn't about hype. It's about spaces where your drink is made with thought and your company is chosen with care.",
    image: fahrenheitInterior,
    date: "March 31, 2025",
    body: [
      "Fahrenheit Bar became the gathering place quietly. There was no launch campaign, no influencer reel, no queue at the door for its own sake. The right people simply began to arrive, and the room began to take shape around them.",
      "The craft cocktail philosophy is the architecture. Spirits that mean something — small distilleries, considered importers, ingredients with provenance. The bartenders explain what you are drinking if you ask, and stay quiet if you do not.",
      "Who actually goes to Westlands after 21:00? Not tourists. Founders winding down, editors comparing notes, a film crew unwinding from a long shoot, a couple on the third date that finally feels real. It is a working room.",
      "The conversation you can only have in places like this is the one that requires the room to be on your side. Low light. Music below the conversation. A bartender who knows when to lean in and when to step back. Fahrenheit understands the assignment.",
    ],
    pullQuote: "The real nightlife is not loud — it is considered.",
  },
];

/* ===== Events ===== */
export type AbcEvent = {
  slug: string;
  title: string;
  description: string;
  image: string;
  dateLabel: string; // "SAT 22 MAR"
  category: string;
};

export const events: AbcEvent[] = [
  {
    slug: "abc-weekend-market",
    title: "The ABC Weekend Market",
    description:
      "Where Nairobi's finest producers, local growers, and small-batch makers converge for a curated Saturday gathering. From farm-fresh vegetables to artisanal goods — your weekly ritual for authentic, quality produce. Held every Saturday morning from 08:00–14:00 at the ABC Marketplace level.",
    image: zucchiniProduce,
    dateLabel: "EVERY SATURDAY",
    category: "MARKETPLACE & COMMUNITY",
  },
  {
    slug: "fahrenheit-spirits-tasting",
    title: "An Evening of Craft Spirits & Bites",
    description:
      "Fahrenheit Bar curates an intimate monthly tasting experience featuring craft spirits, artisanal cocktails, and small bites from ABC Place's finest culinary partners. Each session showcases a different theme — from single-origin spirits to seasonal cocktail innovations. Limited to 20 guests. Reserve ahead.",
    image: fahrenheitPour,
    dateLabel: "MONTHLY · FRIDAYS",
    category: "DINING & CULTURE",
  },
  {
    slug: "slow-morning-brood",
    title: "The Slow Morning: Coffee & Conversation",
    description:
      "Before the day accelerates, join us for The Slow Morning at Brood Bakery. A ritual designed for professionals, creatives, and anyone who believes the morning sets the tone. Fresh espresso from Java House, warm sourdough from Brood, and quiet space to think. No meetings. No rush.",
    image: broodInterior,
    dateLabel: "WEEKDAYS · 07:00 – 09:00",
    category: "WELLNESS & COMMUNITY",
  },
];

/* ===== Spotlights ===== */
export const spotlights = [
  {
    title: "Brood Bakery is Now Open",
    subtitle: "The slow morning, perfected.",
    image: broodCounter,
    href: "/journal/morning-rituals-first-hour",
  },
  {
    title: "An Evening at Fahrenheit",
    subtitle: "Nairobi's most considered after-dark.",
    image: fahrenheitInterior,
    href: "/journal/westlands-after-dark",
  },
];

/* ===== Hero ===== */
export const HERO_IMAGE = javaHouseExterior;

/* ===== Hours ===== */
 export const HOURS = { open: 8, close: 17 }; // 24h

/* ===== Floors ===== */
export const FLOORS: Floor[] = ["Ground", "First", "Second"];