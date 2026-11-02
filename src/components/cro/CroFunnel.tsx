import { BrandVisual } from "@/components/ui/BrandVisual";
import { TiltVisual } from "@/components/motion/TiltVisual";
import styles from "./CroFunnel.module.css";

/** Closing-banner artwork: the floating 3D conversion funnel. */
export function CroFunnel() {
  return (
    <TiltVisual className={`${styles.funnel}`}>
      <BrandVisual kind="prism" />
    </TiltVisual>
  );
}
