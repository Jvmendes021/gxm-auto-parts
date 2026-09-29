import { maskPhone, whatsappLinkFor } from "./phone";

const oneLine = (s, max = 60) => s.replace(/\s+/g, " ").trim().slice(0, max);

// Monta os dados enviados ao FormSubmit (template "table").
// Cada chave vira uma linha da tabela no e-mail, na ordem abaixo.
export function buildQuotePayload(v, honey = "") {
  const email = v.email.trim();
  const pecas = v.pecas
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => `• ${l}`)
    .join("\n");

  return {
    _subject: `GXM AUTO PARTS | Cotação | ${oneLine(v.nome, 40)} | ${v.placa.trim().toUpperCase()}`,
    _template: "table",
    _captcha: "false",
    _honey: honey,
    ...(email && { _replyto: email }), // Responder no Gmail vai para o cliente
    "Nome": v.nome.trim(),
    "WhatsApp": maskPhone(v.whatsapp),
    "Falar no WhatsApp (clique no link)": whatsappLinkFor(v.whatsapp),
    "E-mail": email || "Não informado",
    "Placa": v.placa.trim().toUpperCase(),
    "Modelo do veículo": v.modelo.trim(),
    "Ano": v.ano.trim(),
    "Peças solicitadas": pecas,
    "GXM AUTO PARTS": "Comércio eletrônico de autopeças. Enviamos para todo o Brasil. Frete a combinar.",
  };
}
