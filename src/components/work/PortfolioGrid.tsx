"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "@/components/motion/SmoothScroll";
import type { PortfolioItem } from "@/content/portfolio";
import styles from "./Portfolio.module.css";

function ExpandIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M14 4h6v6M20 4l-7 7M10 20H4v-6M4 20l7-7" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function PortfolioViewer({ items, index, onChange, onClose }: { items: PortfolioItem[]; index: number; onChange: (i:number)=>void; onClose: ()=>void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const [failed, setFailed] = useState<string | null>(null);
  const item = items[index];
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const previous = document.activeElement;
    dialog.showModal();
    lenis?.stop();
    return () => {
      dialog.close();
      lenis?.start();
      if (previous instanceof HTMLElement && previous.isConnected) previous.focus({preventScroll:true});
    };
  }, [lenis]);
  useEffect(() => { body.current?.scrollTo(0, 0); }, [item.id]);
  const previous = () => onChange((index - 1 + items.length) % items.length);
  const next = () => onChange((index + 1) % items.length);
  return <dialog ref={ref} className={styles.viewer} aria-labelledby="portfolio-viewer-title" data-lenis-prevent
    onCancel={e=>{e.preventDefault();onClose();}}
    onClick={e=>{if(e.target===e.currentTarget)onClose();}}
    onKeyDown={e=>{if(e.target instanceof HTMLVideoElement)return;if(e.key==="ArrowLeft"){e.preventDefault();previous();}if(e.key==="ArrowRight"){e.preventDefault();next();}}}>
    <div className={styles.viewerPanel}>
      <div className={styles.viewerHeader}><div><span>SELECTED WORK / {String(index+1).padStart(2,"0")} OF {String(items.length).padStart(2,"0")}</span><h2 id="portfolio-viewer-title">{item.title}</h2></div><button type="button" onClick={onClose} aria-label="Close project preview" className={styles.close}>×</button></div>
      <div ref={body} className={styles.viewerBody} data-kind={item.kind} data-lenis-prevent>
        {item.medium==="video" ? <><video key={item.id} className={styles.viewerVideo} src={item.src} poster={item.poster} controls autoPlay playsInline preload="metadata" onError={()=>setFailed(item.id)}/>{failed===item.id&&<p className={styles.videoError}>This browser cannot play the preview. You can open the original file below.</p>}</>
        : <Image key={item.id} className={styles.viewerImage} src={item.src} alt={item.title} width={item.width} height={item.height} sizes="(min-width: 1200px) 1000px, 92vw" unoptimized={item.medium==="gif"}/>}
      </div>
      <div className={styles.viewerFooter}><div><button type="button" onClick={previous} aria-label="Previous project">←</button><button type="button" onClick={next} aria-label="Next project">→</button></div><a href={item.src} target="_blank" rel="noopener noreferrer">Open original <span aria-hidden="true">↗</span></a></div>
    </div>
  </dialog>;
}

export function PortfolioGrid({ items, layout = "standard" }: { items: PortfolioItem[]; layout?: "standard" | "landscape" | "mixed" }) {
  const [selected, setSelected] = useState<number | null>(null);
  return <>
    <div className={[styles.grid, layout !== "standard" ? styles[layout] : undefined].filter(Boolean).join(" ")} data-items={items.length}>
      {items.map((item,i)=><article key={item.id} className={styles.card} data-kind={item.kind}>
        {item.kind==="web" ? <div className={styles.browser} style={{"--web-duration":Math.min(20,Math.max(8,item.height/item.width*2.5))+"s"} as React.CSSProperties}>
          <div className={styles.browserBar}><span className={styles.browserDots}><i/><i/><i/></span><span>DESIGN / {String(i+1).padStart(2,"0")}</span><button type="button" onClick={()=>setSelected(i)} aria-label={"Expand "+item.title}><ExpandIcon/></button></div>
          <div className={styles.webViewport} tabIndex={0} role="region" aria-label={item.title+" full-page preview. Hover to scroll, or scroll inside on touch screens."} data-lenis-prevent>
            <Image src={item.src} alt={item.title+" full website layout"} width={item.width} height={item.height} quality={85} sizes="(min-width: 1100px) 30vw, (min-width: 650px) 45vw, 90vw" className={styles.webImage}/>
          </div><span className={styles.webHint}><span className={styles.hoverHint}>Hover to explore the page</span><span className={styles.touchHint}>Swipe inside to explore</span><span aria-hidden="true">↓</span></span>
        </div> : <div className={styles.media}>
          <button type="button" className={styles.mediaButton} onClick={()=>setSelected(i)} aria-label={(item.medium==="video"||item.medium==="gif"?"Play ":"View ")+item.title}>
            <Image src={item.poster ?? item.src} alt={item.title} fill sizes="(min-width: 1100px) 30vw, (min-width: 650px) 45vw, 90vw" className={styles.art}/>
            {item.medium!=="image"&&<span className={styles.play} aria-hidden="true">▶</span>}
            <span className={styles.expand}><ExpandIcon/></span>
          </button>
        </div>}
        <div className={styles.caption}><div><p>{item.kind==="web"?"WEB DESIGN":item.kind==="logo"?"LOGO & IDENTITY":item.kind==="thumbnail"?"YOUTUBE THUMBNAIL":item.kind==="model"?"3D MODELLING":item.kind==="motion"?item.medium==="gif"?"ANIMATED ART":"2D ANIMATION":"ILLUSTRATION"}</p><h3>{item.title}</h3></div><span>{String(i+1).padStart(2,"0")}</span></div>
      </article>)}
    </div>
    {selected!==null&&<PortfolioViewer items={items} index={selected} onChange={setSelected} onClose={()=>setSelected(null)}/>}
  </>;
}
