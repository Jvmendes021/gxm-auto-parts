// Central de configuração: altere aqui os dados da empresa.
export const siteConfig = {
  companyName: "GXM AUTO PARTS",
  // Número para o link do WhatsApp: só dígitos, com DDI + DDD
  whatsapp: "5511966367153",
  // Como o número aparece escrito no site
  whatsappDisplay: "(11) 96636-7153",
  email: "gxmautoparts@gmail.com",
  mercadoLivre: "https://www.mercadolivre.com.br/pagina/gxmautoparts",
  shopee: "https://shopee.com.br/shop/412688316",
  instagram: "", // opcional: link completo do perfil
  // Rota do próprio site (api/quote.js) que envia o formulário por e-mail, sem senha no site.
  // Só funciona publicado na Vercel (ou com "npx vercel dev" no computador).
  formEndpoint: "/api/quote",
  colors: { primary: "#2f6bff", secondary: "#7a4dff" },
};
