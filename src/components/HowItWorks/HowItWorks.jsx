import "./HowItWorks.css";

const steps = [
  { title: "INFORME A PEÇA", text: "Diga qual peça você está procurando." },
  { title: "ENVIE OS DADOS DO VEÍCULO", text: "Informe marca, modelo, ano e motorização." },
  { title: "VERIFICAMOS A DISPONIBILIDADE", text: "Nossa equipe consulta a disponibilidade." },
  { title: "RECEBA SUA COTAÇÃO", text: "Enviamos as opções e valores disponíveis." },
];

export default function HowItWorks() {
  return (
    <section className="section section--dark" id="como-comprar">
      <div className="container">
        <h2 className="section__title">COMO FUNCIONA</h2>
        <p className="section__sub">Quatro passos para pedir a sua peça sob encomenda.</p>
        <ol className="how__steps">
          {steps.map((s, i) => (
            <li className="how__step" key={s.title}>
              <span className="how__num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
