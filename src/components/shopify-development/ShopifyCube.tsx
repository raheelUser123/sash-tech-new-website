import { BrandVisual } from "@/components/ui/BrandVisual";
import { TiltVisual } from "@/components/motion/TiltVisual";
import styles from "./ShopifyCube.module.css";

/** Closing-banner artwork: the same floating 3D cube as the hero. */
export function ShopifyCube() {
  return (
    <TiltVisual className={`${styles.cube}`}>
      <BrandVisual kind="layers" />
    </TiltVisual>
  );
}
