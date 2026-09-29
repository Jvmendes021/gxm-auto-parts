// Máscara enquanto digita: (11) 94822-8522
export function maskPhone(raw) {
  let d = raw.replace(/\D/g, "");
  if (d.length > 11 && d.startsWith("55")) d = d.slice(2);
  d = d.slice(0, 11);
  if (!d) return "";
  if (d.length < 3) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

// Número nacional (DDD + número). Retorna "" se inválido.
export function nationalNumber(raw) {
  let d = raw.replace(/\D/g, "");
  if (d.length >= 12 && d.startsWith("55")) d = d.slice(2);
  return d.length === 10 || d.length === 11 ? d : "";
}

// Link do WhatsApp gerado a partir do número informado
export function whatsappLinkFor(raw) {
  const n = nationalNumber(raw);
  return n ? `https://wa.me/55${n}` : "";
}
