const FORM_EMAIL = "gxmautoparts@gmail.com";
const SITE = "https://gxmautoparts.vercel.app";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Método não permitido" });
  }
  try {
    const r = await fetch(`https://formsubmit.co/ajax/${FORM_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: SITE,
        Referer: `${SITE}/`,
      },
      body: JSON.stringify(req.body),
    });
    const text = await r.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { raw: text.slice(0, 300) }; }
    const ok = r.ok && String(data.success) !== "false";
    if (!ok) console.error("FormSubmit respondeu", r.status, data);
    return res.status(ok ? 200 : 502).json({ success: ok, status: r.status, message: data.message });
  } catch (err) {
    console.error("Falha ao contatar o FormSubmit:", err);
    return res.status(502).json({ success: false, message: "Falha ao contatar o serviço de envio" });
  }
}