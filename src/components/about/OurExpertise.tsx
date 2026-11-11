import Link from "next/link";
import { Button } from "@/components/ui/Button";
import styles from "./OurExpertise.module.css";

const EXPERTISE = [
  { name: "Design with personality.", category: "CREATIVE", text: "Illustration, visual identities, video and motion that make your brand feel unmistakably yours.", href: "/services/illustration-creative-artwork", tags: "ART DIRECTION / 2D & 3D / MOTION" },
  { name: "Built to work beautifully.", category: "TECHNOLOGY", text: "Thoughtful websites, responsive development and technical SEO. Every detail has a purpose.", href: "/services/web-design-technical-seo", tags: "WEB DESIGN / DEVELOPMENT / SEO" },
  { name: "A clearer path to growth.", category: "STRATEGY", text: "Connected campaigns, creator strategy and AI search that bring your work to the right people.", href: "/services/digital-marketing-paid-acquisition", tags: "CAMPAIGNS / CONTENT / AI SEARCH" },
];

function ExpertiseArt({ index }: { index: number }) {
  return <svg viewBox="0 0 100 100" fill="none" aria-hidden="true" className={styles.art}>
    {index === 0 ? <><path d="M50 9 61 39 91 50 61 61 50 91 39 61 9 50 39 39Z"/><path d="M50 24 57 43 76 50 57 57 50 76 43 57 24 50 43 43Z"/><circle cx="50" cy="50" r="37" strokeDasharray="2 6"/></>
    : index === 1 ? <><path d="m50 12 34 19v38L50 88 16 69V31Z"/><path d="m16 31 34 20 34-20M50 51v37M33 21l34 20v38M16 50l34 19 34-19"/><path d="m33 41 17-10 17 10-17 10Z"/></>
    : <><circle cx="50" cy="50" r="36"/><circle cx="50" cy="50" r="23" strokeDasharray="3 5"/><path d="m25 66 20-21 12 9 23-29M62 25h18v18"/><circle cx="25" cy="66" r="4"/><circle cx="50" cy="14" r="4"/></>}
  </svg>;
}

export function OurExpertise() {
  return <section className={styles.section} aria-labelledby="expertise-title">
    <div className="container">
      <div className={styles.panel}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}><span/> WHAT WE DO BEST</p>
          <h2 id="expertise-title">Different skills.<br/>One <em>creative direction.</em></h2>
          <p className={styles.description}>Design, technology and strategy work better together. We bring them into one team to turn your next idea into a connected digital experience.</p>
          <Button href="/services" variant="outline-light">Explore our services</Button>
          <div className={styles.signature} aria-hidden="true"><span>THINK.</span><span>MAKE.</span><span>CONNECT.</span></div>
        </div>
        <div className={styles.services}>
          {EXPERTISE.map((item, index) => <Link href={item.href} key={item.category} className={styles.service}>
            <div className={styles.artwork}><ExpertiseArt index={index}/></div>
            <div className={styles.details}>
              <span className={styles.category}>0{index + 1} / {item.category}</span>
              <h3>{item.name}</h3>
              <p>{item.text}</p>
              <span className={styles.tags}>{item.tags}</span>
            </div>
            <span className={styles.arrow} aria-hidden="true">?</span>
          </Link>)}
        </div>
        <div className={styles.footer}><span className={styles.footerLabel}>THE CONNECTED APPROACH</span><p>Creative thinking. Technical precision. Shared ambition.</p><span className={styles.footerMark} aria-hidden="true">?</span></div>
      </div>
    </div>
  </section>;
}
