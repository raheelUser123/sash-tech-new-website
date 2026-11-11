"use client";

import { useSearchParams } from "next/navigation";
import { comboPackages } from "@/content/pricing";
import { ContactForm } from "./ContactForm";

/**
 * Reads ?type=partner and ?need=a,b from the URL and preselects the form. Must be rendered
 * inside <Suspense> (the page prerenders the plain <ContactForm /> as the fallback).
 */
export function ContactFormFromParams() {
  const params = useSearchParams();
  const kind = params.get("type") === "partner" ? "partner" : params.get("type") === "individual" ? "individual" : "project";
  const needs = (params.get("need") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 12);
  const offer = comboPackages.find(p => p.id === params.get("package"));
  const message = offer ? "I am interested in the " + offer.title + " combo (" + offer.discount + "% bundle savings). Please help me define the scope, deliverables and timeline, and share an itemised proposal." : "";
  return <ContactForm key={kind + "|" + needs.join(",") + "|" + (offer?.id ?? "")} initialKind={kind} initialNeeds={needs} initialMessage={message} />;
}
