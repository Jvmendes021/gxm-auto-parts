import { Mail, MessageCircle, ExternalLink } from "lucide-react";
import { siteConfig } from "../../config/siteConfig";
import { navLinks } from "../../config/navigation";
import { whatsappUrl } from "../../utils/whatsapp";
import Logo from "../Logo/Logo";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <a href="#inicio" aria-label="GXM Auto Parts - início"><Logo /></a>
            <p>Autopeças de suspensão, direção e componentes automotivos, com atendimento para peças por encomenda.</p>
          </div>

          <nav aria-label="Navegação do rodapé">
            <h3>NAVEGAÇÃO</h3>
            <ul>
              {navLinks.map((l) => (<li key={l.href}><a href={l.href}>{l.label}</a></li>))}
            </ul>
          </nav>

          <div>
            <h3>ONDE COMPRAR</h3>
            <ul>
              <li><a href={siteConfig.mercadoLivre} target="_blank" rel="noopener noreferrer">Mercado Livre <ExternalLink size={14} aria-hidden="true" /></a></li>
              <li><a href={siteConfig.shopee} target="_blank" rel="noopener noreferrer">Shopee <ExternalLink size={14} aria-hidden="true" /></a></li>
            </ul>
          </div>

          <div className="footer__contact">
            <h3>CONTATO</h3>
            <ul>
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={20} aria-hidden="true" />
                  <span><small>WhatsApp:</small>{siteConfig.whatsappDisplay}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`}>
                  <Mail size={20} aria-hidden="true" />
                  <span><small>E-mail:</small>{siteConfig.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <div>
            <strong>GXM AUTO PARTS</strong>
            <span>Comércio eletrônico de autopeças</span>
          </div>
          <p>Enviamos para todo o Brasil • Frete a combinar</p>
          <p className="footer__copy">© 2026 GXM AUTO PARTS. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
