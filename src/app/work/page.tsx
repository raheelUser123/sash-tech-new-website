import { PageHero } from "@/components/sections/PageHero";
import { CreativeGallery } from "@/components/work/CreativeGallery";
import { MotionEngine } from "@/components/motion/MotionEngine";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Our Work", description: "A selection of web design, branding and creative work from Sash Tech Digital.", path: "/work" });

export default function WorkPage() {
  return <>
    <PageHero title={<>Our work. <em>Made to stand out.</em></>} text={<p>Explore web projects, brand identities and visual work crafted for clarity, performance and memorable design.</p>} primary={{ label: "Start a project", href: "/contact" }} tagline="WEB DESIGN · BRANDING · CREATIVE" visual={{ src: "/images/sashtech/branding/branding5.webp", width: 800, height: 700 }} />
    <section className="section theme-dark"><div className="container"><CreativeGallery /></div></section>
    <CtaBanner title={<>Your idea could be <em>next.</em></>} text="Tell us what you are building and let's make something memorable together." primary={{ label: "Start a project", href: "/contact" }} />
    <MotionEngine />
  </>;
}
