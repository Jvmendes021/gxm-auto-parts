import { MessageCircle, Mail, ExternalLink } from "lucide-react";
import { siteConfig } from "../../config/siteConfig";
import { whatsappUrl } from "../../utils/whatsapp";
import "./Contact.css";

const items = [
  { label: "WhatsApp", value: siteConfig.whatsappDisplay, href: whatsappUrl(), icon: MessageCircle },
  { label: "E-mail", value: siteConfig.email, href: `mailto:${siteConfig.email}`, icon: Mail },
  { label: "Mercado Livre", value: "Ver loja", href: siteConfig.mercadoLivre, icon: ExternalLink },
  { label: "Shopee", value: "Ver loja", href: siteConfig.shopee, icon: ExternalLink },
  ...(siteConfig.instagram ? [{ label: "Instagram", value: "Ver perfil", href: siteConfig.instagram, icon: ExternalLink }] : []),
];

export default function Contact() {
  return (
    <section className="section" id="contato">
      <div className="container">
        <h2 className="section__title">CONTATO</h2>
        <ul className="contact__list">
          {items.map(({ label, value, href, icon: Icon }) => (
            <li key={label}>
              <a className="contact__item" href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                <Icon size={22} aria-hidden="true" />
                <span><strong>{label}</strong><br />{value}</span>
              </a>
            </li>
          ))}
        </ul>
        <a className="btn" href={whatsappUrl("Olá, GXM Auto Parts!")} target="_blank" rel="noopener noreferrer">FALAR PELO WHATSAPP</a>
      </div>
    </section>
  );
}
