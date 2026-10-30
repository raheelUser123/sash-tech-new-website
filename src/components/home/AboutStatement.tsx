import { Eyebrow } from "@/components/ui/Eyebrow";
import { CurvedGallery } from "./CurvedGallery";
import styles from "./AboutStatement.module.css";

export function AboutStatement() {
  return (
    <section className={`section theme-paper ${styles.section}`} aria-labelledby="about-title">
      <div className="container">
        <Eyebrow>ABOUT</Eyebrow>
        <div className={styles.body}>
          <h2 id="about-title" className="sr-only">
            About Sash Tech Digital
          </h2>
          <p className={styles.statement} data-scrub-words>
            We bring <em>creativity, strategy and technology</em> together to make brands, stories and digital experiences stand out.
          </p>
          <p className={styles.note} data-reveal="fade">
            [ CREATIVE · STRATEGY · GROWTH ]
          </p>
        </div>
      </div>
      <CurvedGallery />
    </section>
  );
}
