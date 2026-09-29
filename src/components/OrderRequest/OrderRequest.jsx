import { useState } from "react";
import { siteConfig } from "../../config/siteConfig";
import "./OrderRequest.css";

// Todos os campos são obrigatórios
const fields = [
  { name: "nome", label: "Nome", autoComplete: "name" },
  { name: "placa", label: "Placa do veículo", placeholder: "ABC1D23", maxLength: 8, autoCapitalize: "characters" },
  { name: "whatsapp", label: "WhatsApp para contato", type: "tel", placeholder: "(11) 99999-9999", autoComplete: "tel" },
  { name: "modelo", label: "Modelo do veículo", placeholder: "Ex.: Fiat Uno" },
  { name: "ano", label: "Ano do veículo", inputMode: "numeric", maxLength: 4, placeholder: "2015" },
  { name: "pecas", label: "Quais peças você precisa?", textarea: true, wide: true, placeholder: "Liste todas as peças que você procura" },
];
const empty = Object.fromEntries(fields.map((f) => [f.name, ""]));

function validate(v) {
  const e = {};
  fields.filter((f) => !v[f.name].trim()).forEach((f) => (e[f.name] = "Campo obrigatório"));
  if (!e.placa && !/^[A-Za-z]{3}-?\d[A-Za-z0-9]\d{2}$/.test(v.placa.trim())) e.placa = "Placa inválida. Ex.: ABC1D23";
  if (!e.whatsapp && v.whatsapp.replace(/\D/g, "").length < 10) e.whatsapp = "Informe DDD e número";
  if (!e.ano && !/^(19|20)\d{2}$/.test(v.ano.trim())) e.ano = "Use 4 dígitos. Ex.: 2015";
  return e;
}

export default function OrderRequest() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: name === "placa" ? value.toUpperCase() : value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
    if (status !== "sending") setStatus("idle");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus("sending");
    try {
      const res = await fetch(siteConfig.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: "Nova solicitação de cotação - GXM AUTO PARTS",
          _template: "table",
          _captcha: "false",
          _honey: new FormData(e.target).get("_honey") || "",
          "NOVA SOLICITAÇÃO DE COTAÇÃO": "GXM AUTO PARTS",
          "Nome": values.nome.trim(),
          "Placa do veículo": values.placa.trim(),
          "WhatsApp": values.whatsapp.trim(),
          "Modelo do veículo": values.modelo.trim(),
          "Ano do veículo": values.ano.trim(),
          "Peças solicitadas": values.pecas.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || String(data.success) === "false") throw new Error("send failed");
      setValues(empty);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="section section--mist" id="encomendas">
      <div className="container order">
        <div>
          <h2 className="section__title">SOLICITE SUAS PEÇAS</h2>
          <p className="section__sub">Preencha os dados abaixo e nossa equipe entrará em contato para verificar a disponibilidade e enviar o orçamento.</p>
        </div>
        <form className="order__form" onSubmit={onSubmit} noValidate>
          {fields.map(({ name, label, wide, textarea, ...input }) => {
            const Tag = textarea ? "textarea" : "input";
            return (
              <label key={name} className={wide ? "order__field order__field--wide" : "order__field"}>
                {label} *
                <Tag name={name} value={values[name]} onChange={onChange} rows={textarea ? 4 : undefined} aria-invalid={!!errors[name]} {...input} />
                {errors[name] && <span className="order__error" role="alert">{errors[name]}</span>}
              </label>
            );
          })}
          <input className="order__hp" type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <button className="btn order__submit" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "ENVIANDO..." : "ENVIAR SOLICITAÇÃO"}
          </button>
          {status === "success" && (
            <p className="order__status order__status--ok" role="status">Solicitação enviada com sucesso! Nossa equipe entrará em contato para verificar a disponibilidade das peças e enviar o orçamento.</p>
          )}
          {status === "error" && (
            <p className="order__status order__status--err" role="alert">Não foi possível enviar a solicitação. Verifique sua conexão e tente novamente em instantes. Se preferir, fale conosco pelo WhatsApp.</p>
          )}
        </form>
      </div>
    </section>
  );
}
