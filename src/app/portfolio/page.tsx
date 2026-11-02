import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { BrandVisual } from "@/components/ui/BrandVisual";
import { MotionEngine } from "@/components/motion/MotionEngine";
import { PortfolioGallery } from "@/components/work/PortfolioGallery";
import { pageMetadata } from "@/lib/seo";

export const metadata=pageMetadata({title:"Portfolio | Web, Branding, Illustration & Motion",description:"Explore Sash Tech Digital's selected web designs, logo identities, illustrations, YouTube thumbnails, 3D models and animation work.",path:"/portfolio"});
export default function PortfolioPage() {
  return <>
    <PageHero title={<>Different disciplines.<br/><em>Distinctive work.</em></>} text={<p>Web experiences, identities, illustrated worlds and ideas in motion. Explore a considered selection from each creative discipline.</p>} primary={{label:"Explore the portfolio",href:"#portfolio-sections"}} secondary={{label:"Start a project",href:"/contact"}} tagline="WEB UI · BRAND IDENTITY · ILLUSTRATION · CONTENT · 3D · MOTION" visual={{src:"",kind:"layers",width:480,height:480}}/>
    <PortfolioGallery/>
    <CtaBanner title={<>Your next idea.<br/><em>Our next creation.</em></>} text="Tell us what you are building. We will bring the right creative direction and specialist skills to your project." primary={{label:"Let's create something",href:"/contact"}} secondary={{label:"Explore our services",href:"/services"}} visual={<BrandVisual kind="star"/>}/>
    <MotionEngine/>
  </>;
}
