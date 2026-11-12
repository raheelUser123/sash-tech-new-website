"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type Turnstile = {
  render: (element: HTMLElement, options: Record<string, unknown>) => string;
  remove: (id: string) => void;
  reset: (id: string) => void;
};

declare global { interface Window { turnstile?: Turnstile } }

export function FormCaptcha() {
  const container = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();

  useEffect(() => {
    const api = window.turnstile;
    const element = container.current;
    if (!ready || !api || !element || !sitekey) return;
    const id = api.render(element, {
      sitekey, action: "website-form", theme: "auto", size: "flexible",
      callback: () => setError(""),
      "error-callback": () => { setError("Security check failed to load. Please refresh or contact us directly."); return true; },
      "expired-callback": () => { api.reset(id); },
    });
    const form = element.closest("form");
    const reset = () => api.reset(id);
    form?.addEventListener("captcha-reset", reset);
    return () => { form?.removeEventListener("captcha-reset", reset); api.remove(id); };
  }, [ready, sitekey]);

  return <div style={{ gridColumn: "1 / -1", width: "100%", minWidth: 0, marginBlock: 12 }}>
    {sitekey ? <>
      <Script id="turnstile-api" src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" onReady={() => setReady(true)} onError={() => setError("Security check unavailable. Please refresh or contact us directly.")} />
      <div ref={container} />
    </> : <p role="status">Online submissions are temporarily unavailable. Please contact us directly.</p>}
    {error && <p role="alert">{error}</p>}
  </div>;
}
