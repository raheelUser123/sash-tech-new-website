"use client";

import { useEffect, useRef } from "react";
import styles from "./HomeHero.module.css";

/** Instanced hexagonal columns rise around the pointer on a lit perspective plane. */
export function HexagonBackground() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const hero = canvas?.parentElement;
    if (!canvas || !hero) return;
    let cancelled = false;
    let dispose = () => {};
    import("three").then((T) => {
      if (cancelled) return;
      let renderer;
      try { renderer = new T.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" }); }
      catch { return; }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);
      const scene = new T.Scene();
      scene.fog = new T.FogExp2(0x080817, 0.035);
      const camera = new T.PerspectiveCamera(38, 1, 0.1, 100);
      camera.position.set(10, 15, 19);
      camera.lookAt(0, 0, 0);
      scene.add(new T.AmbientLight(0x7061bd, 1.2));
      const key = new T.DirectionalLight(0xd3bbff, 3.5);
      key.position.set(-3, 10, 5); scene.add(key);
      const glow = new T.PointLight(0x9860ff, 65, 18);
      glow.position.set(3, 5, 2); scene.add(glow);
      const geometry = new T.CylinderGeometry(0.55, 0.55, 1, 6, 1);
      const material = new T.MeshStandardMaterial({ color: 0xffffff, roughness: 0.32, metalness: 0.48 });
      const columns = 32, rows = 25;
      const mesh = new T.InstancedMesh(geometry, material, columns * rows);
      mesh.instanceMatrix.setUsage(T.DynamicDrawUsage);
      mesh.frustumCulled = false;
      scene.add(mesh);
      const dummy = new T.Object3D();
      const color = new T.Color();
      const dark = new T.Color(0x251144), bright = new T.Color(0xb28aff);
      const tiles = Array.from({length: columns * rows}, (_, i) => {
        const row = Math.floor(i / columns), col = i % columns;
        return { x: (col - columns / 2) * 1.02 + (row % 2) * 0.51, z: (row - rows / 2) * 0.89, h: 0.18 };
      });
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
      const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
      const pointer = new T.Vector2();
      const ray = new T.Raycaster();
      const ground = new T.Plane(new T.Vector3(0, 1, 0), 0);
      const hit = new T.Vector3(3, 0, 0);
      let inside = false, visible = true, frame = 0, last = 0;
      const move = (event: PointerEvent) => {
        if (!fine.matches || reduced.matches) return;
        const box = hero.getBoundingClientRect();
        pointer.set((event.clientX - box.left) / box.width * 2 - 1, -(event.clientY - box.top) / box.height * 2 + 1);
        ray.setFromCamera(pointer, camera);
        inside = !!ray.ray.intersectPlane(ground, hit);
      };
      const leave = () => { inside = false; };
      const draw = (time: number) => {
        frame = 0;
        const delta = Math.min((time - last) / 1000 || 0.016, 0.05); last = time;
        const ease = reduced.matches ? 1 : 1 - Math.exp(-delta * 9);
        tiles.forEach((tile, i) => {
          const distance = Math.hypot(tile.x - hit.x, tile.z - hit.z);
          const influence = inside ? Math.exp(-distance * distance / 5) : 0;
          const idle = 0.25 * Math.exp(-((tile.x - 3) ** 2 + tile.z ** 2) / 22);
          const target = 0.18 + idle + influence * 2.7;
          tile.h += (target - tile.h) * ease;
          dummy.position.set(tile.x, tile.h / 2 - 0.4, tile.z);
          dummy.scale.set(1, tile.h, 1); dummy.updateMatrix();
          mesh.setMatrixAt(i, dummy.matrix);
          color.copy(dark).lerp(bright, Math.min(1, (tile.h - 0.18) / 2.5));
          mesh.setColorAt(i, color);
        });
        mesh.instanceMatrix.needsUpdate = true;
        if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
        renderer.render(scene, camera);
        if (visible && !document.hidden && !reduced.matches) frame = requestAnimationFrame(draw);
      };
      const schedule = () => { if (!frame && visible && !document.hidden) frame = requestAnimationFrame(draw); };
      const resize = () => {
        const box = hero.getBoundingClientRect();
        renderer.setSize(box.width, box.height, false);
        camera.aspect = box.width / Math.max(1, box.height);
        camera.updateProjectionMatrix(); schedule();
      };
      const observer = new ResizeObserver(resize); observer.observe(hero);
      const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) schedule(); else { cancelAnimationFrame(frame); frame = 0; } });
      intersection.observe(hero);
      const visibility = () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else schedule(); };
      const motion = () => { inside = false; schedule(); };
      hero.addEventListener("pointermove", move);
      hero.addEventListener("pointerleave", leave);
      document.addEventListener("visibilitychange", visibility);
      reduced.addEventListener("change", motion);
      resize();
      dispose = () => {
        cancelAnimationFrame(frame); observer.disconnect(); intersection.disconnect();
        hero.removeEventListener("pointermove", move); hero.removeEventListener("pointerleave", leave);
        document.removeEventListener("visibilitychange", visibility); reduced.removeEventListener("change", motion);
        geometry.dispose(); material.dispose(); mesh.dispose(); renderer.dispose();
      };
    }).catch(() => { /* The CSS hero background remains available without WebGL. */ });
    return () => { cancelled = true; dispose(); };
  }, []);
  return <canvas ref={ref} className={styles.scene} aria-hidden="true" />;
}
