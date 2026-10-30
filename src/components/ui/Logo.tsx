import Image from "next/image";
import styles from "./Logo.module.css";

export function Logo({ className, size = "md" }: { className?: string; size?: "md" | "lg" }) {
  return (
    <span className={[styles.logo, styles[size], className].filter(Boolean).join(" ")}>
      <Image src="/images/sashtech/mark.png" alt="" width={72} height={72} className={styles.mark} priority />
      <span className={styles.word}>
        Sash <b>Tech</b>
      </span>
    </span>
  );
}
