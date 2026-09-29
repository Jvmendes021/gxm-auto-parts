import { Truck, MessageCircle } from "lucide-react";
import "./About.css";

export default function About() {
  return (
    <section className="section section--mist" id="sobre">
      <div className="container about">
        <div>
          <h2 className="section__title">SOBRE A GXM AUTO PARTS</h2>
          <p className="about__lead">A GXM Auto Parts trabalha com comércio eletrônico de autopeças, com foco em suspensão, direção e componentes automotivos, vendendo pelos principais marketplaces.</p>
          <p>Além dos produtos anunciados, oferecemos atendimento para localização de peças por encomenda: você informa o veículo e a peça, e nossa equipe busca as opções disponíveis.</p>
        </div>
        <ul className="about__info">
          <li><Truck size={26} aria-hidden="true" /><strong>Enviamos para todo o Brasil.</strong></li>
          <li><MessageCircle size={26} aria-hidden="true" /><strong>Frete a combinar.</strong></li>
        </ul>
      </div>
    </section>
  );
}
