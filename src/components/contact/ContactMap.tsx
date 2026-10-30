import Image from "next/image";
import { site } from "@/lib/site";
import styles from "./ContactMap.module.css";

const ADDRESS = `${site.address.street}, ${site.address.city}, ${site.address.postalCode}, ${site.address.countryName}`;
const DIRECTIONS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

export function ContactMap() {
  return <div className={styles.wrap} data-reveal="clip">
    <div className={styles.map}><Image src="/images/sashtech/contact.webp" alt="Sash Tech Digital contact team" fill sizes="(min-width: 900px) 80vw, 95vw" style={{ objectFit: "cover" }} /></div>
    <div className={styles.card}><p className={styles.cardAddress}>{site.address.street},<br />{site.address.city}, {site.address.postalCode}</p><a className={styles.directions} href={DIRECTIONS} target="_blank" rel="noopener noreferrer">Get directions <span className="sr-only">(opens Google Maps in a new tab)</span>↗</a></div>
  </div>;
}
