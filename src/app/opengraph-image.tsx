import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: Creative design, animation and digital growth`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", color: "#fff", background: "radial-gradient(70% 90% at 92% 0%, rgba(108,76,255,0.75) 0%, rgba(243,89,193,0.3) 35%, #050816 75%)" }}>
      <span style={{ fontSize: 32, fontWeight: 700 }}>SASH TECH DIGITAL</span>
      <div style={{ display: "flex", flexDirection: "column" }}><span style={{ fontSize: 22, color: "#c7b8ef", marginBottom: 20 }}>CREATIVE · STRATEGY · GROWTH</span><span style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05 }}>Design that speaks.</span><span style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05 }}>Strategy that grows.</span></div>
    </div>,
    size,
  );
}
