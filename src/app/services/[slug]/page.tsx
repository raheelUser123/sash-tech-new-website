import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { Process } from "@/components/sections/Process";
import { CheckList } from "@/components/sections/CheckList";
import { ServiceDeepDive } from "@/components/sections/ServiceDeepDive";
import { ServiceDiagram } from "@/components/sections/ServiceDiagram";
import { OrbitDiagram } from "@/components/marketing/OrbitDiagram";
import { CreativeGallery } from "@/components/work/CreativeGallery";
import { MotionEngine } from "@/components/motion/MotionEngine";
import { BrandVisual, serviceVisuals } from "@/components/ui/BrandVisual";
import { services } from "@/lib/site";
import { serviceDetails, deliverySteps, serviceAudience } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import styles from "../services.module.css";

export function generateStaticParams() { return services.map(service => ({ slug: service.href.split("/").pop()! })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find(item => item.href.endsWith(`/${slug}`));
  return service ? pageMetadata({ title: service.label, description: service.description ?? "", path: service.href }) : {};
}
export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = services.findIndex(item => item.href.endsWith(`/${slug}`));
  if (index < 0) notFound();
  const service = services[index], detail = serviceDetails[slug];
  const parts = index === 5 ? ["AI Search", "Optimization"] : service.label.split(" & ");
  return <>
    <PageHero title={<>{parts[0]} <em>{parts.length > 1 ? `${index === 5 ? "" : "& "}${parts.slice(1).join(" & ")}` : "by Sash Tech"}</em></>} text={<p>{service.description}</p>} primary={{ label: "Start a project", href: "/contact" }} secondary={{ label: "Explore all services", href: "/services" }} tagline="SASH TECH DIGITAL · CREATIVE SERVICES" visual={{ src: service.visual, kind: serviceVisuals[index], width: 480, height: 480 }} />
    <section className="section theme-paper"><div className="container"><div className={styles.detail}>
      <div><p className={styles.eyebrow}>THE APPROACH / 0{index+1}</p><h2>{detail.heading} <em>{detail.accent}</em></h2><p>{detail.overview}</p><p className={styles.support}>{detail.support}</p></div>
      {index===6 ? <OrbitDiagram/> : <ServiceDiagram index={index} labels={service.tags}/>}
    </div></div></section>
    <section className={`section theme-paper ${styles.capabilities}`}><div className="container">
      <SectionHeader eyebrow="WHAT’S INCLUDED" title={<>Focused capabilities.<br/><em>Professionally delivered.</em></>} text={<p>Specialist work shaped around your brief, audience and the platforms you use.</p>}/>
      <ServiceGrid tone="light" items={service.tags.map((tag,i)=>({ title:tag, text:detail.capabilities[i], tags:detail.deliverables[i] }))}/>
    </div></section>
    <ServiceDeepDive index={index}/>
    <section className="section theme-dark"><div className={`container ${styles.audience}`}><div><p className={styles.eyebrow}>WHO IT’S FOR</p><h2 className="h2">A stronger creative partner for <em>your next chapter.</em></h2><p className={styles.support}>Built for brands, creators, authors, individuals and teams ready to improve their output.</p></div><CheckList columns={[{items:serviceAudience}]}/></div></section>
    <section className="section theme-paper"><div className="container"><SectionHeader eyebrow="OUR PROCESS" title={<>A clear path from<br/><em>brief to delivery.</em></>} text={<p>Five connected stages, with a clear direction and focused review rounds.</p>}/><Process steps={deliverySteps}/></div></section>
    {index===0 && <section className="section theme-dark"><div className="container"><SectionHeader eyebrow="YES, WE BUILT THESE" title={<>A glimpse of the work<br/><em>we’ve shipped.</em></>} text={<p>Web design, responsive development and creative work brought together in one portfolio.</p>}/><CreativeGallery limit={6} category="web"/></div></section>}
    <CtaBanner title={index===5 ? <>Make your expertise <em>discoverable.</em></> : <>Have something <em>in mind?</em></>} text={index===5 ? "Build a clearer, connected presence for the next generation of search. Let’s discuss your GEO strategy." : "Share your goals, references and timeline. We’ll shape a practical scope and a clear creative direction together."} primary={{label:index===5?"Get started with GEO":"Let's talk",href:"/contact"}} secondary={{label:"View our work",href:"/work"}} visual={<BrandVisual kind={index%2===0?"layers":"prism"}/>}/>
    <MotionEngine/>
  </>;
}
