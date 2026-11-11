import { Suspense } from "react";
import { JsonLd } from "@/components/JsonLd";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactFormFromParams } from "@/components/contact/ContactFormFromParams";
import { ContactMap } from "@/components/contact/ContactMap";
import { Glow } from "@/components/motion/Glow";
import { MotionEngine } from "@/components/motion/MotionEngine";
import { Button } from "@/components/ui/Button";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import styles from "@/components/contact/ContactPage.module.css";

const DESCRIPTION =
  "Contact Sash Tech Digital about creative design, animation, video, websites, SEO or digital marketing.";

export const metadata = pageMetadata({ title: "Contact Us", description: DESCRIPTION, path: "/contact" });

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Contact ${site.name}`,
  description: DESCRIPTION,
  url: `${site.url}/contact`,
  mainEntity: {
    "@id": `${site.url}/#organization`,
    "@type": "ProfessionalService",
    name: site.name,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.email,
      availableLanguage: ["English", "Urdu"],
      areaServed: ["US", "GB", "AE", "SA", "PK"],
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <section className={`${styles.hero} theme-dark`} aria-labelledby="page-title">
        <Glow />
        <div className={`container ${styles.inner}`}>
          <div className={styles.copy}>
            <h1 id="page-title" className={`display ${styles.title}`} data-split data-immediate>
              Let&apos;s talk about <em>your idea.</em>
            </h1>
            <p className={`body ${styles.lead}`} data-reveal data-immediate data-delay="0.35">
              Tell us about your project, your goals and what you want to create. We&apos;ll discuss the requirements and prepare a clear direction.
            </p>

            <p className={styles.kicker} data-reveal="fade" data-immediate data-delay="0.45">
              Visit Us
            </p>
            <div data-reveal data-immediate data-delay="0.5">
              <address className={styles.address}>
                {site.address.street},
                <br />
                {site.address.city}, {site.address.postalCode}
              </address>
              <div className={styles.contactLinks}>
                <a className={styles.mailLink} href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </div>
            </div>

            <aside className={styles.promo} aria-labelledby="promo-title" data-reveal="scale" data-immediate data-delay="0.6">
              <h2 id="promo-title" className={styles.promoTitle}>
                Prefer a conversation?
              </h2>
              <p className={styles.promoText}>Email us directly to discuss your project.</p>
              <div className={styles.promoAction}>
                <Button href={`mailto:${site.email}`} variant="dark">
                  Email our team
                </Button>
              </div>
            </aside>
          </div>

          <div className={styles.formCol} data-reveal="up" data-immediate data-delay="0.3">
            <Suspense fallback={<ContactForm />}>
              <ContactFormFromParams />
            </Suspense>
          </div>
        </div>
      </section>

      <section className="section theme-paper" aria-labelledby="map-title">
        <div className="container">
          <h2 id="map-title" className={`h2 ${styles.mapTitle}`} data-split>
            Based in <em>Texas, creating</em> worldwide.
          </h2>
          <ContactMap />
        </div>
      </section>

      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
          contactPageJsonLd,
        ]}
      />
      <MotionEngine />
    </>
  );
}
