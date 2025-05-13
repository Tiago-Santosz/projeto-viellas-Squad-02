# Projeto Viellas - Squad 2


## Techs 

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">This Project used NestJS as principal framework, so here come some NestJS infos:</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

<p align="center"> We also used docker for database, and Swagger for documentation.</p>
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://static1.smartbear.co/swagger/media/assets/images/swagger_logo.svg" width="350" alt="Nest Logo" /></a>
</p>

## Description

## Structure
```
src/
│
├── infra/                          # Infraestrutura e configurações base
│   └── auth/                       # Módulo de autenticação
│       ├── tests/                 # Testes relacionados à autenticação
│       ├── auth.controller.ts     # Controller de autenticação
│       ├── auth.guard.ts          # Guardas de rota
│       ├── auth.module.ts         # Módulo de autenticação
│       ├── auth.service.ts        # Serviço de autenticação
│       └── constants.ts           # Constantes do módulo
│
├── modules/                       # Domínio da aplicação (DDD)
│   ├── admin/                     # Módulo Admin
│   │   ├── entities/              # Entidades relacionadas
│   │   ├── admin.controller.ts
│   │   ├── admin.module.ts
│   │   ├── admin.repository.ts
│   │   └── admin.service.ts
│   │
│   ├── common/                    # Recursos compartilhados
│   │   └── enums/                 # Enums utilizados globalmente
│   │
│   ├── customers/                 # Módulo Customer
│   │   ├── dto/                   # Data Transfer Objects
│   │   ├── entities/              # Entidades relacionadas
│   │   ├── tests/                 # Testes do módulo
│   │   ├── customer.controller.ts
│   │   ├── customer.module.ts
│   │   ├── customer.repository.ts
│   │   └── customer.service.ts
│   │
│   ├── photo/                     # Módulo Photo
│   │   ├── dto/                   # DTOs
│   │   ├── entities/              # Entidades
│   │   ├── tests/                 # Testes
│   │   ├── photo.controller.ts
│   │   ├── photo.module.ts
│   │   ├── photo.repository.ts
│   │   └── photo.service.ts
│   │
│   ├── purchase/                  # Módulo Purchase
│   │   ├── dto/                   # DTOs
│   │   ├── purchase.module.ts
│   │   ├── purchase.repository.ts
│   │   └── purchase.service.ts
│   │
│   └── users/                     # Módulo User
│       ├── dto/                   # DTOs
│       ├── entities/              # Entidades
│       ├── tests/                 # Testes
│       ├── user.controller.ts
│       ├── user.module.ts
│       ├── user.repository.ts
│       └── user.service.ts
│
├── database.module.ts             # Módulo global de banco de dados
├── main.ts                        # Entry point da aplicação
├── app.module.ts                  # Módulo principal
├── app.controller.ts              # Controller principal
├── app.service.ts                 # Serviço principal
│
├── app.controller.spec.ts         # Teste do controller principal
├── app.e2e-spec.ts                # Testes end-to-end
├── jest.config.json               # Configuração do Jest
└── .env                           # Variáveis de ambiente

```

## Project setup
Just start by clonning the repository
```bash
$ git clone https://github.com/Tiago-Santosz/projeto-viellas-Squad-02.git
```

Then get into the folder
```bash
$ cd projeto-viellas-Squad-02
```

