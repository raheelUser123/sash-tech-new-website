import { Marquee } from "@/components/sections/Marquee";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { PortfolioGrid } from "@/components/work/PortfolioGrid";
import { projects } from "@/content/work";
import type { PortfolioItem } from "@/content/portfolio";
import styles from "./FeaturedWork.module.css";

const websites: PortfolioItem[] = projects.map(project => ({
  id: project.slug,
  title: project.name,
  src: project.image,
  ...project.imageSize,
  kind: "web",
  medium: "image",
}));

const branding: PortfolioItem[] = [
  { id: "rival-brand", title: "Rival brand identity", src: "/images/sashtech/branding/branding1.webp", width: 2048, height: 1536, kind: "logo", medium: "image" },
  { id: "seto-brand", title: "Seto visual identity", src: "/images/sashtech/branding/branding2.webp", width: 2048, height: 1536, kind: "logo", medium: "image" },
  { id: "cultt-brand", title: "Cultt brand identity", src: "/images/sashtech/branding/branding3.webp", width: 1600, height: 1200, kind: "logo", medium: "image" },
];

const showcase = websites.flatMap((website, index) => [website, branding[index]]);

export function FeaturedWork() {
  return (
    <section id="work" className={styles.section} aria-labelledby="work-title">
      <Marquee
        items={Array.from({ length: 8 }, (_, i) => (i % 2 ? "Featured projects" : "Latest work"))}
        label="Latest work and featured projects"
      />
      <div className="theme-dark section">
        <div className="container">
          <SectionHeader
            eyebrow="FEATURED WORK"
            title={
              <span id="work-title">
                Creative work. Real <em>impact.</em>
              </span>
            }
            text={<p>Explore websites and brand identities from Sash Tech Digital.</p>}
            aside={
              <Button href="/portfolio" variant="outline-light">
                All projects
              </Button>
            }
          />

          <PortfolioGrid items={showcase} layout="showcase" />
        </div>
      </div>
    </section>
  );
}
