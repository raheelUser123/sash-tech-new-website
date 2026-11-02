import { PageHero } from "@/components/sections/PageHero";
import { MotionEngine } from "@/components/motion/MotionEngine";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { services } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Creative Services", description: "Explore Sash Tech Digital's design, video, animation, web, search and marketing services.", path: "/services" });
export default function ServicesPage() {
 return <>
  <PageHero title={<>Creative services for <em>ambitious ideas.</em></>} text={<p>From the first concept to the final launch, we combine design, production and digital strategy to help you stand out.</p>} primary={{label:"Start a project",href:"/contact"}} tagline="CREATE · BUILD · GROW" visual={{src:"",kind:"layers",width:480,height:480}}/>
  <section className="section theme-paper"><div className="container"><SectionHeader eyebrow="OUR EXPERTISE" title={<>Different disciplines.<br/><em>One creative direction.</em></>} text={<p>Explore the specialist support behind stronger brands, better content and digital experiences that perform.</p>}/><ServiceGrid tone="light" items={services.map(s=>({title:s.label,text:s.description,tags:s.tags,href:s.href}))}/></div></section>
  <CtaBanner title={<>Let’s find your <em>next move.</em></>} text="Tell us what you need. We’ll bring the right creative, production and digital expertise to your project." primary={{label:"Discuss your project",href:"/contact"}}/>
  <MotionEngine/>
 </>;
}
