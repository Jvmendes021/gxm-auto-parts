import { Wrench, Cog, Gauge, Settings, Zap, Thermometer, Car, Package } from "lucide-react";
import "./Categories.css";

const categories = [
  { name: "Suspensão", description: "Amortecedores, coxins, batentes, coifas e buchas.", icon: Wrench },
  { name: "Direção", description: "Terminais, barras, pivôs e componentes de direção.", icon: Cog },
  { name: "Freios", description: "Pastilhas, discos, cilindros e itens do sistema de freio.", icon: Gauge },
  { name: "Motor", description: "Peças de reposição para o conjunto do motor.", icon: Settings },
  { name: "Elétrica", description: "Componentes elétricos e de ignição.", icon: Zap },
  { name: "Arrefecimento", description: "Itens do sistema de arrefecimento do veículo.", icon: Thermometer },
  { name: "Transmissão", description: "Componentes de câmbio, embreagem e tração.", icon: Car },
  { name: "Acessórios", description: "Acessórios e itens complementares para o veículo.", icon: Package },
];

export default function Categories() {
  return (
    <section className="section" id="produtos">
      <div className="container">
        <h2 className="section__title">ENCONTRE A PEÇA QUE VOCÊ PRECISA</h2>
        <p className="section__sub">Escolha uma categoria. Não achou? Peça sob encomenda.</p>
        <div className="categories__grid">
          {categories.map(({ name, description, icon: Icon }) => (
            <article className="categories__card" key={name}>
              <Icon size={28} aria-hidden="true" />
              <h3>{name.toUpperCase()}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
