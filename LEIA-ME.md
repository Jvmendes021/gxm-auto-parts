# GXM AUTO PARTS — site

## Rodar no computador
    npm install
    npm run dev

## Publicar
    npm run build      (confere se não há erro)
    git add . && git commit -m "Atualização" && git push

## Formulário "Solicite suas peças"
Ao clicar em ENVIAR SOLICITAÇÃO, o site valida os campos e abre o WhatsApp da loja
(número em src/config/siteConfig.js) com a mensagem organizada. Não usa e-mail nem servidor.
Formato da mensagem: src/utils/quoteMessage.js
