"use client";

import { useEffect, useState } from "react";
import { ScrollTrigger } from "@/components/motion/gsap";
import { BrandVisual } from "@/components/ui/BrandVisual";
import styles from "./ServiceDeepDive.module.css";

const COPY = [
  { eyebrow:"BEFORE YOUR WEBSITE GOES LIVE", title:"The details behind", accent:"a better launch.", text:"A polished launch is more than a finished homepage. We connect your design with the checks that make the experience usable, discoverable and easier to maintain." },
  { eyebrow:"INSIDE THE EDIT", title:"Every cut needs", accent:"a reason to stay.", text:"We build the edit around the story first, then use sound, color and finishing to support it. Explore the layers that turn raw footage into a coherent final piece." },
  { eyebrow:"A CHANNEL WITH A POINT OF VIEW", title:"Build a reason", accent:"to come back.", text:"Channel growth starts with a clear promise to your audience. We connect discoverable topics, consistent formats and recognisable visuals so each upload belongs to a bigger content system." },
  { eyebrow:"A WORLD OF YOUR OWN", title:"From a loose idea", accent:"to a visual language.", text:"The strongest artwork feels connected, whether it appears on a book cover, a character sheet or a campaign. We establish the mood, shapes, palette and details before taking the concept into final production." },
  { eyebrow:"MOTION WITH INTENT", title:"Choose how your", accent:"idea moves.", text:"A looping social asset, a dimensional product and a brand transition need different timing and construction. We match the motion style to the message, the format and the place it will be seen." },
  { eyebrow:"MAKE YOUR EXPERTISE UNDERSTANDABLE", title:"Connect the facts.", accent:"Strengthen the answer.", text:"AI search systems need clear information about your business and credible support for its claims. We organise that information into an accessible, connected knowledge structure." },
  { eyebrow:"FROM CAMPAIGN TO LEARNING", title:"A better next move", accent:"starts with the last one.", text:"Paid acquisition and creative should keep informing each other. We build a practical feedback loop that connects the audience, the message, the campaign and the next set of decisions." },
];

const EDITS = [
  { title:"Story & pacing", text:"We identify the strongest moments, remove distractions and shape a beginning, middle and payoff. The edit is built around what the viewer needs to understand and feel.", label:"STORY", bars:[45,80,60,95,40,75,55,90] },
  { title:"Sound & rhythm", text:"Dialogue, music and sound effects are balanced to support the story. We work with the rhythm of the footage so transitions feel intentional and the message stays clear.", label:"SOUND", bars:[20,60,90,35,80,45,95,30] },
  { title:"Color & delivery", text:"We bring color, framing, captions and export requirements together. The final files are prepared for the agreed platform, aspect ratio and delivery format.", label:"FINISH", bars:[70,70,70,70,70,70,70,70] },
];
const MOTION = [
  { label:"2D loops", kind:"star" as const, text:"Expressive, lightweight sequences for explainers, social posts and repeated motion. We define the visual style, key moments and loop behaviour before production." },
  { label:"3D product", kind:"cube" as const, text:"Dimensional forms, considered materials and controlled lighting for digital product presentations. Motion is shaped around the features and details that matter." },
  { label:"Brand motion", kind:"layers" as const, text:"Transitions, graphic systems and branded GIFs that bring your visual identity into movement. Timing and consistency keep every touchpoint connected." },
];

