# DashBoard

Aplicação backend, desenvolvida com Node.js e Typescript, que faz parte do teste de Desenvolvedor Fullstack em Angular.

## Tabela de Conteúdos

- [Tecnologias Utilizadas](https://chat.openai.com/c/420175f8-6699-4ca1-8222-5d57874f6ad0#tecnologias-utilizadas)
- [Instalação](https://chat.openai.com/c/420175f8-6699-4ca1-8222-5d57874f6ad0#instala%C3%A7%C3%A3o)
- [Uso](https://chat.openai.com/c/420175f8-6699-4ca1-8222-5d57874f6ad0#uso)

## Tecnologias Utilizadas

- Lista das principais tecnologias utilizadas no projeto, como linguagens de programação, frameworks, bibliotecas, etc.
  - Javascript
  - Node.js
  - Typescript
  - Prisma
  - Cors
  - Express
  - Multer
  - VsCode
  - Insomnia

## Instalação

- Instruções passo a passo sobre como instalar e configurar o projeto localmente.

  - Primeiramente realize o clone do repositório com o comando abaixo:

        git clone https://github.com/joaovictorgit/dashboard.git

  - Em seguida, instale todas as dependências:

        npm install

  - Antes de iniciar a aplicação, crie um arquivo chamado `.env` no diretório e copie o conteúdo do arquivo `.env.example` e troque os dados username e password para o seu login no pgAdmin:

        DATABASE_URL="postgresql://username:password@localhost:5432/dashboard-api?schema=public"

        PORT=3000

  - Após isso vamos gerar o banco de dados com as tabelas:

        npx migrate prisma dev --name init

## Uso

- Instruções sobre como utilizar o projeto após as configurações iniciais e instalação das dependências forem realizadas.

  - Execução da aplicação:

          npm run dev:ts

  - Testes

          npm test
