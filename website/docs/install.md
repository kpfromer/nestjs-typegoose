---
id: install
title: Installation
---

:::note
This assumes you have a nestjs project to work with. If you don't I recommend that you use [nestjs cli](https://docs.nestjs.com/cli/overview) to jump start an example to project to get started using `nestjs-typegoose`.
:::

Using `npm`:

`npm install --save nestjs-typegoose`

Using `yarn`:

`yarn add nestjs-typegoose`


## Peer Dependencies

nestjs-typegoose requires a few peer dependencies to be install for things to work. You need to install the following:

- `@typegoose/typegoose` version +6.1.5
- `@nestjs/common` +6.10.1
- `@nestjs/core` +6.10.1
- `mongoose` (with the typings `@types/mongoose`) +5.7.12

Using `npm`:

`npm install --save @typegoose/typegoose @nestjs/common @nestjs/core mongoose` **and** `npm install --save-dev @types/mongoose`

Using `yarn`:

`yarn add @typegoose/typegoose @nestjs/common @nestjs/core mongoose` **and** `yarn add --dev @types/mongoose`

Now you are ready to get [ready to start](usage.md) using `nestjs-typegoose`!