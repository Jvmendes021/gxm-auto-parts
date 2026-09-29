import { useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "../../config/siteConfig";
import { navLinks } from "../../config/navigation";
import Logo from "../Logo/Logo";
import "./Navbar.css";


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="container navbar__in">
        <a className="navbar__logo" href="#inicio" onClick={close} aria-label="GXM Auto Parts - início">
          <Logo />
        </a>
        <button
          className="navbar__toggle"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="menu-principal"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
        <nav id="menu-principal" className={`navbar__menu${menuOpen ? " is-open" : ""}`} aria-label="Principal">
          <ul className="navbar__links">
            {navLinks.map((l) => (
              <li key={l.href}><a href={l.href} onClick={close}>{l.label}</a></li>
            ))}
          </ul>
          <div className="navbar__shops">
            <a className="navbar__shop navbar__shop--ml" href={siteConfig.mercadoLivre} target="_blank" rel="noopener noreferrer" onClick={close}>Mercado Livre</a>
            <a className="navbar__shop navbar__shop--shopee" href={siteConfig.shopee} target="_blank" rel="noopener noreferrer" onClick={close}>Shopee</a>
          </div>
        </nav>
      </div>
    </header>
  );
}
