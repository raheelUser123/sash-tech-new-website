"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Arrow } from "@/components/ui/Button";
import styles from "./ReelsShowcase.module.css";

const REELS = [
  { file: "Show Reel (1) (1).mp4", title: "The showreel", tag: "CREATIVE IN MOTION", poster: "reel-01.jpg" },
  { file: "Movement Meetup reel (1).mp4", title: "Movement, captured", tag: "EVENT HIGHLIGHTS", poster: "reel-02.jpg" },
  { file: "Short3.mp4", title: "A story in seconds", tag: "SHORT-FORM VIDEO", poster: "reel-03.jpg" },
  { file: "Movement Meet-up reel 2 f (1).mp4", title: "Made for the moment", tag: "REELS & STORYTELLING", poster: "reel-04.jpg" },
  { file: "movement meet 3rd reel (1).mp4", title: "Energy in every frame", tag: "EVENT HIGHLIGHTS", poster: "reel-05.jpg" },
];

type Playback = { id: string; muted: boolean; error: boolean };

function SoundIcon({ muted }: { muted: boolean }) {
  return <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4Z" strokeLinejoin="round"/>{muted ? <path d="m16 9 5 6m0-6-5 6" strokeLinecap="round"/> : <><path d="M15 8a6 6 0 0 1 0 8"/><path d="M18 5a10 10 0 0 1 0 14"/></>}</svg>;
}

export function ReelsShowcase() {
  const root = useRef<HTMLElement>(null);
  const active = useRef<HTMLVideoElement | null>(null);
  const sequence = useRef(0);
  const [playback, setPlayback] = useState<Playback | null>(null);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);

  const stop = useCallback(() => {
    sequence.current++;
    if (active.current) {
      active.current.pause();
      active.current.muted = true;
      active.current = null;
    }
    setPlayback(null);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (!entry.isIntersecting) stop();
    }, { threshold: 0.1 });
    observer.observe(el);
    const onVisibility = () => { if (document.hidden) stop(); };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      stop();
    };
  }, [stop]);

  const play = async (video: HTMLVideoElement, id: string) => {
    if (active.current === video && !video.paused) return;
    const run = ++sequence.current;
    if (active.current && active.current !== video) {
      active.current.pause();
      active.current.muted = true;
    }
    active.current = video;
    video.muted = false;
    video.volume = 0.65;
    setPlayback({ id, muted: false, error: false });
    try {
      await video.play();
    } catch {
      if (sequence.current !== run) return;
      // Browsers may require a click before allowing audible playback.
      video.muted = true;
      try {
        await video.play();
        if (sequence.current === run) setPlayback({ id, muted: true, error: false });
      } catch {
        if (sequence.current === run) setPlayback({ id, muted: true, error: true });
      }
    }
    if (active.current !== video) video.pause();
  };

  const videoFor = (el: HTMLElement) => el.closest("[data-reel]")?.querySelector("video");
  const toggle = (el: HTMLElement, id: string) => {
    const video = videoFor(el);
    if (!video) return;
    if (active.current === video && !video.paused) {
      if (!video.muted) { stop(); return; }
      // Keep audible playback inside the tap gesture, including on mobile Safari.
      video.muted = false;
      setPlayback({ id, muted: false, error: false });
      void video.play().catch(() => {
        video.muted = true;
        if (active.current === video) setPlayback({ id, muted: true, error: false });
      });
    } else {
      void play(video, id);
    }
  };

  const sound = (el: HTMLElement, id: string) => {
    const video = videoFor(el);
    if (!video) return;
    if (active.current !== video || video.paused) { void play(video, id); return; }
    video.muted = !video.muted;
    setPlayback({ id, muted: video.muted, error: false });
  };

  return <section ref={root} className={styles.section} aria-labelledby="reels-title">
    <div className={styles.copy}>
      <p className={styles.eyebrow}><span/> VIDEO & MOTION</p>
      <h2 id="reels-title">Made to move.<br/><em>Built to connect.</em></h2>
      <p className={styles.text}>From scroll-stopping reels to polished brand films, we turn your moments and ideas into content people want to watch.</p>
      <Link href="/services/video-production-editing" className={styles.link}>Explore video production <Arrow/></Link>
      <div className={styles.tools}>
        <button type="button" className={styles.marqueeControl} aria-label={paused ? "Resume scrolling reels" : "Pause scrolling reels"} aria-pressed={paused} onClick={() => setPaused(v => !v)}>
          {paused ? <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="m3 1 8 5-8 5Z"/></svg> : <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M2 1h3v10H2zm5 0h3v10H7z"/></svg>}
        </button>
        <span className={styles.hint}>Hover to watch. Tap for sound.</span>
      </div>
    </div>
    <div className={styles.rail}>
      <div className={styles.track} data-running={visible && !paused && !playback}>
        {[0, 1].map(copy => <div key={copy} className={styles.row} aria-hidden={copy === 1 ? true : undefined}>
          {REELS.map((reel, index) => {
            const id = copy + "-" + index, playing = playback?.id === id;
            return <article key={reel.file} data-reel data-playing={playing} className={styles.card}
              onPointerEnter={e => { if (e.pointerType === "mouse") { const video = e.currentTarget.querySelector("video"); if (video) void play(video, id); } }}
              onPointerLeave={e => { if (e.pointerType === "mouse" && active.current === e.currentTarget.querySelector("video")) stop(); }}
              onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget as Node | null) && active.current === e.currentTarget.querySelector("video")) stop(); }}>
              <video src={"/images/reels/" + encodeURIComponent(reel.file)} poster={"/images/reels/posters/" + reel.poster} preload="none" muted loop playsInline aria-hidden="true" disablePictureInPicture/>
              <div className={styles.shade}/>
              <button type="button" className={styles.cardButton} tabIndex={copy === 1 ? -1 : 0} aria-label={(playing && !playback?.muted ? "Pause " : "Play ") + reel.title} onClick={e => toggle(e.currentTarget, id)}>
                <span className={styles.playBadge}>{playing ? <svg width="13" height="13" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M2 1h3v10H2zm5 0h3v10H7z"/></svg> : <svg width="13" height="13" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="m3 1 8 5-8 5Z"/></svg>}</span>
                <span className={styles.caption}><span>{reel.tag}</span><strong>{reel.title}</strong>{playing && playback?.error && <small>Tap to retry</small>}{playing && playback?.muted && !playback.error && <small>Tap for sound</small>}</span>
              </button>
              <button type="button" className={styles.sound} tabIndex={copy === 1 ? -1 : 0} aria-label={(playing && !playback?.muted ? "Mute " : "Unmute ") + reel.title} onClick={e => sound(e.currentTarget, id)}><SoundIcon muted={!playing || !!playback?.muted}/></button>
            </article>;
          })}
        </div>)}
      </div>
    </div>
  </section>;
}
