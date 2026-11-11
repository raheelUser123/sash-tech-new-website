import { BrandVisual } from "@/components/ui/BrandVisual";
import { TiltVisual } from "@/components/motion/TiltVisual";
import { Glow } from "@/components/motion/Glow";
import { Button } from "@/components/ui/Button";
import { HexagonBackground } from "./HexagonBackground";
import { HeroScene } from "./HeroScene";
import { LogoMarquee } from "./LogoMarquee";
import styles from "./HomeHero.module.css";

export function HomeHero() {
  return (
    <section className={`${styles.hero} theme-dark`} aria-labelledby="home-title">
      <Glow />
      <HexagonBackground />
      <HeroScene />
      <div className={`container ${styles.inner}`}>
        <p className={styles.kicker} data-reveal="fade" data-immediate>
          CREATIVE <span>DESIGN</span> · STRATEGY · GROWTH
        </p>

        <div className={styles.grid}>
          <div className={styles.copy}>
            <h1 id="home-title" className={`display ${styles.title}`} data-hero-title>
              Design that speaks. <em>Strategy that grows.</em>
            </h1>
          </div>

          <div className={styles.side} data-particle-origin>
            <TiltVisual className={styles.visual}>
              <BrandVisual kind="orbit" />
            </TiltVisual>
            <p className={`body ${styles.text}`} data-reveal data-immediate data-delay="0.45">
              We help businesses, creators, and authors scale their digital presence through high end design, video, and strategic growth.
            </p>
            <div className={styles.actions} data-reveal data-immediate data-delay="0.6">
              <Button href="/contact">Start a project</Button>
              <Button href="/portfolio" variant="outline-light">
                See our work
              </Button>
            </div>
          </div>
        </div>

        <span className={styles.rule} data-reveal="line" data-immediate data-delay="0.5" aria-hidden="true" />

        <div className={styles.trusted} data-reveal="fade" data-immediate data-delay="0.8">
          <p className={styles.trustedLabel}>CREATIVE WORK THAT MOVES BRANDS</p>
          <LogoMarquee />
        </div>
      </div>
    </section>
  );
}
