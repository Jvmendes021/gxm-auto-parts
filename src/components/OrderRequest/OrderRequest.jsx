import { useState } from "react";
import { maskPhone, nationalNumber } from "../../utils/phone";
import { whatsappUrl } from "../../utils/whatsapp";
import { buildQuoteMessage } from "../../utils/quoteMessage";
import "./OrderRequest.css";

const fields = [
  { name: "nome", label: "Nome", required: true, wide: true, autoComplete: "name" },
  { name: "placa", label: "Placa do veículo", required: true, placeholder: "ABC1D23", maxLength: 8, autoCapitalize: "characters", autoComplete: "off" },
  { name: "whatsapp", label: "WhatsApp para contato", required: true, type: "tel", inputMode: "tel", placeholder: "(11) 99999-9999", autoComplete: "tel" },
  { name: "email", label: "E-mail", wide: true, type: "email", placeholder: "seu@email.com", autoComplete: "email" },
  { name: "modelo", label: "Modelo do veículo", required: true, placeholder: "Ex.: Fiat Uno" },
  { name: "ano", label: "Ano do veículo", required: true, inputMode: "numeric", maxLength: 4, placeholder: "2015" },
  { name: "pecas", label: "Quais peças você precisa?", required: true, textarea: true, wide: true, placeholder: "Escreva uma peça por linha" },
];
const empty = Object.fromEntries(fields.map((f) => [f.name, ""]));

function validate(v) {
  const e = {};
  fields.filter((f) => f.required && !v[f.name].trim()).forEach((f) => (e[f.name] = "Campo obrigatório"));
  if (!e.placa && !/^[A-Za-z]{3}-?\d[A-Za-z0-9]\d{2}$/.test(v.placa.trim())) e.placa = "Placa inválida. Ex.: ABC1D23";
  if (!e.whatsapp && !nationalNumber(v.whatsapp)) e.whatsapp = "Informe DDD e número";
  if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = "E-mail inválido";
  if (!e.ano && !/^(19|20)\d{2}$/.test(v.ano.trim())) e.ano = "Use 4 dígitos. Ex.: 2015";
  return e;
}

export default function OrderRequest() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [link, setLink] = useState(""); // link do WhatsApp gerado após o envio

  const onChange = (e) => {
    const { name, value } = e.target;
    const next = name === "placa" ? value.toUpperCase() : name === "whatsapp" ? maskPhone(value) : value;
    setValues((v) => ({ ...v, [name]: next }));
    setErrors((er) => ({ ...er, [name]: undefined }));
    setLink("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    const url = whatsappUrl(buildQuoteMessage(values));
    setLink(url);
    const win = window.open(url, "_blank");
    if (win) win.opener = null;
    else window.location.href = url; // pop-up bloqueado: abre na mesma aba
  };

  return (
    <section className="section section--mist" id="encomendas">
      <div className="container order">
        <div className="order__intro">
          <h2 className="section__title">SOLICITE SUAS PEÇAS</h2>
          <p className="section__sub">Preencha os dados abaixo e nossa equipe entrará em contato para verificar a disponibilidade e enviar o orçamento.</p>
        </div>
        <form className="order__form" onSubmit={onSubmit} noValidate>
          {fields.map(({ name, label, required, wide, textarea, ...input }) => {
            const Tag = textarea ? "textarea" : "input";
            return (
              <label key={name} className={wide ? "order__field order__field--wide" : "order__field"}>
                <span>{label}{required && " *"}</span>
                <Tag name={name} value={values[name]} onChange={onChange} rows={textarea ? 5 : undefined} aria-invalid={!!errors[name]} {...input} />
                {errors[name] && <span className="order__error" role="alert">{errors[name]}</span>}
              </label>
            );
          })}
          <button className="btn order__submit" type="submit">ENVIAR SOLICITAÇÃO</button>
          {link && (
            <p className="order__status order__status--ok" role="status">
              Abrimos o WhatsApp com a sua solicitação. É só tocar em enviar para concluir.{" "}
              <a className="order__fallback" href={link} target="_blank" rel="noopener noreferrer">Não abriu? Clique aqui.</a>
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
