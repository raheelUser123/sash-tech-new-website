import { SectionHeader } from "@/components/ui/SectionHeader";
import styles from "./Industries.module.css";

const INDUSTRIES = [
  { name: "Businesses", count: "01" },
  { name: "Creators", count: "02" },
  { name: "Authors", count: "03" },
  { name: "Agencies", count: "04" },
];

const MARKETS = ["DESIGN", "VIDEO", "WEB", "SEARCH", "GROWTH"];

export function Industries() {
  return (
    <section className="section theme-sand" aria-labelledby="industries-title">
      <div className="container">
        <SectionHeader
          title={
            <span id="industries-title">
              Built for ambitious <em>ideas.</em>
            </span>
          }
          text={<p>We work with businesses, creators, authors and agencies to turn ideas into polished digital experiences.</p>}
        />

        <ul role="list" className={styles.tiles} data-reveal-stagger="0.1">
          {INDUSTRIES.map((ind, i) => (
            <li key={ind.name} className={styles.tile}>
              <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
              <svg className={styles.arrow} width="38" height="10" viewBox="0 0 38 10" aria-hidden="true">
                <path d="M0 5h36M32 1l4 4-4 4" stroke="currentColor" fill="none" strokeWidth="1.2" />
              </svg>
              <h3 className={styles.name}>{ind.name}</h3>
              <p className={styles.stat}><span className={styles.count}>{ind.count}</span></p>
            </li>
          ))}
        </ul>

        <div className={styles.karachi}>
          <h2 className="h2" data-split>
            Creative by nature.
            <br /> Working <em>everywhere.</em>
          </h2>
          <p className="body" data-reveal>
            Every project brings together the right mix of creative work and technical expertise.
          </p>
          <ul role="list" className={styles.markets} aria-label="Markets we work in" data-reveal-stagger="0.06">
            {MARKETS.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
