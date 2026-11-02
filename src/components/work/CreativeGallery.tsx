import { featuredPortfolio, portfolioSections } from "@/content/portfolio";
import { PortfolioGrid } from "./PortfolioGrid";

export function CreativeGallery({ limit=6, category }: { limit?: number; category?: "web" }) {
  const items=category==="web"?portfolioSections[0].groups[0].items:featuredPortfolio;
  return <PortfolioGrid items={items.slice(0,limit)} layout={category==="web"?"standard":"mixed"}/>;
}
