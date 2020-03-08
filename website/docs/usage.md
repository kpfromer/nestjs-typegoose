---
id: usage
title: Basic Usage
---

:::note
Checkout this [example project](https://github.com/kpfromer/nestjs-typegoose/tree/master/example) if you need help.
:::

You can checkout the `example` project for more details.

We will creating a `CatsModule`, a `Cat` database model, a `CatsService`, and a `CatsController`.


## Connecting to the mongoodb database

First we will connect to the mongo database using `TypegooseModule.forRoot`. We will import the `CatsModule` that we will create shortly.

If want to have more connections to different databases read about how to do that [here](multiple-connections.md).

**app.module.ts**

```typescript
import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { CatsModule } from "./cat.module.ts";

@Module({
  imports: [
    TypegooseModule.forRoot("mongodb://localhost:27017/nest", {
      useNewUrlParser: true
    }),
    CatsModule
  ]
})
export class ApplicationModule {}
```

Here we are connecting to `mongodb://localhost:27017/nest`. To learn more about mongodb uri's see the official [mongodb article](https://docs.mongodb.com/manual/reference/connection-string/).

## Creating a Database Model

We now need to create a database model that describes the data we want to store. In this case it will be cats with names. Read more about typegoose [here](https://github.com/typegoose/typegoose).

**cat.model.ts**

```typescript
import { prop } from "@typegoose/typegoose";

export class Cat {
  @prop({ required: true })
  name: string;
}
```

## Creating the service

We need to create a service to handle the business logic of creating, reading, updating, and deleting (CRUD) entires, or cats, in the database.

**cats.service.ts**

```typescript
import { Injectable } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { Cat } from "./cat.model";
import { ReturnModelType } from "@typegoose/typegoose";

@Injectable()
export class CatsService {
  constructor(
    @InjectModel(Cat) private readonly catModel: ReturnModelType<typeof Cat>
  ) {}

  async create(createCatDto: { name: string }): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return await createdCat.save();
  }

  async findAll(): Promise<Cat[] | null> {
    return await this.catModel.find().exec();
  }
}
```

## Connecting with the API

Now we have the service created we need to connect this with the actual api calls. The `CatsController` will receive GET and POST requests on the url `/cats` and will get and create cats respectively.

**cats.controller.ts**

```typescript
import { Controller, Get, Post, Body } from "@nestjs/common";
import { CatsService } from "./cats.service";
import { Cat } from "./cats.model.ts";

@Controller("cats")
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async getCats(): Promise<Cat[] | null> {
    return await this.catsService.findAll();
  }

  @Post()
  async create(@Body() cat: Cat): Promise<Cat> {
    return await this.catsService.create(cat);
  }
}
```

## Providing the model for our services

We have to make sure we provide the needed models to our service with `TypegooseModule.forFeature` for the `InjectModel` to work. This helps prevents unauthorized access to other models.

**cat.module.ts**

```typescript
import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { Cat } from "./cat.model";
import { CatsController } from "./cats.controller";
import { CatsService } from "./cats.service";

@Module({
  imports: [TypegooseModule.forFeature([Cat])],
  controllers: [CatsController],
  providers: [CatsService]
})
export class CatsModule {}
```

That's it, you have created a simple working api with `nestjs-typegoose`!