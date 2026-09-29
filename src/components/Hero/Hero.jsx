import { Wrench, Search, Truck } from "lucide-react";
import heroLogo from "../../assets/images/logo-hero.png";
import "./Hero.css";

const highlights = [
  { icon: Wrench, text: "Suspensão, direção e componentes" },
  { icon: Search, text: "Peças por encomenda" },
  { icon: Truck, text: "Enviamos para todo o Brasil" },
];

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="container hero__in">
        <div className="hero__copy">
          <h1 className="hero__title">GXM AUTO PARTS</h1>
          <h2 className="hero__subtitle">AUTOPEÇAS DE QUALIDADE PARA O SEU VEÍCULO</h2>
          <p className="hero__text">Encontre peças automotivas para diversos veículos ou solicite uma peça por encomenda.</p>
          <div className="hero__actions">
            <a className="btn" href="#produtos">VER PRODUTOS</a>
            <a className="btn btn--ghost" href="#encomendas">SOLICITAR PEÇA POR ENCOMENDA</a>
          </div>
          <ul className="hero__chips">
            {highlights.map(({ icon: Icon, text }) => (
              <li key={text}><Icon size={18} aria-hidden="true" />{text}</li>
            ))}
          </ul>
        </div>
        <div className="hero__visual">
          <img src={heroLogo} alt="GXM Auto Parts: qualidade, performance e confiança" width="1000" height="473" />
        </div>
      </div>
    </section>
  );
}
