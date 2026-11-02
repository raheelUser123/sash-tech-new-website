import styles from "./ServiceDiagram.module.css";

export function ServiceDiagram({ index, labels }: { index: number; labels: string[] }) {
  const titles = ["Built for every screen", "From raw to remarkable", "A channel with direction", "An idea takes shape", "Made to move", "Connected. Cited. Found.", "Every channel, one plan"];
  return <div className={styles.board} data-kind={index} data-reveal>
    <div className={styles.header}><span className={styles.light}/><span>{titles[index]}</span><span className={styles.index}>0{index+1} / STUDIO</span></div>
    <div className={styles.canvas}>
      {index===0 ? <div className={styles.browser}><div className={styles.toolbar}><i/><i/><i/><span>sashtech / digital experience</span></div><div className={styles.browserBody}><div><small>DESIGNED TO PERFORM</small><strong>A better<br/>first impression.</strong><span className={styles.mockButton}>Explore the experience ↗</span></div><div className={styles.tile}/></div><div className={styles.phone}><span/><i/><i/><b/></div></div>
      : index===1 ? <><div className={styles.player}><span>▶</span><small>STORY / MOTION / SOUND</small></div><div className={styles.timeline}>{[1,2,3,4,5,6,7,8,9,10,11,12].map(n=><i key={n} style={{height:`${20+n%5*9}px`}}/>)}</div></>
      : index===2 ? <div className={styles.creator}><div className={styles.thumb}>YOUR<br/><em>NEXT CHAPTER.</em><span>▶</span></div><div className={styles.graph}>{[24,35,32,50,62,85,100].map((n,i)=><i key={i} style={{height:`${n}%`}}/>)}</div><small>POSITION → PUBLISH → LEARN → GROW</small></div>
      : index===3 ? <div className={styles.artwork}><div/><div/><div/><span>CONCEPT<br/><b>TO CHARACTER.</b></span><i/></div>
      : index===4 ? <div className={styles.frames}>{["01 / CONCEPT","02 / FORM","03 / MOTION"].map((s,i)=><div key={s}><span className={styles.model} style={{borderRadius:i===0?"4px":i===1?"30%":"50%",animationDelay:`${i*.4}s`}}/><small>{s}</small></div>)}</div>
      : index===5 ? <div className={styles.search}><div className={styles.query}>How can your brand become the answer? <span>↗</span></div><div className={styles.answer}><small>CONNECTED KNOWLEDGE</small><strong>Your expertise.<br/>Clearly understood.</strong><p>Structure → Context → Authority</p><div>{["Entities","Citations","Intent"].map(s=><span key={s}>{s} ✓</span>)}</div></div></div>
      : <div className={styles.channels}><span className={styles.hub}>ONE<br/>STRATEGY</span>{["Creative","Acquisition","Retention","Reporting"].map((s,i)=><span key={s} className={styles.channel} style={{"--i":i} as React.CSSProperties}>{s}</span>)}</div>}
    </div>
    <div className={styles.legend}>{labels.map((s,i)=><span key={s}><b>0{i+1}</b>{s}</span>)}</div>
  </div>;
}
