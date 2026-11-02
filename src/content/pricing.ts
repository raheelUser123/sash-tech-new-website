export const pricingNeeds = ["Web Design & SEO", "Video Production", "YouTube Strategy", "Illustration", "2D & 3D Animation", "AI Search (GEO)", "Digital Marketing"];

export const pricingGroups = [
  { label: "All services", indices: [0, 1, 2, 3, 4, 5, 6] },
  { label: "Design & build", indices: [0, 3, 4] },
  { label: "Video & creators", indices: [1, 2] },
  { label: "Growth & search", indices: [5, 6] },
];

export const comboPackages = [
  {
    id: "brand-launch", title: "Brand launch", label: "A confident first impression",
    description: "Bring your visual identity, website and discoverability together under one creative direction.",
    discount: 20, indices: [3, 0, 5], kind: "layers" as const,
    features: ["Illustration & creative artwork", "Web design & technical SEO", "AI search optimization", "One connected launch brief"],
  },
  {
    id: "creator-studio", title: "Creator studio", label: "Your content, connected",
    description: "Turn your ideas and footage into a consistent system of video, animation and channel direction.",
    discount: 20, indices: [1, 4, 2], kind: "video" as const,
    features: ["Video production & editing", "2D & 3D animation", "Creator growth & YouTube strategy", "A cohesive content direction"],
  },
  {
    id: "complete-digital", title: "Complete digital", label: "The connected creative stack",
    description: "A coordinated scope across design, production, web, search and paid acquisition for your next stage of growth.",
    discount: 30, indices: [0, 1, 2, 3, 4, 5, 6], kind: "network" as const,
    features: ["All seven creative & digital disciplines", "Website, illustration & animation", "Video, creator strategy & content", "SEO, GEO & digital marketing", "One agreed scope and delivery plan"],
  },
];

export function quoteLink(indices: number[], packageId?: string) {
  const params = new URLSearchParams({ need: indices.map(i => pricingNeeds[i]).join(",") });
  if (packageId) params.set("package", packageId);
  return "/contact?" + params.toString();
}

export const pricingSteps = [
  { title: "Choose a service", text: "Tell us which service and deliverables you need, or choose a connected combo package." },
  { title: "Share your brief", text: "Provide your goals, timeline and useful references so we can understand the work." },
  { title: "Receive a proposal", text: "We send a clear quote with scope, milestones and revisions. Bundle proposals show the discount breakdown." },
  { title: "Start production", text: "Once approved, your project enters the agreed production schedule." },
];
