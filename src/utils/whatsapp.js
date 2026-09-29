import { siteConfig } from "../config/siteConfig";

export function whatsappUrl(text = "") {
  const number = siteConfig.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}
