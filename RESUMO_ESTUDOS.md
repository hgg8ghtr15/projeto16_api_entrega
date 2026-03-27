# API Entrega - Resumo de Estudos e Arquitetura

Este documento foi gerado para ajudar na revisão de todos os conceitos, configurações e estruturas implementadas na API até o momento.

---

## 1. Configuração do Servidor e Ambiente (Express + TSX)
- **Express v5:** O *framework* base para lidar com requisições HTTP (`req`, `res`). A partir da versão 5, o tratamento de erros em funções assíncronas é automático (não precisa mais da dependência `express-async-errors`).
- **TSX e Variáveis de Ambiente:** No arquivo `package.json`, configuramos o script de execução `"dev": "tsx watch --env-file .env src/server.ts"`. Isso permite rodar o código TypeScript diretamente, ficar assistindo (`watch`) modificações nos arquivos e já injetar nativamente as variáveis de ambiente (`--env-file`) que estão no nosso arquivo `.env`.

## 2. Tratamento Global de Erros e Validação (Zod)
Construímos um middleware focado em padronizar as respostas de erro em toda a aplicação (`src/middlewares/error-handling.ts`).
- **AppError:** Classe customizada para lançar erros previstos pelas nossas regras de negócio (como "E-mail já cadastrado" com código *400*).
- **Zod e ZodError:** Usamos o Zod para validação de esquemas (garantir que o *body* da requisição tenha os formatos e tipos de dados corretos). Se o erro detectado for um `ZodError`, retornarmos *status 400* e mapeamos as mensagens de validação formatadas bonitas com a nova função global `z.treeifyError(error)`.
- **Erro 500:** Se o erro não for customizado (`AppError`) nem de validação (`ZodError`), tratamos como uma falha não mapeada do servidor (*Internal server error*), evitando vazar detalhes vitais da infraestrutura no front-end.

## 3. Padrão de Arquitetura: Controllers e Rotas
Para manter o projeto organizado e com fácil visibilidade de responsabilidades, dividimos o roteamento em duas partes:
- **Rotas (`src/routes/users-routes.ts` & `index.ts`):** São responsáveis puramente por direcionar os caminhos da URL (endpoints como `POST /users` e `GET /users`) para as funções específicas. O arquivo `index.ts` funciona como a "porta de entrada" unificando todas as rotas (isso evita de poluir demais o arquivo principal `app.ts`).
- **Controllers (`src/controllers/users-controllers.ts`):** Recebem as requisições delegadas pelas rotas. São classes que englobam a parte de "o que a rota deve fazer". Por exemplo, extrair `name, email, password` de `req.body` e engatilhar a criação de um usuário, retornando as formatações JSON adequadas (`res.status(201).json()`).

## 4. Infraestrutura de Banco de Dados (Docker Compose e PostgreSQL)
Para não ter que intalar o banco de dados localmente na máquina sujando o SO, utilizamos Docker.
- **docker-compose.yml:** Define os *serviços* da nossa infraestrutura. Levantamos um container `postgres` utilizando a imagem `bitnami/postgresql:latest`.
- Mapeamos a porta padrão `5432:5432` para que consigamos acessar de ferramentas de banco e da própria API. Definimos o usuário, senha do postgres e instruímos ele a criar automaticamente o banco `api-entrega`.

## 5. Modelagem de Dados (Prisma ORM)
O Prisma facilita absurdamente a conversa da API com o Banco de Dados através do TypeScript, gerenciando *tipos* e as tabelas com facilidade.
- **Datasource & Generator:** No `schema.prisma` declaramos a string de conexão (geralmente lida do `.env`) com `provider = "postgresql"`. O gerador do `prisma-client` foi configurado para cuspir os tipos gerados (TypeScript) num diretório interno do nosso src (`../src/generated/prisma`).
- **Enums:** Foram criados enumeradores para limitar dinamicamente opções como O Papel de um Usuário (`UserRole`: `customer` ou `sale`) e o status das entregas (`DeliveryStatus`).
- **Tabelas (`model`):**
  - **User:** Possui IDs (`uuid`), dados sensíveis (email único e password), com tabelas customizadas mapeadas usando `@@map("users")`.
  - **Delivery:** Relaciona-se com `User` num relacionamento Um para Muitos (Um usuário tem várias entregas, uma entrega pertence a um único usuário usando `user User @relation(fields: [userId], references: [id])`).
  - **DeliveryLog:** Para rastrear o pacote gerando sub-registros que documentam os passos passo-a-passo (`processing` -> `shipped` -> `delivered`), também sendo 1:N com as entregas.
- Finalizamos registrando essas estruturas como tabelas fisicas no BD usando o sistema próprio de submissões do Prisma (`migrations`).
