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

## Demonstração do prontuário

A rota `/sistema` é uma demonstração separada do site público. Ela usa Dexie/IndexedDB local no navegador e contém apenas pacientes inventados. A faixa de aviso permanece visível; não insira dados reais. O conteúdo da sessão fica em `sessionStorage` e os registros demonstrativos em IndexedDB. Não há conexão com API.

Os repositórios são definidos em `src/sistema/data/repositories.ts` e a implementação ativa em `DexieRepo.ts`. `SupabaseRepo.ts` e `supabase/schema.sql` são apenas pontos de partida com TODOs; não há Supabase configurado. Não ative-os antes de implementar autenticação, políticas RLS, controle de acesso, criptografia e revisão jurídica/técnica.

Os dados iniciais são gerados por `src/sistema/data/seed.ts`. “Restaurar dados de demonstração” substitui o banco local pelos registros fictícios. A exportação JSON é iniciada e baixada localmente.

O catálogo `cid10-capitulo-v.json` contém as categorias e subcategorias F00–F99 e inclui também as categorias e subcategorias Z e R da tabela CID-10 V2008 do DATASUS. Para atualizar, extraia `CID-10-SUBCATEGORIAS.CSV` e `CID-10-CATEGORIAS.CSV` do arquivo oficial e execute `pnpm dlx tsx scripts/importar-cid10.ts <pasta/CID-10-SUBCATEGORIAS.CSV>`. O importador lê automaticamente o arquivo de categorias vizinho e documenta as fontes no JSON gerado. Confira a versão exigida pelo sistema em que os códigos forem utilizados.

As faixas de pontuação das escalas são demonstrativas e precisam ser interpretadas por profissional habilitado: [PHQ-9 (APA)](https://www.psychiatry.org/getmedia/a3986be5-94af-42e7-afce-19234c2f4998/APA-DSM5TR-SeverityMeasureForDepressionAdult.pdf) e [GAD-7](https://portal.ct.gov/-/media/dmhas/publications/gad-7-anxiety-scale.pdf).
