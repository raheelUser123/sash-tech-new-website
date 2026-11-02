import { BrandVisual } from "@/components/ui/BrandVisual";
import { Glow } from "@/components/motion/Glow";
import { TiltVisual } from "@/components/motion/TiltVisual";
import { NewsletterForm } from "./NewsletterForm";
import styles from "./Newsletter.module.css";

/** "[ STAY IN THE LOOP ] Get new insights in your inbox." — dark signup band with the orb. */
export function Newsletter() {
  return (
    <section id="subscribe" className={`${styles.section} theme-dark`} aria-labelledby="subscribe-title">
      <Glow position="right" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={styles.eyebrow} data-reveal="fade">
            [ STAY IN THE LOOP ]
          </p>
          <h2 id="subscribe-title" className="display" data-split>
            Get <em>new insights</em> in your inbox.
          </h2>
          <div data-reveal data-delay="0.1">
            <NewsletterForm />
          </div>
        </div>
        <TiltVisual className={styles.visual}>
          <BrandVisual kind="prism" />
        </TiltVisual>
      </div>
    </section>
  );
}
