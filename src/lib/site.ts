export const site = {
  name: "Sash Tech Digital",
  shortName: "Sash Tech",
  url: (process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://sashtech.digital").replace(/\/+$/, ""),
  description:
    "Creative design, animation, video, websites, SEO and digital campaigns for brands ready to grow.",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "info@sashtech.digital",
  phone: "+1 (385) 885-7732",
  phoneHref: "tel:+13858857732",
  whatsappUrl: "https://web.whatsapp.com/send?phone=13858857732",
  locale: "en_US",
  social: {
    instagram: "https://www.instagram.com/sashtech.digital/",
    facebook: "#",
  },
  address: {
    street: "2312 Pontiac Dr",
    city: "Harker Heights, Texas",
    postalCode: "76548",
    country: "US",
    countryName: "United States",
  },
  markets: ["US", "UK", "Worldwide"],
} as const;

export type NavLink = { label: string; href: string; description?: string };

export const services: (NavLink & { short: string; visual: string; tags: string[] })[] = [
  { label: "Web Design & Technical SEO", short: "Web Design & SEO", href: "/services/web-design-technical-seo", description: "Custom web architecture paired with deep technical SEO delivering fast load times, flawless responsiveness, and maximum search visibility.", visual: "/images/shopify-development/hero-cube.png", tags: ["Website Designing", "Search Engine Optimization", "Responsive Development & Tuning"] },
  { label: "Video Production & Editing", short: "Video Production", href: "/services/video-production-editing", description: "From high-converting short-form clips to narrative-driven long-form content, we produce and edit video designed to captivate your audience.", visual: "/images/marketing/orb-hero.png", tags: ["Long-Form Video Editing", "Short-Form Video Editing", "Sound Design & Color Grading"] },
  { label: "Creator Growth & YouTube Strategy", short: "Creator Growth", href: "/services/creator-growth-youtube-strategy", description: "Algorithm-optimized SEO, thumbnail strategies, and distribution systems designed to turn casual viewers into loyal subscribers.", visual: "/images/cro/hero-funnel.png", tags: ["YouTube SEO", "Audience Scaling Strategies", "Thumbnail Design & Optimization"] },
  { label: "Illustration & Creative Artwork", short: "Illustration", href: "/services/illustration-creative-artwork", description: "Distinctive covers, characters and bespoke artwork created to make ideas unforgettable.", visual: "/images/about/star-hero.png", tags: ["Book & Novel Covers", "Character Designing", "Custom Artworks"] },
  { label: "2D & 3D Modeling & Animation", short: "Animation", href: "/services/2d-3d-modeling-animation", description: "Professional 2D and 3D modeling, high-quality animation, and scroll-stopping custom GIF experiences for modern brands.", visual: "/images/white-label/atom-3d.png", tags: ["2D Modeling & Animation", "3D Modeling & Animation", "Custom GIFs & Motion Graphics"] },
  { label: "AI Search Optimization", short: "AI Search (GEO)", href: "/services/ai-search-optimization", description: "As search shifts to generative AI answers, we build the entities, citations and semantic content that help your business be understood and referenced.", visual: "/images/insights/cube-3d.png", tags: ["Entity & Knowledge Graph Building", "Citation & Authority Engineering", "Semantic & Intent-Driven Content"] },
  { label: "Digital Marketing & Paid Acquisition", short: "Digital Marketing", href: "/services/digital-marketing-paid-acquisition", description: "Content, social and paid campaigns designed to turn attention into growth.", visual: "/images/partners/infinity-3d.png", tags: ["Social Media Marketing", "Paid Advertising (PPC)", "Content Marketing & Copywriting"] },
];

export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export const companyNav: NavLink[] = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export const legalNav: NavLink[] = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];
