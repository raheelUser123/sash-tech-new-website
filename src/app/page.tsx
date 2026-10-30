import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { AboutStatement } from "@/components/home/AboutStatement";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { Silos } from "@/components/home/Silos";
import { Industries } from "@/components/home/Industries";
import { Agencies } from "@/components/home/Agencies";
import { NeedBuilder } from "@/components/home/NeedBuilder";
import { CloudLogo } from "@/components/home/CloudLogo";
import { Process } from "@/components/sections/Process";
import { MotionEngine } from "@/components/motion/MotionEngine";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata({
    title: `${site.name} | Creative Design, Animation & Digital Growth`,
    description:
      "Sash Tech creates bold design, animation, video, websites, SEO and digital campaigns for brands ready to grow.",
    path: "/",
  }),
  title: { absolute: `${site.name} | Creative Design, Animation & Digital Growth` },
};

const FAQS = [
  {
    question: "What does Sash Tech Digital do?",
    answer:
      "We bring together illustration, animation, video production, web design, SEO and digital marketing to help brands and creators grow.",
  },
  {
    question: "Can you create a website and its visual identity?",
    answer:
      "Yes. We can connect brand direction, custom visuals, responsive web design and technical SEO in one project.",
  },
  {
    question: "Do you offer video editing and animation?",
    answer:
      "Yes. We create short and long form edits, motion graphics and custom 2D and 3D animation.",
  },
  {
    question: "Can you support YouTube growth?",
    answer:
      "We help creators with YouTube SEO, thumbnail design and audience growth strategy alongside production support.",
  },
  {
    question: "What is AI Search Optimization?",
    answer:
      "AI Search Optimization, or GEO, structures content, entities and citations so your business is easier for AI search tools to understand and reference.",
  },
  {
    question: "How do we start a project?",
    answer:
      "Tell us about your goals, timeline and references through the contact form. We will discuss the scope and a clear creative direction with you.",
  },
];

const STEPS = [
  {
    title: "Discover",
    text: "We learn your goals, audience, references and project requirements.",
  },
  {
    title: "Plan",
    text: "We define the scope, milestones, creative direction and delivery schedule.",
  },
  {
    title: "Create",
    text: "Our specialists develop the concepts, visuals and production assets, then refine them with you.",
  },
  {
    title: "Deliver",
    text: "Final work is quality checked, organized and delivered ready to launch.",
  },
];

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <AboutStatement />
      <FeaturedWork />
      <WhatWeDo />
      <Silos />
      <section className="section theme-paper" aria-labelledby="how-title">
        <div className="container">
          <SectionHeader
            eyebrow="HOW WE WORK"
            title={
              <span id="how-title">
                From first idea to <em>final delivery.</em>
              </span>
            }
            text={<p>Every project follows a clear, collaborative system designed to protect quality, timing and communication.</p>}
          />
          <Process steps={STEPS} />
        </div>
      </section>
      <Industries />
      <Agencies />
      <NeedBuilder />
      <Faq items={FAQS} />
      <CtaBanner
        title={
          <>
            Ready to make something <em>remarkable?</em>
          </>
        }
        text="Tell us about your project, your audience and the impact you want to make. We'll help shape a clear path from first idea to final delivery."
        primary={{ label: "Start a project", href: "/contact" }}
        secondary={{ label: "Explore our work", href: "/work" }}
        visual={<CloudLogo />}
      />
      <MotionEngine />
    </>
  );
}
