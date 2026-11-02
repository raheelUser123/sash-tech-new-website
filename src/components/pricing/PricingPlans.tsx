"use client";

import { useEffect, useState } from "react";
import { ScrollTrigger } from "@/components/motion/gsap";
import { services } from "@/lib/site";
import { pricingGroups, quoteLink } from "@/content/pricing";
import { BrandVisual, serviceVisuals } from "@/components/ui/BrandVisual";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/sections/CheckList";
import { TiltCard } from "@/components/home/TiltCard";
import styles from "./Pricing.module.css";

export function PricingPlans() {
  const [group, setGroup] = useState(0);
  const indices = pricingGroups[group].indices;
  useEffect(() => {
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [group]);
  return <>
    <div className={styles.filters} aria-label="Filter pricing by service">
      {pricingGroups.map((g,i)=><button key={g.label} type="button" aria-pressed={group===i} onClick={()=>setGroup(i)}>{g.label}</button>)}
      <span className={styles.count} aria-live="polite">{indices.length} service{indices.length===1?"":"s"}</span>
    </div>
    <ul className={styles.plans} data-items={indices.length} role="list">
      {indices.map(i=><li key={services[i].href}>
        <TiltCard className={styles.plan}>
          <div className={styles.planTop}><span>0{i+1} / SPECIALIST SERVICE</span><span className={styles.scope}>Tailored scope</span></div>
          <div className={styles.visual}><BrandVisual kind={serviceVisuals[i]} compact/></div>
          <h3>{services[i].label}</h3>
          <p className={styles.description}>{services[i].description}</p>
          <ul className={styles.features}>{services[i].tags.map(tag=><li key={tag}><CheckIcon/><span>{tag}</span></li>)}</ul>
          <div className={styles.price}><span>Custom <em>quote.</em></span><small>Based on your brief, deliverables and timeline.</small></div>
          <Button href={quoteLink([i])} variant="outline-dark">Get a quote</Button>
        </TiltCard>
      </li>)}
    </ul>
  </>;
}
