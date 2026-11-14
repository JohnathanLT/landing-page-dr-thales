# Landing page — Dr. Thales

Site one-page em Next.js App Router, com uma página separada de Política de Privacidade.

## Começar

Use Node.js 20.9 ou superior. Instale as dependências e inicie o modo de desenvolvimento:

```sh
npm install
npm run dev
```

Para gerar a versão de produção, use `npm run build`. O projeto pode ser conectado à Vercel como uma aplicação Next.js.

## Editar os dados

Os dados e textos do site ficam em [src/config/site.ts](src/config/site.ts). Substitua todos os campos marcados com `TODO` antes de publicar. Os dados atuais de contato, endereço e formação são exemplos e não devem ser usados em produção. Adicione o ID do Formspree em `formspreeId` para habilitar o envio do formulário. Avaliações só aparecem quando forem incluídas em `reviews`.

## Ativar o título de especialista

O campo `rqe` começa vazio. Nesse estado, o site usa automaticamente “Médico · Saúde Mental” em títulos, textos, cabeçalho, seção Sobre, rodapé e metadados; o JSON-LD também omite `medicalSpecialty`.

Depois de confirmar o registro real, preencha `rqe` somente com o número (por exemplo, `"12345"`). O helper exibirá “Psiquiatra” e o RQE junto ao CRM. Não use um número fictício ou preencha o campo antes de confirmar o registro.

## Domínio, sitemap e publicação

O workflow em `.github/workflows/deploy-pages.yml` exporta o App Router como site estático e publica no GitHub Pages em cada envio à branch `main`. O build configura automaticamente o caminho do repositório, o endereço público e mantém a página em modo de prévia sem indexação e sem JSON-LD de credenciais. Depois de substituir os dados fictícios, desative o modo de prévia e atualize a configuração de domínio/SEO antes de usar o site como página oficial.

## Imagem profissional

As imagens enviadas estão em `public/images` e são exibidas por `next/image`, que otimiza a entrega para WebP/AVIF conforme o navegador. Atualize os caminhos e textos alternativos em `site.photo` e `site.aboutPhotos` se trocar alguma foto.

`preview.html` e `preview-politica.html` são prévias estáticas para abrir localmente sem instalar dependências; a aplicação oficial continua em `src/app`.

## Privacidade

A política publicada fica em `/politica-de-privacidade`. Revise os dados do controlador, fornecedores, retenção e canais de direitos antes de colocar o formulário em produção. A mensagem do formulário orienta a pessoa a não enviar dados de saúde.
