import { site } from "@/lib/site";
import { WhatsAppIcon } from "@/components/ui/ContactIcons";
import styles from "./WhatsAppChat.module.css";

export function WhatsAppChat() {
  return <a className={styles.button} href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label={`Chat with us on WhatsApp at ${site.phone} (opens in a new tab)`}><WhatsAppIcon /></a>;
}
