import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { MotionEngine } from "@/components/motion/MotionEngine";
import { services } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import styles from "../services.module.css";

export function generateStaticParams() { return services.map((service) => ({ slug: service.href.split("/").pop()! })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((item) => item.href.endsWith(`/${slug}`));
  return service ? pageMetadata({ title: service.label, description: service.description ?? "", path: service.href }) : {};
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((item) => item.href.endsWith(`/${slug}`));
  if (!service) notFound();
  return <>
    <PageHero title={<>{service.label.split(" & ")[0]} <em>{service.label.includes(" & ") ? `& ${service.label.split(" & ").slice(1).join(" & ")}` : "by Sash Tech"}</em></>} text={<p>{service.description} We bring creative thinking and careful execution together for work that looks polished and supports your goals.</p>} primary={{ label: "Start a project", href: "/contact" }} secondary={{ label: "Explore all services", href: "/services" }} tagline="SASH TECH DIGITAL · CREATIVE SERVICES" visual={{ src: service.visual, width: 800, height: 700 }} />
    <section className="section theme-paper"><div className="container"><div className={styles.detail}><div><p className={styles.eyebrow}>WHAT WE OFFER</p><h2>Thoughtful work from <em>idea to delivery.</em></h2><p>Every project starts with your goals, audience and references. We define a clear direction, create the work, refine the details with you and deliver assets ready to use.</p></div><div className={styles.detailMedia}><Image src={service.visual} alt={service.label} fill sizes="(min-width: 900px) 42vw, 90vw" /></div></div><ul className={styles.tags}>{service.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul></div></section>
    <CtaBanner title={<>Have a project <em>in mind?</em></>} text="Tell us what you are building. We will help shape the right creative and digital approach." primary={{ label: "Let's talk", href: "/contact" }} secondary={{ label: "See our work", href: "/work" }} />
    <MotionEngine />
  </>;
}
