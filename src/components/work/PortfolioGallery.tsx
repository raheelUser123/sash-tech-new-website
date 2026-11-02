"use client";

import { useEffect, useState } from "react";
import { portfolioSections } from "@/content/portfolio";
import { ScrollTrigger } from "@/components/motion/gsap";
import { PortfolioGrid } from "./PortfolioGrid";
import styles from "./Portfolio.module.css";

export function PortfolioGallery() {
  const [active, setActive] = useState<Record<string,string>>({});
  useEffect(()=>{
    const frame=requestAnimationFrame(()=>ScrollTrigger.refresh());
    return ()=>cancelAnimationFrame(frame);
  },[active]);
  return <div id="portfolio-sections">
    <nav className={styles.index} aria-label="Portfolio sections"><div className="container"><span>EXPLORE THE WORK</span>{portfolioSections.map(s=><a key={s.id} href={"#"+s.id}>{s.id==="web-design"?"Web UI":s.id==="brand-design"?"Logos & identity":s.id==="illustration"?"Illustration":s.id==="youtube"?"YouTube":s.id==="models"?"3D models":"Motion"}<span aria-hidden="true">↗</span></a>)}</div></nav>
    {portfolioSections.map(section=>{
      const group=section.groups.find(g=>g.id===active[section.id])??section.groups[0];
      return <section id={section.id} className={`${styles.chapter} ${section.tone==="dark"?"theme-dark":"theme-paper"}`} key={section.id} data-portfolio-section={section.id}>
        <div className="container">
          <div className={styles.chapterMeta}><span>0{Number(section.number)} / {section.id==="brand-design"?"BRAND & IDENTITY":section.id==="web-design"?"WEB & INTERFACE":section.id==="models"?"3D & VISUAL DEVELOPMENT":section.id==="youtube"?"YOUTUBE & CONTENT":section.id.toUpperCase()}</span><span>{String(group.items.length).padStart(2,"0")} SELECTED</span></div>
          <div className={styles.chapterHeading}><h2 data-split>{section.title}{" "}<br/><em>{section.accent}</em></h2><p>{section.description}</p></div>
          <div className={styles.collectionBar}>
            {section.groups.length>1 ? <div className={styles.filters} role="group" aria-label={section.id+" collections"}>{section.groups.map(g=><button key={g.id} type="button" aria-pressed={g.id===group.id} aria-controls={section.id+"-collection"} aria-label={g.label+", "+g.items.length+" selected projects"} onClick={()=>setActive(prev=>({...prev,[section.id]:g.id}))}>{g.label}<span>{String(g.items.length).padStart(2,"0")}</span></button>)}</div>
            : <span className={styles.collectionLabel}>{group.label}</span>}
            <p className={styles.result} aria-live="polite">{group.items.length} selected {group.items.length===1?"project":"projects"}</p>
          </div>
          <div id={section.id+"-collection"}><PortfolioGrid key={group.id} items={group.items} layout={group.id==="scenes"?"landscape":"standard"}/></div>
        </div>
      </section>;
    })}
  </div>;
}
