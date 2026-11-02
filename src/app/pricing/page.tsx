import { PageHero } from "@/components/sections/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { BrandVisual } from "@/components/ui/BrandVisual";
import { CheckIcon } from "@/components/sections/CheckList";
import { Process } from "@/components/sections/Process";
import { CardGrid } from "@/components/sections/CardGrid";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { MotionEngine } from "@/components/motion/MotionEngine";
import { PricingPlans } from "@/components/pricing/PricingPlans";
import { comboPackages, pricingSteps, quoteLink } from "@/content/pricing";
import { pageMetadata } from "@/lib/seo";
import styles from "@/components/pricing/Pricing.module.css";

export const metadata = pageMetadata({ title:"Service Pricing & Combo Packages", description:"Explore flexible project quotes for Sash Tech Digital services, with connected creative and digital combo packages.", path:"/pricing" });
const FAQS = [
  { question:"Why do the plans show a custom quote?", answer:"Every project is quoted according to complexity, deliverables, timeline and revision requirements. We confirm the scope and pricing in a proposal before work begins." },
  { question:"How do the 20% and 30% combo savings work?", answer:"The discount is calculated against the combined standalone service fees for the same agreed scope. Your proposal shows that subtotal, the bundle reduction and your final project total. Advertising spend, hosting, software and other third-party costs are excluded." },
  { question:"Can I choose a different combination?", answer:"Yes. Tell us the disciplines and deliverables you need. We will shape a coordinated scope and confirm any applicable bundle pricing in your proposal." },
  { question:"Are revisions and timelines included?", answer:"Your proposal defines the deliverables, milestones and revision requirements. Any work outside the approved scope is discussed and quoted before it is added." },
];
export default function PricingPage() {
 return <>
  <PageHero title={<>The right scope.<br/><em>The right next step.</em></>} text={<p>Choose the service you need. We shape the right scope around your complexity, deliverables, timeline and revision requirements.</p>} primary={{label:"Explore service plans",href:"#service-plans"}} secondary={{label:"See combo packages",href:"#combo-packages"}} tagline="CLEAR SCOPE · CONNECTED DELIVERY · NO HIDDEN FEES" visual={{src:"",kind:"prism",width:480,height:480}}/>
  <section className={styles.promise}><div className="container">{["Clear scope before we start","Deliverables tailored to your brief","Milestones & revisions agreed upfront"].map((s,i)=><span key={s}><b>0{i+1}</b>{s}</span>)}</div></section>
  <section id="service-plans" className={`section theme-paper ${styles.planSection}`}><div className="container">
   <SectionHeader eyebrow="SERVICE OPTIONS" title={<>Flexible pricing for<br/><em>every creative need.</em></>} text={<p>No hidden fees or one-size-fits-all scope. You receive clear deliverables and a timeline before work begins.</p>}/>
   <PricingPlans/>
  </div></section>
  <section id="combo-packages" className={`section theme-dark ${styles.comboSection}`}><div className="container">
   <SectionHeader eyebrow="BETTER TOGETHER" title={<>More connected work.<br/><em>Better bundle value.</em></>} text={<p>Bring complementary services into one brief. Choose a starting combination and we will tailor the deliverables to your business.</p>}/>
   <div className={styles.combos}>{comboPackages.map((p,i)=><article className={styles.combo} data-featured={i===2} key={p.id} data-reveal>
    <div className={styles.comboTop}><span>{p.label}</span><span className={styles.discount}>{p.discount}% OFF</span></div>
    <div className={styles.comboVisual}><BrandVisual kind={p.kind} compact/></div>
    <h3>{p.title}</h3><p>{p.description}</p>
    <ul className={styles.features}>{p.features.map(s=><li key={s}><CheckIcon/><span>{s}</span></li>)}</ul>
    <div className={styles.comboPrice}><span>One tailored proposal.</span><strong>{p.discount}% <em>bundle savings.</em></strong></div>
    <Button href={quoteLink(p.indices,p.id)} variant={i===2?"light":"outline-light"}>Build my combo</Button>
   </article>)}</div>
   <p className={styles.terms}>Savings apply to the equivalent standalone service fees for the same agreed scope. Your proposal shows the itemised subtotal, discount and final total. Media spend and third-party costs are excluded.</p>
  </div></section>
  <section className="section theme-paper"><div className="container"><SectionHeader eyebrow="HOW PRICING WORKS" title={<>Simple, transparent<br/><em>and based on your scope.</em></>} text={<p>A straightforward route from your first idea to an agreed production plan.</p>}/><Process steps={pricingSteps}/></div></section>
  <section className={`section theme-paper ${styles.factors}`}><div className="container"><SectionHeader eyebrow="WHAT SHAPES YOUR QUOTE" title={<>Built around the work.<br/><em>Clear from the start.</em></>}/><CardGrid columns={4} items={[{title:"Complexity",text:"The creative direction, technical requirements and production detail involved."},{title:"Deliverables",text:"The formats, assets, pages or content pieces included in your brief."},{title:"Timeline",text:"The milestones, dependencies and delivery schedule agreed for the project."},{title:"Revisions",text:"Defined review rounds and a clear process for refining the work."}]}/></div></section>
  <Faq items={FAQS} title={<>A little more <em>clarity.</em></>} text="Straight answers about project quotes and combo packages." cta={{label:"Discuss your brief",href:"/contact"}}/>
  <CtaBanner title={<>Not sure where<br/><em>to start?</em></>} text="Share your goals and references. We will help you choose the right services and shape a practical proposal." primary={{label:"Get a tailored quote",href:"/contact"}} secondary={{label:"Explore our services",href:"/services"}} visual={<BrandVisual kind="loop"/>}/>
  <MotionEngine/>
 </>;
}
