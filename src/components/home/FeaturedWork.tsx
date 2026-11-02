import { Marquee } from "@/components/sections/Marquee";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { CreativeGallery } from "@/components/work/CreativeGallery";
import styles from "./FeaturedWork.module.css";

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
            text={<p>Explore websites, visual identities and creative projects from Sash Tech Digital.</p>}
            aside={
              <Button href="/portfolio" variant="outline-light">
                All projects
              </Button>
            }
          />

          <CreativeGallery limit={6} />
        </div>
      </div>
    </section>
  );
}