export function ServiceDeepDive({ index }: { index: number }) {
  const [active, setActive] = useState(0);
  const copy = COPY[index];
  useEffect(() => {
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [index, active]);
  return <section className={`section theme-paper ${styles.section}`} data-service-detail={index}>
    <div className={`container ${styles.layout}`}>
      <div className={styles.copy}><p className={styles.eyebrow}>{copy.eyebrow}</p><h2 className="h2">{copy.title}<br/><em>{copy.accent}</em></h2><p>{copy.text}</p>
      {index===1 && <div className={styles.tabs} aria-label="Explore editing stages">{EDITS.map((s,i)=><button type="button" key={s.label} aria-pressed={active===i} onClick={()=>setActive(i)}>{s.title}</button>)}</div>}
      {index===4 && <div className={styles.tabs} aria-label="Explore motion styles">{MOTION.map((s,i)=><button type="button" key={s.label} aria-pressed={active===i} onClick={()=>setActive(i)}>{s.label}</button>)}</div>}
      </div>
      <div className={styles.visual}>
      {index===0 && <div className={styles.audit}><div className={styles.panelHead}>THE LAUNCH CHECKLIST <span>01—06</span></div>{[
        ["Navigation & structure","Clear routes through the content, with a hierarchy that helps visitors find the right next step."],
        ["Responsive layouts","Thoughtful spacing, readable type and usable controls across the agreed screen sizes."],
        ["Speed & assets","Appropriate image formats, lean page assets and attention to loading behaviour."],
        ["Technical SEO","Page titles, metadata, indexability and the structure search engines need to understand the site."],
        ["Forms & journeys","Working enquiries, useful validation and consistent calls to action."],
        ["Handover & maintenance","Organised delivery and practical guidance for keeping the site up to date."],
      ].map(([title,text],i)=><details key={title} open={i===0} onToggle={() => requestAnimationFrame(() => ScrollTrigger.refresh())}><summary><b>0{i+1}</b>{title}<span>+</span></summary><p>{text}</p></details>)}</div>}
      {index===1 && <div className={styles.editPanel}><div className={styles.panelHead}>THE EDITING DESK <span>{EDITS[active].label}</span></div><div className={styles.editScreen}><span>{String(active+1).padStart(2,"0")}</span><strong>{EDITS[active].title}</strong></div><div className={styles.wave}>{EDITS[active].bars.map((h,i)=><i key={i} style={{height:h+"%",animationDelay:i*.1+"s"}}/>)}</div><p className={styles.note} aria-live="polite">{EDITS[active].text}</p></div>}
      {index===2 && <div className={styles.pillars}>{[
        ["01","Be discovered","Plan topics around the questions, interests and language of your niche. Align titles, descriptions and thumbnails with the promise of the video.","TOPICS / SEO / POSITIONING"],
        ["02","Be recognised","Build recurring formats and a consistent visual identity so viewers understand what your channel offers before they press play.","FORMATS / THUMBNAILS / IDENTITY"],
        ["03","Be remembered","Use audience response and available channel insights to refine the next upload. Consistency comes from an achievable plan and a repeatable process.","LEARNING / CONSISTENCY / NEXT STEPS"],
      ].map(([n,title,text,tag])=><article key={n}><span>{n}</span><div><h3>{title}</h3><p>{text}</p><small>{tag}</small></div></article>)}</div>}
      {index===3 && <div className={styles.artPanel}><div className={styles.book}><small>ART DIRECTION / CONCEPT</small><div className={styles.bookShape}/><strong>A WORLD<br/>OF YOUR<br/><em>OWN.</em></strong><span>Stories, shaped visually.</span></div><div className={styles.artNotes}><p>One direction.<br/><strong>Many expressions.</strong></p><div className={styles.swatches}>{["#24153e","#7954f7","#bd9be9","#e8d9ff","#f9f5ff"].map(c=><i key={c} style={{background:c}}/>)}</div><ul><li>Mood & references</li><li>Shape & composition</li><li>Palette & texture</li><li>Character & expression</li></ul><small>Every direction is developed around your story and intended use.</small></div></div>}
      {index===4 && <div className={styles.motion}><div className={styles.panelHead}>THE MOTION LAB <span>{MOTION[active].label}</span></div><div className={styles.motionStage} key={active}><BrandVisual kind={MOTION[active].kind}/><span className={styles.axis}/></div><p className={styles.note} aria-live="polite">{MOTION[active].text}</p></div>}
      {index===5 && <div className={styles.knowledge}><div className={styles.query}>What should your brand be known for? <span>↗</span></div>{[
        ["01 / ENTITY","Make the business clear","Connect the business name, services, people and relevant structured data so the facts are consistent."],
        ["02 / EVIDENCE","Support the expertise","Strengthen the references, citations and content that explain why your business is a credible source."],
        ["03 / INTENT","Answer real questions","Organise natural-language content around specific audience needs, with direct answers and useful context."],
      ].map(([tag,title,text])=><article key={tag}><small>{tag}</small><h3>{title}</h3><p>{text}</p></article>)}</div>}
      {index===6 && <div className={styles.campaign}><div className={styles.panelHead}>A CONNECTED CAMPAIGN LOOP <span>PLAN → LEARN</span></div><div className={styles.campaignGrid}>{[
        ["01","Audience","Who needs the message?","Define the audience, its context and the action the campaign is designed to support."],
        ["02","Creative","What makes it relevant?","Align the offer, copy and visuals, then prepare purposeful variations for testing."],
        ["03","Activation","Where does it belong?","Connect the campaign with appropriate channels, landing pages and conversion paths."],
        ["04","Learning","What changes next?","Review the available results, document useful findings and prioritise the next creative or targeting change."],
      ].map(([n,title,question,text])=><article key={n} tabIndex={0}><span>{n}</span><h3>{title}</h3><strong>{question}</strong><p>{text}</p></article>)}</div></div>}
      </div>
    </div>
  </section>;
}
