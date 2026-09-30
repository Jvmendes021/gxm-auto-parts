import { maskPhone } from "./phone";

// Monta a mensagem organizada que vai para o WhatsApp da loja (*texto* = negrito no WhatsApp)
export function buildQuoteMessage(v) {
  const pecas = v.pecas
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => `• ${l}`)
    .join("\n");
  const email = v.email.trim();

  return [
    "*NOVA SOLICITAÇÃO DE COTAÇÃO*",
    "GXM AUTO PARTS",
    "",
    "*DADOS DO CLIENTE*",
    `Nome: ${v.nome.trim()}`,
    `WhatsApp: ${maskPhone(v.whatsapp)}`,
    ...(email ? [`E-mail: ${email}`] : []),
    "",
    "*DADOS DO VEÍCULO*",
    `Placa: ${v.placa.trim().toUpperCase()}`,
    `Modelo: ${v.modelo.trim()}`,
    `Ano: ${v.ano.trim()}`,
    "",
    "*PEÇAS SOLICITADAS*",
    pecas,
  ].join("\n");
}
