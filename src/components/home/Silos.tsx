import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Logo } from "@/components/ui/Logo";
import styles from "./Silos.module.css";

const USUAL = ["Scattered creative work", "Disconnected campaigns", "Inconsistent visuals", "Unclear ownership"];
const OURS = ["Design", "Production", "Web & search", "Growth"];

function GiantRow() {
  return (
    <span className={styles.giantRow}>
      {["Create", "Connect", "Create", "Connect"].map((t, i) => (
        <span key={i} className={styles.giantItem}>
          {t}
          <Image src="/images/icons/asterisk.svg" alt="" width={90} height={85} className={styles.star} />
        </span>
      ))}
    </span>
  );
}

export function Silos() {
  return (
    <section className={`section theme-dark ${styles.section}`} aria-labelledby="silos-title">
      <div className="container">
        <Eyebrow line={false}>WHY SASH TECH</Eyebrow>
        <h2 id="silos-title" className={`h2 ${styles.title}`} data-split>
          Your vision deserves a <em>connected team.</em>
        </h2>
      </div>

      <div className={styles.giant} aria-hidden="true">
        <div className={styles.giantTrack}>
          <GiantRow />
          <GiantRow />
        </div>
      </div>

      <div className={`container ${styles.compare}`}>
        <div className={styles.col}>
          <h3 className={styles.colHead}>WHEN WORK IS DISCONNECTED</h3>
          <ul role="list" className={styles.list} data-reveal-stagger="0.08">
            {USUAL.map((t) => (
              <li key={t} className={styles.struck}>
                <s>{t}</s>
              </li>
            ))}
          </ul>
          <p className={styles.sum} data-reveal>
            A fragmented process makes it harder to keep quality and direction consistent.
          </p>
        </div>
        <div className={styles.col}>
          <h3 className={styles.colHead}>
            <span className="sr-only">The Sash Tech way</span>
            <Logo />
          </h3>
          <ul role="list" className={styles.list} data-reveal-stagger="0.08">
            {OURS.map((t) => (
              <li key={t} className={styles.ours}>
                <span className={styles.check} aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
          <p className={styles.sum} data-reveal>
            One clear creative direction from the first idea to final delivery.
          </p>
        </div>
      </div>
    </section>
  );
}
