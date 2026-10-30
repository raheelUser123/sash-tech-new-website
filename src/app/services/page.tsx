import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { MotionEngine } from "@/components/motion/MotionEngine";
import { services } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import styles from "./services.module.css";

export const metadata = pageMetadata({ title: "Creative Services", description: "Explore Sash Tech Digital's design, video, animation, web, search and marketing services.", path: "/services" });

export default function ServicesPage() {
  return <>
    <PageHero title={<>Creative services for <em>ambitious ideas.</em></>} text={<p>From the first concept to the final launch, we combine design, production and digital strategy to help you stand out.</p>} primary={{ label: "Start a project", href: "/contact" }} tagline="CREATIVE · STRATEGY · GROWTH" visual={{ src: "/images/sashtech/hero-image.webp", width: 800, height: 700 }} />
    <section className="section theme-paper"><div className="container"><div className={styles.grid}>{services.map((service) => <Link className={styles.card} href={service.href} key={service.href}><div className={styles.media}><Image src={service.visual} alt="" fill sizes="(min-width: 900px) 30vw, 90vw" /></div><div className={styles.body}><h2>{service.label}</h2><p>{service.description}</p><span>Explore service →</span></div></Link>)}</div></div></section>
    <MotionEngine />
  </>;
}
