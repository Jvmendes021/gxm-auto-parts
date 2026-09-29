import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="container hero__in">
        <h1 className="hero__title">GXM AUTO PARTS</h1>
        <h2 className="hero__subtitle">AUTOPEÇAS DE QUALIDADE PARA O SEU VEÍCULO</h2>
        <p className="hero__text">Encontre peças automotivas para diversos veículos ou solicite uma peça por encomenda.</p>
        <div className="hero__actions">
          <a className="btn" href="#produtos">VER PRODUTOS</a>
          <a className="btn btn--ghost" href="#encomendas">SOLICITAR PEÇA POR ENCOMENDA</a>
        </div>
      </div>
    </section>
  );
}
