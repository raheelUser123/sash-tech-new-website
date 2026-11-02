import Image from "next/image";
import styles from "./Logo.module.css";

export function Logo({ className, size = "md" }: { className?: string; size?: "md" | "lg" }) {
  return (
    <span className={[styles.logo, styles[size], className].filter(Boolean).join(" ")}>
      <Image src="/images/logo.webp" alt="Sash Tech Digital" width={320} height={278} className={styles.mark} preload />
    </span>
  );
}
