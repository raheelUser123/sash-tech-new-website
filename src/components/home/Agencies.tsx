import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import styles from "./Agencies.module.css";

export function Agencies() {
  return (
    <section className="section theme-paper" aria-labelledby="agencies-title">
      <div className="container">
        <Eyebrow>WHY CHOOSE US</Eyebrow>
        <div className={styles.center}>
          <h2 id="agencies-title" className="h2" data-split>
            Your vision. <em>Our expertise.</em>
          </h2>
          <p className="body" data-reveal>
            We combine creativity, strategy and technology to deliver work that feels polished, performs strongly and supports your long-term growth.
          </p>
          <div data-reveal data-delay="0.1">
            <Button href="/about" variant="outline-dark">
              About Sash Tech
            </Button>
          </div>
        </div>
        <div style={{ position: "relative", width: "100%", maxWidth: 1100, aspectRatio: "16 / 8", margin: "52px auto 0", overflow: "hidden", borderRadius: 24 }}><Image src="/images/sashtech/newimages/WHY CHOOSE US Section.webp" alt="Sash Tech creative workflow" fill sizes="(min-width: 900px) 75vw, 90vw" style={{ objectFit: "cover" }} /></div>
      </div>
    </section>
  );
}
