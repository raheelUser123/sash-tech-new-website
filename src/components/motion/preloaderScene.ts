export const PRELOADER_LOGO = "/images/sashtech/newimages/LET'S WORK TOGETHER section bottom.webp";

export type PreloaderScene = {
  setProgress: (p: number) => void;
  setPointer: (nx: number, ny: number) => void;
  uniforms: { uGather: { value: number }; uBurst: { value: number } };
  destroy: () => void;
};

/** Draw the real brand artwork as drifting points without requiring WebGL. */
export async function createPreloaderScene(canvas: HTMLCanvasElement): Promise<PreloaderScene | null> {
  const image = new Image();
  image.src = PRELOADER_LOGO;
  await image.decode();
  const mask = document.createElement("canvas");
  mask.width = 480;
  mask.height = Math.round(480 * image.naturalHeight / image.naturalWidth);
  const sample = mask.getContext("2d", { willReadFrequently: true });
  const ctx = canvas.getContext("2d");
  if (!sample || !ctx) return null;
  sample.drawImage(image, 0, 0, mask.width, mask.height);
  const pixels = sample.getImageData(0, 0, mask.width, mask.height).data;
  const solid: number[] = [];
  const occupied = new Uint8Array(mask.width * mask.height);
  let left = mask.width, right = 0, top = mask.height, bottom = 0;
  for (let i = 0; i < pixels.length; i += 4) {
    // Use transparency for the silhouette, never the shading inside the artwork.
    if (pixels[i + 3] < 128) continue;
    const index = i / 4, x = index % mask.width, y = Math.floor(index / mask.width);
    solid.push(index);
    occupied[index] = 1;
    left = Math.min(left, x); right = Math.max(right, x);
    top = Math.min(top, y); bottom = Math.max(bottom, y);
  }
  if (!solid.length) return null;
  const logoHeight = Math.max(1, bottom - top);
  const count = window.innerWidth < 768 ? 6500 : 14500;
  const points = Array.from({ length: count }, (_, n) => {
    const i = solid[Math.floor(((n * 0.61803398875) % 1) * solid.length)];
    const ambient = n > count * 0.97;
    const angle = Math.random() * Math.PI * 2;
    const radius = 0.6 + Math.random() * 1.3;
    return {
      x: ((i % mask.width) - (left + right) / 2) / logoHeight,
      y: (Math.floor(i / mask.width) - (top + bottom) / 2) / logoHeight,
      sx: Math.cos(angle) * radius,
      sy: Math.sin(angle) * radius,
      depth: (Math.random() - 0.5) * 0.25,
      phase: Math.random() * Math.PI * 2,
      size: 0.6 + Math.random() * 0.45,
      // Sample highlights from the supplied purple/blue artwork.
      color: ambient ? 0 : 1 + Math.min(3, Math.floor((pixels[i * 4] * 0.3 + pixels[i * 4 + 1] * 0.45 + pixels[i * 4 + 2] * 0.25) / 48)),
      ambient,
      outline: false,
    };
  });
  // Follow closed alpha contours, smooth pixel stair steps, then sample by distance.
  // This keeps spacing even and discards tiny specks instead of outlining texture.
  type Vertex = { x: number; y: number };
  const edges = new Map<string, Vertex[]>();
  const key = (x: number, y: number) => x + ":" + y;
  const edge = (x: number, y: number, nx: number, ny: number) => {
    const k = key(x, y);
    const list = edges.get(k) ?? [];
    list.push({ x: nx, y: ny });
    edges.set(k, list);
  };
  for (const i of solid) {
    const x = i % mask.width, y = Math.floor(i / mask.width);
    if (y === 0 || !occupied[i - mask.width]) edge(x, y, x + 1, y);
    if (x === mask.width - 1 || !occupied[i + 1]) edge(x + 1, y, x + 1, y + 1);
    if (y === mask.height - 1 || !occupied[i + mask.width]) edge(x + 1, y + 1, x, y + 1);
    if (x === 0 || !occupied[i - 1]) edge(x, y + 1, x, y);
  }
  while (edges.size) {
    const first = edges.keys().next().value!;
    const [x, y] = first.split(":").map(Number);
    const contour: Vertex[] = [];
    let v = { x, y };
    for (let guard = 0; guard < mask.width * mask.height * 4; guard++) {
      contour.push(v);
      const k = key(v.x, v.y), list = edges.get(k);
      if (!list?.length) break;
      const next = list.pop()!;
      if (!list.length) edges.delete(k);
      v = next;
      if (key(v.x, v.y) === first) break;
    }
    if (contour.length < 60) continue;
    const smooth = contour.map((_, i) => {
      const v = { x: 0, y: 0 };
      for (let j = -2; j <= 2; j++) {
        const p = contour[(i + j + contour.length) % contour.length];
        v.x += p.x / 5;
        v.y += p.y / 5;
      }
      return v;
    });
    let remaining = 0;
    for (let i = 0; i < smooth.length; i++) {
      const a = smooth[i], b = smooth[(i + 1) % smooth.length];
      const length = Math.hypot(b.x - a.x, b.y - a.y);
      if (!length) continue;
      let distance = remaining;
      while (distance < length) {
        const x = a.x + (b.x - a.x) * distance / length;
        const y = a.y + (b.y - a.y) * distance / length;
        const angle = Math.atan2(y - (top + bottom) / 2, x - (left + right) / 2);
        points.push({
          x: (x - (left + right) / 2) / logoHeight,
          y: (y - (top + bottom) / 2) / logoHeight,
          sx: Math.cos(angle) * 1.2,
          sy: Math.sin(angle) * 1.2,
          depth: 0, phase: 0, size: 0.7, color: 5,
          ambient: false, outline: true,
        });
        distance += 2.8;
      }
      remaining = distance - length;
    }
  }
  const palette = ["rgba(121,84,247,.12)", "rgba(100,35,205,.8)", "rgba(127,0,255,.9)", "rgba(174,110,255,.95)", "rgba(222,190,255,1)", "rgba(127,0,255,.65)"];
  const uniforms = { uGather: { value: 0 }, uBurst: { value: 0 } };
  let width = 1, height = 1, dpr = 1, raf = 0, progress = 0;
  let pointerX = 0, pointerY = 0;
  const started = performance.now();
  const resize = () => {
    width = window.innerWidth; height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener("resize", resize);
  const frame = (now: number) => {
    const elapsed = (now - started) / 1000;
    const t = elapsed * 0.65;
    // Time guarantees a recognisable logo even if network progress stalls.
    const morph = Math.min(1, elapsed / 1.65);
    const ease = 1 - Math.pow(1 - morph, 3);
    const size = Math.min(height * 0.54, width * 0.64, 500);
    const burst = uniforms.uBurst.value;
    ctx.clearRect(0, 0, width, height);
    ctx.globalAlpha = 1 - Math.max(0, (burst - 0.5) * 2);
    for (let bin = 0; bin < palette.length; bin++) {
      ctx.fillStyle = palette[bin];
      ctx.beginPath();
      for (const p of points) {
        if (p.color !== bin) continue;
        const drift = (p.outline ? 0 : 1) * (1 - uniforms.uGather.value * 0.8) * (0.0015 + (1 - progress) * 0.002);
        let x = p.ambient ? p.sx * width * 0.4 : (p.sx * (1 - ease) + p.x * ease) * size;
        let y = p.ambient ? p.sy * height * 0.45 : (p.sy * (1 - ease) + p.y * ease) * size;
        x += Math.sin(t + p.phase) * size * drift + p.depth * pointerX * 18;
        y += Math.cos(t * 0.8 + p.phase) * size * drift + p.depth * pointerY * 14;
        x += p.sx * burst * burst * width;
        y += p.sy * burst * burst * height;
        const r = p.size * (p.ambient ? 0.65 : 1);
        if (p.outline) {
          const radius = r * Math.min(1.25, Math.max(0.75, size / 400));
          const px = width / 2 + x, py = height * 0.48 + y;
          ctx.moveTo(px + radius, py);
          ctx.arc(px, py, radius, 0, Math.PI * 2);
        } else {
          const px = width / 2 + x, py = height * 0.48 + y;
          ctx.moveTo(px + r, py);
          ctx.arc(px, py, r, 0, Math.PI * 2);
        }
      }
      ctx.fill();
    }
    raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);
  return {
    uniforms,
    setProgress: p => { progress = Math.min(1, Math.max(0, p)); },
    setPointer: (x, y) => { pointerX = x; pointerY = y; },
    destroy() { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); ctx.clearRect(0, 0, width, height); },
  };
}
