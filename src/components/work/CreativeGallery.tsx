import Image from "next/image";
import styles from "./CreativeGallery.module.css";

const items = [
  { title: "Web design", src: "/images/sashtech/websiteockup/web5.webp", category: "Digital" },
  { title: "Brand identity", src: "/images/sashtech/branding/branding1.webp", category: "Branding" },
  { title: "Responsive websites", src: "/images/sashtech/websiteockup/web6.webp", category: "Digital" },
  { title: "Visual systems", src: "/images/sashtech/branding/branding2.webp", category: "Branding" },
  { title: "Creative websites", src: "/images/sashtech/websiteockup/web3.webp", category: "Digital" },
  { title: "Brand artwork", src: "/images/sashtech/branding/branding3.webp", category: "Branding" },
  { title: "Web experiences", src: "/images/sashtech/websiteockup/web4.webp", category: "Digital" },
  { title: "Brand design", src: "/images/sashtech/branding/branding4.webp", category: "Branding" },
];

export function CreativeGallery({ limit }: { limit?: number }) {
  return <div className={styles.grid}>{items.slice(0, limit).map((item) => <article className={styles.card} key={item.src}><div className={styles.media}><Image src={item.src} alt={item.title} fill sizes="(min-width: 900px) 44vw, 90vw" /></div><div className={styles.caption}><span>{item.category}</span><h3>{item.title}</h3></div></article>)}</div>;
}
