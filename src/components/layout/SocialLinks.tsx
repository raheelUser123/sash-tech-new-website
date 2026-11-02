import { site } from "@/lib/site";
import styles from "./Footer.module.css";

function InstagramIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>;
}
function FacebookIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 21v-8h2.7l.4-3H14V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9a22 22 0 0 0-2.5-.1c-2.5 0-4.2 1.5-4.2 4.3V10H8v3h2.6v8Z"/></svg>;
}
export function SocialLinks() {
  return <div className={styles.socials} aria-label="Social media">
    <a className={styles.socialIcon} href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Sash Tech Digital on Instagram" title="Instagram"><InstagramIcon/></a>
    {site.social.facebook ? <a className={styles.socialIcon} href={site.social.facebook} target={site.social.facebook.startsWith("https://") ? "_blank" : undefined} rel="noopener noreferrer" aria-label="Sash Tech Digital on Facebook" title="Facebook"><FacebookIcon/></a> : <span className={styles.socialPending} role="img" aria-label="Facebook - link pending" title="Facebook - link pending"><FacebookIcon/></span>}
  </div>;
}
