import { OurExpertise } from "@/components/about/OurExpertise";
import { PageHero } from "@/components/sections/PageHero";
import { CreatorGrowth } from "@/components/sections/CreatorGrowth";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { Process } from "@/components/sections/Process";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { MotionEngine } from "@/components/motion/MotionEngine";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "About Sash Tech", description: "Meet Sash Tech, a multidisciplinary creative agency combining design, technology and growth strategy.", path: "/about" });

const STEPS = [
  { title: "Discovery & Strategy", text: "We start by understanding your business goals, audience and project requirements." },
  { title: "Creative Design", text: "We develop modern layouts, custom visuals and a cohesive creative direction." },
  { title: "Build & Optimize", text: "We create the assets, build the experience and refine every detail." },
  { title: "Launch & Grow", text: "We deliver organized work ready to launch and support the next stage of growth." },
];

export default function AboutPage() {
  return <>
    <PageHero title={<>Creative thinking with a <em>technical edge.</em></>} text={<p>We help ambitious brands and creators move from scattered ideas to clear, high-quality digital execution.</p>} primary={{ label: "Start a project", href: "/contact" }} secondary={{ label: "See our work", href: "/work" }} tagline="ABOUT SASH TECH" visual={{ src: "/images/about/star-hero.png", width: 800, height: 700 }} />
    <OurExpertise />
    <CreatorGrowth />
    <WhatWeDo />
    <section className="section theme-dark"><div className="container"><SectionHeader eyebrow="OUR PROCESS" title={<>From vision to <em>execution.</em></>} text={<p>A connected workflow keeps the creative direction, technical work and delivery aligned.</p>} /><Process steps={STEPS} theme="dark" /></div></section>
    <CtaBanner title={<>Ready to build something <em>bold?</em></>} text="Let's discuss your requirements, timeline and growth goals." primary={{ label: "Start a project", href: "/contact" }} secondary={{ label: "View our work", href: "/work" }} />
    <MotionEngine />
  </>;
}