Run this command to install the dependencies
```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Our test coverage:

| File                            | % Stmts  | % Branch | % Funcs | % Lines | Uncovered Line #s       |
|----------------------------------|----------|----------|---------|---------|-------------------------|
| **All files**                    | <span style="color: yellow;">57.08</span>   | <span style="color: yellow;">61.53</span>    | <span style="color: yellow;">41.22</span>   | <span style="color: yellow;">58.12</span>   |                         |
| **src**                           | <span style="color: red;">41.93</span>   | <span style="color: red;">0</span>        | <span style="color: green;">75</span>      | <span style="color: red;">36</span>      |                         |
| &nbsp;&nbsp;app.controller.ts    | <span style="color: green;">100</span>     | <span style="color: green;">100</span>      | <span style="color: green;">100</span>     | <span style="color: green;">100</span>     |                         |
| &nbsp;&nbsp;app.module.ts        | <span style="color: red;">0</span>       | <span style="color: green;">100</span>      | <span style="color: green;">100</span>     | <span style="color: red;">0</span>       | 1-17                    |
| &nbsp;&nbsp;app.service.ts       | <span style="color: green;">100</span>     | <span style="color: green;">100</span>      | <span style="color: green;">100</span>     | <span style="color: green;">100</span>     |                         |
| &nbsp;&nbsp;main.ts              | <span style="color: red;">0</span>       | <span style="color: red;">0</span>        | <span style="color: red;">0</span>       | <span style="color: red;">0</span>       | 1-8                     |
| **src/infra**                    | <span style="color: red;">0</span>       | <span style="color: green;">100</span>      | <span style="color: red;">0</span>       | <span style="color: red;">0</span>       |                         |
| &nbsp;&nbsp;database.module.ts   | <span style="color: red;">0</span>       | <span style="color: green;">100</span>      | <span style="color: red;">0</span>       | <span style="color: red;">0</span>       | 1-28                    |
| **src/infra/auth**               | <span style="color: yellow;">63.15</span>   | <span style="color: yellow;">37.5</span>     | <span style="color: yellow;">62.5</span>    | <span style="color: yellow;">61.22</span>   |                         |
| &nbsp;&nbsp;auth.controller.ts   | <span style="color: green;">100</span>     | <span style="color: green;">100</span>      | <span style="color: green;">100</span>     | <span style="color: green;">100</span>     |                         |
| &nbsp;&nbsp;auth.guard.ts        | <span style="color: red;">33.33</span>   | <span style="color: red;">0</span>        | <span style="color: red;">0</span>       | <span style="color: yellow;">25</span>      | 14-40                   |
| &nbsp;&nbsp;auth.module.ts       | <span style="color: red;">0</span>       | <span style="color: green;">100</span>      | <span style="color: green;">100</span>     | <span style="color: red;">0</span>       | 2-22                    |
| &nbsp;&nbsp;auth.service.ts      | <span style="color: green;">100</span>     | <span style="color: green;">100</span>      | <span style="color: green;">100</span>     | <span style="color: green;">100</span>     |                         |
| &nbsp;&nbsp;constants.ts         | <span style="color: green;">100</span>     | <span style="color: green;">100</span>      | <span style="color: green;">100</span>     | <span style="color: green;">100</span>     |                         |
| **src/modules/admin**            | <span style="color: red;">0</span>       | <span style="color: green;">100</span>      | <span style="color: red;">0</span>       | <span style="color: red;">0</span>       |                         |
| &nbsp;&nbsp;admin.controller.ts  | <span style="color: red;">0</span>       | <span style="color: green;">100</span>      | <span style="color: green;">100</span>     | <span style="color: red;">0</span>       | 1-6                     |
| &nbsp;&nbsp;admin.module.ts      | <span style="color: red;">0</span>       | <span style="color: green;">100</span>      | <span style="color: red;">0</span>       | <span style="color: red;">0</span>       | 2-18                    |
| &nbsp;&nbsp;admin.repository.ts  | <span style="color: red;">0</span>       | <span style="color: green;">100</span>      | <span style="color: red;">0</span>       | <span style="color: red;">0</span>       | 1-27                    |
| &nbsp;&nbsp;admin.service.ts     | <span style="color: red;">0</span>       | <span style="color: green;">100</span>      | <span style="color: red;">0</span>       | <span style="color: red;">0</span>       | 1-22                    |
| **src/modules/admin/entities**  | <span style="color: red;">0</span>       | <span style="color: green;">100</span>      | <span style="color: red;">0</span>       | <span style="color: red;">0</span>       |                         |
| &nbsp;&nbsp;admin.entity.ts      | <span style="color: red;">0</span>       | <span style="color: green;">100</span>      | <span style="color: red;">0</span>       | <span style="color: red;">0</span>       | 1-17                    |
| **src/modules/common/enums**    | <span style="color: yellow;">57.69</span>   | <span style="color: yellow;">60</span>       | <span style="color: yellow;">60</span>      | <span style="color: yellow;">57.69</span>   |                         |
| &nbsp;&nbsp;enum-category.enum.ts| <span style="color: green;">100</span>     | <span style="color: green;">100</span>      | <span style="color: green;">100</span>     | <span style="color: green;">100</span>     |                         |
| &nbsp;&nbsp;enum-license.enum.ts | <span style="color: red;">0</span>       | <span style="color: red;">0</span>        | <span style="color: red;">0</span>       | <span style="color: red;">0</span>       | 1-5                     |
| &nbsp;&nbsp;enum-paymentMethod.enum.ts | <span style="color: green;">100</span> | <span style="color: green;">100</span>      | <span style="color: green;">100</span>     | <span style="color: green;">100</span>     |                         |
| &nbsp;&nbsp;enum-planType.enum.ts| <span style="color: green;">100</span>     | <span style="color: green;">100</span>      | <span style="color: green;">100</span>     | <span style="color: green;">100</span>     |                         |
| &nbsp;&nbsp;enum-position.enum.ts| <span style="color: red;">0</span>       | <span style="color: red;">0</span>        | <span style="color: red;">0</span>       | <span style="color: red;">0</span>       | 1-6                     |
| **src/modules/customers**        | <span style="color: green;">68.96</span>   | <span style="color: green;">100</span>      | <span style="color: yellow;">57.14</span>   | <span style="color: green;">68</span>      |                         |
| &nbsp;&nbsp;customer.controller.ts| <span style="color: green;">92.85</span>  | <span style="color: green;">100</span>      | <span style="color: green;">75</span>      | <span style="color: green;">91.66</span>   | 40                      |
| &nbsp;&nbsp;customer.module.ts   | <span style="color: red;">0</span>       | <span style="color: green;">100</span>      | <span style="color: green;">100</span>     | <span style="color: red;">0</span>       | 1-15                    |
| &nbsp;&nbsp;customer.repository.ts| <span style="color: yellow;">58.33</span>  | <span style="color: green;">100</span>      | <span style="color: red;">0</span>       | <span style="color: yellow;">50</span>      | 12-28                   |
| &nbsp;&nbsp;customer.service.ts  | <span style="color: green;">90.9</span>    | <span style="color: green;">100</span>      | <span style="color: green;">100</span>     | <span style="color: green;">90</span>      | 42-43                   |
| **src/modules/customers/dto**   | <span style="color: yellow;">75</span>      | <span style="color: green;">100</span>      | <span style="color: red;">0</span>       | <span style="color: yellow;">75</span>      |                         |
| &nbsp;&nbsp;create.dto.ts        | <span style="color: green;">83.33</span>   | <span style="color: green;">100</span>      | <span style="color: red;">0</span>       | <span style="color: green;">83.33</span>   | 14                      |
| &nbsp;&nbsp;update.dto.ts        | <span style="color: yellow;">71.42</span>   | <span style="color: green;">100</span>      | <span style="color: red;">0</span>       | <span style="color: yellow;">71.42</span>   | 10,15,20,25             |
