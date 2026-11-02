import { useId } from "react";
import styles from "./BrandVisual.module.css";

export type VisualKind = "cube" | "video" | "growth" | "star" | "atom" | "network" | "orbit" | "prism" | "loop" | "layers";
export const serviceVisuals: VisualKind[] = ["cube", "video", "growth", "star", "atom", "network", "orbit"];
export function visualFromSource(src: string): VisualKind {
  if (src.includes("atom")) return "atom";
  if (src.includes("star")) return "star";
  if (src.includes("funnel")) return "prism";
  if (src.includes("infinity")) return "loop";
  if (src.includes("cube")) return "cube";
  return "orbit";
}

/** Transparent, native artwork. Gradients and edges adapt without a baked background. */
export function BrandVisual({ kind = "cube", compact = false }: { kind?: VisualKind; compact?: boolean }) {
  const id = useId().replace(/:/g, "");
  const face = `url(#${id}-face)`, side = `url(#${id}-side)`, light = `url(#${id}-light)`;
  let artwork: React.ReactNode;
  switch (kind) {
    case "cube":
      artwork = <g className={styles.object}><path d="M240 92 390 178 240 266 90 178Z" fill={light}/><path d="M90 178 240 266V438L90 350Z" fill={face}/><path d="m240 266 150-88v172l-150 88Z" fill={side}/><path d="m90 178 150 88 150-88M240 266v172" fill="none" stroke="#d5c4ff" strokeWidth="1.5"/><path d="m240 92 150 86v172l-150 88L90 350V178Z" fill="none" stroke="#b99aff" strokeWidth="1.5"/><path d="m240 139 70 40-70 41-70-41Z" fill="none" stroke="#fff" opacity=".4"/></g>; break;
    case "video":
      artwork = <g className={styles.object}><rect x="72" y="110" width="336" height="230" rx="24" fill={side} stroke="#ae8cff"/><rect x="86" y="124" width="308" height="198" rx="16" fill={face}/><path d="m212 174 82 49-82 49Z" fill="#eee6ff"/><g className={styles.scan}><rect x="112" y="362" width="256" height="12" rx="6" fill="#b399ff"/><rect x="112" y="386" width="152" height="8" rx="4" fill="#7954f7"/><path d="M291 355v50" stroke="#e9dbff" strokeWidth="3"/></g><circle cx="360" cy="148" r="5" fill="#dfccff"/></g>; break;
    case "growth":
      artwork = <g className={styles.object}><path d="M85 370h320M85 370V112" fill="none" stroke="#9877d8" opacity=".5"/>{[110,185,260,335].map((x,i)=><g key={x} className={styles.bar} style={{animationDelay:`${i*.2}s`}}><path d={`M${x} 365v-${65+i*54}l35-20v${65+i*54}Z`} fill={face}/><path d={`m${x+35} ${280-i*54} 17 10v${65+i*54}l-17 10Z`} fill={side}/></g>)}<path className={styles.draw} d="m96 264 100-70 64 16 120-112m-42 3 43-4-6 45" fill="none" stroke="#c4a6ff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/></g>; break;
    case "star":
      artwork = <g className={styles.object}><path d="M240 62Q265 219 414 246 266 273 240 430 214 273 66 246 214 219 240 62Z" fill={side}/><path d="M230 48Q253 205 402 232 253 259 230 416 204 259 56 232 204 205 230 48Z" fill={face} stroke="#bb96ff" strokeWidth="2"/><path d="M230 116Q252 211 333 232 252 253 230 348 209 253 127 232 209 211 230 116Z" fill="none" stroke="#e2c7ff" strokeWidth="2"/></g>; break;
    case "atom":
      artwork = <g className={styles.object}><g className={styles.rings} fill="none" strokeWidth="10">{[0,60,120].map(a=><ellipse key={a} cx="240" cy="240" rx="184" ry="68" transform={`rotate(${a} 240 240)`} stroke={a===60 ? light : face}/>)}</g><circle cx="240" cy="240" r="48" fill={light}/><circle className={styles.satellite} cx="404" cy="240" r="10" fill="#e8d4ff"/></g>; break;
    case "network":
      artwork = <g className={styles.object}><g stroke="#9c78f0" strokeWidth="2" fill="none"><path className={styles.draw} d="m100 130 140 110 140-110M100 350l140-110 140 110M240 68v172h172M240 240v172H68"/></g>{[[100,130],[380,130],[100,350],[380,350],[240,68],[412,240],[240,412],[68,240]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r={i<4?24:13} fill={face} stroke="#c5aaff"/>)}<path d="m240 178 54 31v62l-54 31-54-31v-62Z" fill={light} stroke="#e0cdff"/><path d="m218 241 15 15 29-32" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round"/></g>; break;
    case "prism":
      artwork = <g className={styles.object}>{[0,1,2,3].map((n)=><g key={n} className={styles.bar} style={{animationDelay:`${n*.22}s`}}><path d={`M${70+n*38} ${112+n*72} 240 ${56+n*90} ${410-n*38} ${112+n*72} 240 ${184+n*54}Z`} fill={n%2?side:face} stroke="#bd9bff" strokeWidth="1.5"/></g>)}</g>; break;
    case "loop":
      artwork = <g className={styles.object}><path d="M240 240C130 65 30 137 76 262c37 102 123 47 164-22C350 65 450 137 404 262c-37 102-123 47-164-22Z" fill="none" stroke={side} strokeWidth="50" strokeLinecap="round" transform="translate(0 15)"/><path className={styles.draw} d="M240 240C130 65 30 137 76 262c37 102 123 47 164-22C350 65 450 137 404 262c-37 102-123 47-164-22Z" fill="none" stroke={light} strokeWidth="36" strokeLinecap="round"/></g>; break;
    case "layers":
      artwork = <g className={styles.object}>{[2,1,0].map(n=><g key={n} className={styles.bar} style={{animationDelay:`${n*.3}s`}}><path d={`M70 ${170+n*70} 240 ${72+n*70} 410 ${170+n*70} 240 ${270+n*70}Z`} fill={n===0?light:side} stroke="#bba1ff" strokeWidth="2"/></g>)}</g>; break;
    default:
      artwork = <g className={styles.object}><g fill="none" stroke="#9c79e7"><circle cx="240" cy="240" r="180" opacity=".4"/><circle cx="240" cy="240" r="128" opacity=".7"/><ellipse cx="240" cy="240" rx="196" ry="74" transform="rotate(-28 240 240)" strokeWidth="2"/></g><circle cx="240" cy="240" r="78" fill={light}/><g className={styles.rings}><circle cx="240" cy="60" r="19" fill={face}/><circle cx="240" cy="368" r="12" fill="#d8bbff"/><circle cx="70" cy="240" r="9" fill="#7954f7"/></g></g>;
  }
  return <div className={styles.stage} data-compact={compact} aria-hidden="true"><svg viewBox="0 0 480 480" className={styles.art}><defs><linearGradient id={`${id}-face`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#c79cff"/><stop offset=".45" stopColor="#7954f7"/><stop offset="1" stopColor="#482c99"/></linearGradient><linearGradient id={`${id}-side`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#6744be"/><stop offset="1" stopColor="#28164e"/></linearGradient><radialGradient id={`${id}-light`} cx=".3" cy=".2" r=".9"><stop stopColor="#efe2ff"/><stop offset=".35" stopColor="#b48bff"/><stop offset=".7" stopColor="#7954f7"/><stop offset="1" stopColor="#392166"/></radialGradient></defs>{artwork}</svg></div>;
}
