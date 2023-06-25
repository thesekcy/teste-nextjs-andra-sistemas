
Esse é um projeto [Next.js](https://nextjs.org/) criado com [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

  

## Rodando pela primeira vez

  

Primeiramente instale todas as dependencias com.

  

```bash
npm  install
# or
yarn  install
```

Depois para rodar o projeto basta usar os comandos abaixo:
```bash
npm  run  dev
# or
yarn  dev
```

Para rodar os testes basta utilizar
```bash
npm  run  test
# or
yarn  test
```
  

O projeto ficará disponivel em[http://localhost:3000](http://localhost:3000).



  

## Sobre o projeto

  O projeto foi desenvolvido para um teste, visando a vaga de Desenvolvedor Nextjs na [Andra Sistemas](andrasistemas.com.br/) e se trata de um CRUD.

O projeto está disponivel em: https://teste-nextjs-andra-sistemas.vercel.app/
O email e senha necessario para acessar o projeto foi/é fornecido pela [Andra Sistemas](andrasistemas.com.br/).

**As técnologias utilizadas no projeto foram:**
- HTML 5, CSS e Javascript
- NextJS e ReactJS
- Typescript
- Material UI e Bootstrap CSS
- JSON Web Token
- SweetAlert2
- Axios
- Jest e React Testing Library

  
## Arquivos e Rotas
As rotas são baseadas em arquivos, e com as funcionalidades disponibilizadas pelo Next.js 13, como a pasta /app.

As rotas são divididas em Public Routes e Private Routes, e separados como (public) e (authenticated), uma nova maneira de criar grupos de rotas com as novas funcionalidades do Next.js 13.

Rotas disponiveis:

*(public)*
 - /login

*(authenticated)*
 - /
 - /create
 - /edit/[id]