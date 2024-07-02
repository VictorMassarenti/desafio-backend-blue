# Instruções de instalação e execução do projeto

Para instalar e executar o projeto, siga as etapas abaixo:

1. Certifique-se de ter o [Node.js](https://nodejs.org) instalado em sua máquina.
2. Faça o clone deste repositório para o seu ambiente local.
3. Navegue até o diretório raiz do projeto.
4. Modifique o `.env.example` para `.env`.
5. Certifique-se de passar uma `DATABASE_URL` válida na variável de ambiente.
6. Abra um terminal e execute o comando `yarn` para instalar as dependências do projeto.
7. Execute o comando `npx prisma migrate dev` isso garantirá que a estrutura do banco de dados esteja atualizada com o schema do prisma.
8. Após a conclusão dos passos anteriores, execute o comando `yarn dev` para iniciar o servidor em modo de desenvolvimento.
9. O servidor estará disponível em `http://localhost:8080` ou na porta preenchida nas variáveis de ambiente `API_PORT`.

_Visualize [aqui](https://prisma-editor.vercel.app/schema/6994) uma prévia da estrutura do banco de dados_

# Descrição das tecnologias utilizadas

Este projeto utiliza as seguintes tecnologias:

- Node.js: plataforma de desenvolvimento JavaScript do lado do servidor.
- Express.js: framework web para construção de APIs RESTful.
- Prisma: Ferramenta ORM para modelagem de banco de dados, migrações e mais.
- Typescript: Linguagem de programação que é um superset de JavaScript, adicionando tipos estáticos.
- bcrypt: Uma biblioteca para ajudar na criptografia de senhas.
- dotenv: Carrega variáveis de ambiente de um arquivo .env para process.env.
- jsonwebtoken: Implementação de JSON Web Tokens para Node.js.
- pdfkit: Um kit de ferramentas para geração de PDFs em Node.js e no navegador.
- zod: Uma biblioteca de validação de dados TypeScript-first.
- ts-node: Ferramenta para execução de TypeScript diretamente, sem necessidade de compilação prévia.

# Lista de rotas disponíveis e como utilizá-las

A seguir, estão listadas as rotas disponíveis neste projeto e exemplos de requisição:

- `/api/users/login` (POST): Rota para login e autenticação, retorna um token válido.

  ```json
  {
    "username": "exemplo",
    "password": "exemplo-senha"
  }
  ```

- `/api/users/register` (POST): Rota para registro de usuário no sistema.

  ```json
  {
    "username": "exemplo",
    "password": "exemplo-senha"
  }
  ```

---

### Rotas protegidas abaixo (Necessária autenticação Bearer Token)

- `/api/appointment` (POST): Cria um novo agendamento e gera um arquivo .pdf na pasta "PDF" localizada na raiz do projeto. Requer validação dos dados. Retornar o

  ```json
  {
    "date": "2023-04-12T17:00:00Z"
  }
  ```

- `/api/appointment/:id` (GET): Obtém os detalhes de um agendamento específico pelo ID.
- `/api/appointment/:id` (PATCH): Atualiza um agendamento existente pelo ID. Requer validação dos dados de atualização.

  ```json
  {
    "date": "2024-01-22T09:00:00Z"
  }
  ```

- `/api/appointment/:id` (DELETE): Cancela um agendamento existente pelo ID. Apesar de ser um método 'delete' optei
  por não excluir os registros da consulta no banco de dados, e apenas mudar o status para false, representando um cancelamento.

Para utilizar essas rotas, você pode utilizar uma ferramenta como o [Postman](https://www.postman.com/) ou enviar requisições HTTP diretamente para o servidor.
