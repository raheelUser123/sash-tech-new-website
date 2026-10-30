import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Arrow } from "@/components/ui/Button";
import { TiltCard } from "./TiltCard";
import styles from "./WhatWeDo.module.css";

const PILLARS = [
  {
    title: "Create.",
    tagline: "Design that stays with people.",
    text: "Distinctive illustration, character design and animation turn ideas into visuals with personality and impact.",
    tags: ["Illustration", "Book covers", "Character design", "2D animation", "3D modeling"],
    cta: "Explore creative services",
    href: "/services/illustration-creative-artwork",
    icon: "/images/icons/sparkle.svg",
    tone: "dark",
  },
  {
    title: "Build.",
    tagline: "Digital experiences that perform.",
    text: "We pair custom web design with responsive development and technical SEO so your business looks strong and gets found.",
    tags: ["Web design", "Responsive development", "Technical SEO", "AI search", "Content"],
    cta: "Explore web design",
    href: "/services/web-design-technical-seo",
    icon: "/images/icons/atom.svg",
    tone: "sand",
  },
  {
    title: "Grow.",
    tagline: "Stories made to travel further.",
    text: "Video production, creator strategy and paid campaigns help brands reach the right people and build lasting attention.",
    tags: ["Video editing", "YouTube strategy", "Social media", "Paid ads", "Copywriting"],
    cta: "Explore digital marketing",
    href: "/services/digital-marketing-paid-acquisition",
    icon: "/images/icons/infinity.svg",
    tone: "red",
  },
] as const;

export function WhatWeDo() {
  return (
    <section className="section theme-paper" aria-labelledby="wwd-title">
      <div className="container">
        <SectionHeader
          eyebrow="WHAT WE DO"
          title={
            <span id="wwd-title">
              Creative ideas.
              <br /> Real <em>impact.</em>
            </span>
          }
          text={<p>Creative and digital solutions from start to finish to elevate your brand, content and online growth.</p>}
        />
        <ul role="list" className={styles.cards} data-reveal-stagger="0.12">
          {PILLARS.map((p, i) => (
            <li key={p.title} className={styles.item}>
              <TiltCard className={`${styles.card} ${styles[p.tone]}`}>
                <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={styles.title}>{p.title}</h3>
                <p className={styles.tagline}>{p.tagline}</p>
                <div className={styles.icon} aria-hidden="true">
                  <Image src={p.icon} alt="" width={300} height={300} />
                </div>
                <p className={styles.text}>{p.text}</p>
                <ul role="list" className={styles.tags}>
                  {p.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <Link href={p.href} className={styles.link}>
                  {p.cta}
                  <Arrow className={styles.arrow} />
                </Link>
              </TiltCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
