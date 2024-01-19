# URL SHORTENER API

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Setup inicial

Clone o projeto para a sua máquina pessoal.

Após clonar o projeto, crie um arquivo `.env` na raiz do projeto para definir as variáveis de ambiente necessárias. Você pode usar o arquivo `.env.example` fornecido como modelo para criar o seu arquivo `.env`.

## Installation

```bash
$ npm install
```

## Setup Database and Execute Migrations

Antes de executar a aplicação, inicie o banco de dados usando o Docker Compose e execute as migrations:

```bash
$ docker-compose up -d

$ npm run typeorm migration:run
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Acessando a Documentação do Swagger

Após iniciar a aplicação, você pode acessar a documentação do Swagger visitando o seguinte URL no seu navegador:

http://localhost:3000/docs

Substitua `3000` pela porta em que sua aplicação está rodando, se for diferente.

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Author

- Igor Felipe Sales - igorsales.fs@gmail.com

## License

Nest is [MIT licensed](LICENSE).
