import styles from "./LogoMarquee.module.css";

const SPECIALTIES = ["Illustration", "Animation", "Video Production", "Web Design", "Technical SEO", "Digital Marketing"];

export function LogoMarquee() {
  const row = (hidden: boolean) => <ul role="list" className={styles.row} aria-hidden={hidden || undefined}>{Array.from({ length: 3 }, (_, repeat) => SPECIALTIES.map((label) => <li key={`${repeat}-${label}`} aria-hidden={repeat > 0 ? true : undefined}><span className={styles.label}>{label}</span></li>))}</ul>;
  return <div className={styles.marquee}><div className={styles.track}>{row(false)}{row(true)}</div></div>;
}
