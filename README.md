# React + Vite

Projeto de Adoção de Animais
Bem-vindo ao projeto Adote Já! Esta aplicação é composta por um frontend em  React + Vite e um backend em Node.js, utilizando o Supabase como nossa base de dados e serviço de autenticação.

Estrutura do Projeto
Este é um monorepo, o que significa que tanto o frontend quanto o backend estão no mesmo repositório Git, organizados em pastas separadas:

/Application-for-animal-adoption
|-- /Backend/      <-- O seu backend (Node.js)
|-- /Frontend/        <-- O seu frontend (React + Vite)
|-- .gitignore        <-- O ficheiro para ignorar arquivos (IMPORTANTE)
|-- README.md         <-- Este guia

🚨 Regra de Ouro da Segurança
NUNCA, JAMAIS, envie ficheiros .env ou .env.local para o Git. Estes ficheiros contêm as suas chaves secretas (API Keys) do Supabase. Se estas chaves forem expostas, qualquer pessoa poderá aceder e manipular a sua base de dados.

Como Configurar o Projeto (Para Colaboradores)
Se você acabou de clonar este projeto, siga estes passos para configurar o seu ambiente de desenvolvimento:

1. Configurar o Backend (API)
# 1. Entre na pasta da API

cd Backend

# 1.1 Crie o seu arquivo, der o nome de .env

cd .env

# 1.2 Abra o arquivo .env que acabou de ser criado e preencha com as SUAS chaves do Supabase.

Cole esse codigo no seu .env 

PORT=3001
SUPABASE_URL= Sua Chave
SUPABASE_SERVICE_KEY= Sua Chave

# 1.3 Instale todas as dependências do projeto, espress, cors, dotenv e as dependecias para se conecta com o Banco de dados

O arquivo package.json ja fala quais dependecias o npm deve instala.

Execute esse comando.

npm install

# 1.4 Inicie o servidor da API

Execute esse comando.

node index.js

O seu servidor backend deverá estar a rodar em http://localhost:3001.

2. Configurar o Frontend (React)
# 2.1 Volte para a raiz e aceda à pasta do frontend

cd ../frontend

# 2.2 Crie o seu arquivo de ambiente local, der o nome de .env.local

cd .env.local

# 2.3 Abra o arquivo .env.local e preencha com as SUAS chaves do Supabase.

cole esse codigo no seu .env.local

VITE_SUPABASE_URL= Sua Chave
VITE_SUPABASE_ANON_KEY= Sua Chave

# 2.4 Instale todas as dependências do projeto

O arquivo package.json ja fala quais dependecias o npm deve instala.

Execute esse comando.

npm install

# 2.5 Inicie a aplicação React

npm run dev

A sua aplicação de frontend deverá estar acessível em http://localhost:5173.