import { siteConfig } from "../../config/siteConfig";
import { navLinks } from "../../config/navigation";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div>
            <strong className="footer__brand">GXM AUTO PARTS</strong>
            <p>Autopeças para o seu veículo.</p>
          </div>
          <nav aria-label="Rodapé">
            <ul>
              {navLinks.map((l) => (<li key={l.href}><a href={l.href}>{l.label}</a></li>))}
              <li><a href={siteConfig.mercadoLivre} target="_blank" rel="noopener noreferrer">Mercado Livre</a></li>
              <li><a href={siteConfig.shopee} target="_blank" rel="noopener noreferrer">Shopee</a></li>
            </ul>
          </nav>
        </div>
        <p className="footer__copy">© 2026 GXM AUTO PARTS. TODOS OS DIREITOS RESERVADOS.</p>
      </div>
    </footer>
  );
}
