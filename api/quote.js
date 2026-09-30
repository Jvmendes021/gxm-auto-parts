// Função serverless da Vercel: recebe o formulário, valida e envia o e-mail pelo Resend.
// A chave do Resend fica só nas variáveis de ambiente da Vercel (nunca no site).
const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const clean = (s, max) => String(s ?? "").replace(/\s+/g, " ").trim().slice(0, max);

function nationalNumber(raw) {
  let d = String(raw ?? "").replace(/\D/g, "");
  if (d.length >= 12 && d.startsWith("55")) d = d.slice(2);
  return d.length === 10 || d.length === 11 ? d : "";
}
const formatPhone = (n) =>
  n.length === 11 ? `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}` : `(${n.slice(0, 2)}) ${n.slice(2, 6)}-${n.slice(6)}`;

function validate(b) {
  const d = {
    nome: clean(b.nome, 80),
    placa: clean(b.placa, 8).toUpperCase(),
    whatsapp: nationalNumber(b.whatsapp),
    email: clean(b.email, 120),
    modelo: clean(b.modelo, 80),
    ano: clean(b.ano, 4),
    pecas: String(b.pecas ?? "").replace(/\r/g, "").trim().slice(0, 2000),
  };
  const ok =
    d.nome.length >= 2 &&
    /^[A-Z]{3}-?\d[A-Z0-9]\d{2}$/.test(d.placa) &&
    d.whatsapp &&
    (!d.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) &&
    d.modelo &&
    /^(19|20)\d{2}$/.test(d.ano) &&
    d.pecas;
  return ok ? d : null;
}

function buildEmail(d) {
  const phone = formatPhone(d.whatsapp);
  const wa = `https://wa.me/55${d.whatsapp}`;
  const items = d.pecas.split("\n").map((l) => l.trim()).filter(Boolean);
  const row = (label, value) =>
    `<tr><td style="padding:6px 0;color:#5b6285;width:130px;vertical-align:top">${label}</td><td style="padding:6px 0;color:#1a1f3a;font-weight:600">${value}</td></tr>`;
  const h = (t) =>
    `<div style="margin:26px 0 8px;padding-bottom:6px;border-bottom:2px solid #7a4dff;font-size:13px;letter-spacing:1.5px;font-weight:700;color:#2f6bff">${t}</div>`;

  const html = `<!DOCTYPE html><html lang="pt-BR"><body style="margin:0;background:#eef1fb;font-family:Arial,Helvetica,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef1fb;padding:24px 12px"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden">
<tr><td style="background:#121734;padding:22px 28px;border-bottom:4px solid #7a4dff"><span style="color:#ffffff;font-size:22px;font-weight:700;letter-spacing:1px">GXM AUTO PARTS</span></td></tr>
<tr><td style="padding:28px">
<div style="font-size:20px;font-weight:700;color:#1a1f3a">NOVA SOLICITAÇÃO DE COTAÇÃO</div>
${h("DADOS DO CLIENTE")}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px">
${row("Nome:", esc(d.nome))}
${row("WhatsApp:", `<a href="${wa}" style="color:#2f6bff;text-decoration:none">${phone}</a>`)}
${row("E-mail:", d.email ? `<a href="mailto:${esc(d.email)}" style="color:#2f6bff;text-decoration:none">${esc(d.email)}</a>` : "Não informado")}
</table>
<div style="margin:14px 0 0"><a href="${wa}" style="display:inline-block;background:#1a9f4b;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:12px 20px;border-radius:8px">CLIQUE PARA FALAR NO WHATSAPP</a></div>
${h("DADOS DO VEÍCULO")}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px">
${row("Placa:", esc(d.placa))}${row("Modelo:", esc(d.modelo))}${row("Ano:", esc(d.ano))}
</table>
${h("PEÇAS SOLICITADAS")}
<ul style="margin:0;padding-left:20px;font-size:15px;color:#1a1f3a;line-height:1.7">${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>
</td></tr>
<tr><td style="background:#121734;padding:18px 28px;color:#c9d0f5;font-size:13px;line-height:1.6"><strong style="color:#ffffff">GXM AUTO PARTS</strong><br>Comércio eletrônico de autopeças.<br>Enviamos para todo o Brasil. Frete a combinar.</td></tr>
</table></td></tr></table></body></html>`;

  const text = [
    "GXM AUTO PARTS",
    "NOVA SOLICITAÇÃO DE COTAÇÃO",
    "",
    "DADOS DO CLIENTE",
    `Nome: ${d.nome}`,
    `WhatsApp: ${phone} (${wa})`,
    `E-mail: ${d.email || "Não informado"}`,
    "",
    "DADOS DO VEÍCULO",
    `Placa: ${d.placa}`,
    `Modelo: ${d.modelo}`,
    `Ano: ${d.ano}`,
    "",
    "PEÇAS SOLICITADAS",
    ...items.map((i) => `- ${i}`),
  ].join("\n");

  return { html, text };
}

export default async function handler(req, res) {
  // Teste rápido: abra /api/quote no navegador para ver se a função está no ar
  if (req.method === "GET") {
    return res.status(200).json({ service: "quote", configured: Boolean(process.env.RESEND_API_KEY) });
  }
  if (req.method !== "POST") return res.status(405).json({ success: false, code: "method" });

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch { body = {}; } }
  body = body || {};
  if (body._honey) return res.status(200).json({ success: true }); // robô: finge que enviou

  const d = validate(body);
  if (!d) return res.status(400).json({ success: false, code: "invalid" });

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("RESEND_API_KEY não configurada na Vercel");
    return res.status(500).json({ success: false, code: "not_configured" });
  }

  const { html, text } = buildEmail(d);
  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.MAIL_FROM || "GXM AUTO PARTS <onboarding@resend.dev>",
        to: [process.env.MAIL_TO || "gxmautoparts@gmail.com"],
        subject: `GXM AUTO PARTS | Cotação | ${d.nome} | ${d.placa}`,
        html,
        text,
        ...(d.email && { reply_to: d.email }),
      }),
    });
    if (!r.ok) {
      console.error("Resend respondeu", r.status, (await r.text()).slice(0, 400));
      return res.status(502).json({ success: false, code: "send_failed" });
    }
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Falha ao contatar o Resend:", err);
    return res.status(502).json({ success: false, code: "send_failed" });
  }
}
