Sistema de Gerenciamento de Eventos
Projeto fullstack com:
Backend: Node.js + Express + JWT + MySQL
Frontend: HTML + CSS + JS + Bootstrap

Requisitos
Node.js >= 14

MySQL >= 5.7

Navegador (para o frontend)

Instalação do banco de dados
No seu MySQL, execute o SQL incluso no projeto:


mysql -u root -p < eventos-fullstack/eventos-backend/sql/sistema_eventos.sql
Isso cria o banco sistema_eventos e as tabelas usuarios e eventos.

Rodando o backend

cd eventos-fullstack/eventos-backend
npm install
npm start
O servidor inicia em http://localhost:3000

Usando o frontend
Abra o arquivo:


eventos-fullstack/eventos-frontend-html/login.html
No navegador.

O frontend consome os endpoints do backend:

Login: /auth/login

Cadastro: /auth/register (via API, ex: Postman)

Eventos: /eventos

Usuários: /usuarios (organizador apenas)

Funcionalidades
Login e Autenticação
Formulário no login.html → POST para /auth/login

Armazena JWT no localStorage

Token usado para acessar rotas protegidas

Eventos
Listar: GET /eventos

Criar: POST /eventos (apenas organizador)

Editar: PUT /eventos/:id (apenas organizador dono)

Excluir: DELETE /eventos/:id (apenas organizador dono)

Usuários
GET /usuarios → Lista usuários (apenas organizador)

Exemplo de corpo JSON (Cadastro de usuário - via API)

{
  "nome": "João",
  "email": "joao@exemplo.com",
  "senha": "123456",
  "role": "organizador"
}
Exemplo de corpo JSON (Criar evento)

{
  "nome": "NodeConf",
  "data": "2025-08-10",
  "local": "São Paulo",
  "descricao": "Evento sobre Node.js"
}
Observações
O backend protege as rotas com JWT
Apenas organizadores autenticados podem criar, editar e excluir eventos
O frontend envia o token no header das requisições:


Authorization: Bearer {token}
Fluxo recomendado
Crie um usuário organizador via API (ex: Postman) ou implemente cadastro no frontend
Faça login no login.html
Crie e gerencie eventos no index.html

Acesse usuarios.html para visualizar os usuários cadastrados (apenas organizador)

