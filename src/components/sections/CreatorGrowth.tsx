"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import styles from "./CreatorGrowth.module.css";

export function CreatorGrowth() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const requestRef = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [needsClick, setNeedsClick] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        requestRef.current += 1;
        video.pause();
      }
    });
    const pauseWhenHidden = () => {
      if (document.hidden) {
        requestRef.current += 1;
        video.pause();
      }
    };
    observer.observe(video);
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", pauseWhenHidden);
      video.pause();
    };
  }, []);

  async function play() {
    const video = videoRef.current;
    if (!video || failed) return;
    const request = ++requestRef.current;
    video.muted = false;
    try {
      await video.play();
      if (request !== requestRef.current) video.pause();
      else setNeedsClick(false);
    } catch {
      if (request === requestRef.current) setNeedsClick(true);
    }
  }

  function pause() {
    requestRef.current += 1;
    videoRef.current?.pause();
  }

  return (
    <section className={`section ${styles.section}`} aria-labelledby="creator-growth-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.content}>
          <p className={styles.eyebrow}><span /> YouTube &amp; creator growth</p>
          <h2 id="creator-growth-title" className={styles.title}>Better videos.<br />Smarter strategy.<br /><em>Real channel growth.</em></h2>
          <p className={styles.description}>Make every view the start of something bigger. We bring sharp edits, scroll-stopping thumbnails and a clear channel strategy together to turn casual viewers into loyal subscribers.</p>
          <ul className={styles.tags} aria-label="Creator services">
            <li>YouTube-ready edits</li><li>Standout thumbnails</li><li>Channel strategy</li>
          </ul>
          <Button href="/contact" variant="dark">Let&apos;s grow your channel</Button>
        </div>
        <figure className={styles.figure}>
          <div className={styles.frame}
            onPointerEnter={(event) => { if (event.pointerType === "mouse") void play(); }}
            onPointerLeave={(event) => { if (event.pointerType === "mouse") pause(); }}>
            <div className={styles.topline}><span className={styles.dot} /> INSIDE THE CREATIVE PROCESS<span className={styles.index}>01 / PLAY</span></div>
            <div className={styles.screen}>
              <video ref={videoRef} className={styles.video} preload="metadata" playsInline controls={playing}
                aria-label="A behind-the-scenes look at our video production process"
                onLoadedMetadata={() => { if (videoRef.current) videoRef.current.currentTime = 0.1; }}
                onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)}
                onError={() => setFailed(true)}>
                <source src="/about-video/video-shot.mp4#t=0.1" type="video/mp4" />
                Your browser does not support embedded video.
              </video>
              {!playing && <button type="button" className={styles.overlay} onClick={() => void play()} disabled={failed} aria-label="Play our creative process video with sound">
                <span className={styles.playIcon}><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg></span>
                <span>{failed ? "Video unavailable" : needsClick ? "Play with sound" : "A little behind the scenes"}</span>
                <span className={styles.hint}>{failed ? "Please try again later" : "Hover to play · Tap to watch with sound"}</span>
              </button>}
            </div>
            <div className={styles.bottomline}><span>Ideas into impact.</span><span className={styles.sound}>{playing ? "SOUND ON" : "PRESS PLAY"}<span aria-hidden="true"> ▂ ▅ ▃ ▇</span></span></div>
          </div>
          <figcaption className={styles.caption}>A captured moment from our process. A glimpse of what we can create for you.</figcaption>
        </figure>
      </div>
    </section>
  );
}
