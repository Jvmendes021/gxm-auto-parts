import { siteConfig } from "../../config/siteConfig";
import "./Marketplaces.css";

const shops = [
  { id: "ml", name: "MERCADO LIVRE", text: "Confira nossos produtos disponíveis no Mercado Livre.", button: "COMPRAR NO MERCADO LIVRE", url: siteConfig.mercadoLivre },
  { id: "shopee", name: "SHOPEE", text: "Confira nossos produtos disponíveis na Shopee.", button: "COMPRAR NA SHOPEE", url: siteConfig.shopee },
];

export default function Marketplaces() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section__title">COMPRE ONLINE</h2>
        <div className="market__grid">
          {shops.map((s) => (
            <article className="market__card" key={s.name}>
              <h3>{s.name}</h3>
              <p>{s.text}</p>
              <a className={`btn market__btn market__btn--${s.id}`} href={s.url} target="_blank" rel="noopener noreferrer">{s.button}</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
