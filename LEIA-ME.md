# GXM AUTO PARTS — site

## Rodar no computador
    npm install
    npm run dev

## Publicar
    npm run build      (confere se não há erro)
    git add . && git commit -m "Atualização" && git push

## Envio do formulário (e-mail)
O formulário envia para /api/quote (pasta `api/`), que manda o e-mail pelo Resend.
1. Crie uma conta em https://resend.com usando o e-mail gxmautoparts@gmail.com.
2. Crie uma API Key (API Keys > Create).
3. Na Vercel: Settings > Environment Variables > adicione RESEND_API_KEY com a chave (Production, Preview e Development).
4. Faça um Redeploy (Deployments > ... > Redeploy).
5. Teste abrindo https://SEU-SITE.vercel.app/api/quote — deve mostrar {"service":"quote","configured":true}.

Com o remetente de teste (onboarding@resend.dev), o Resend só entrega para o e-mail da conta criada.
Para enviar para outros endereços, verifique um domínio no Resend e defina MAIL_FROM.
A função /api só funciona publicado na Vercel (ou com `npx vercel dev`).
