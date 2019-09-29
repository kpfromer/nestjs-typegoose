# nestjs-typegoose

[![NPM](https://nodei.co/npm/nestjs-typegoose.png)](https://nodei.co/npm/nestjs-typegoose/)
[![npm version](https://badge.fury.io/js/nestjs-typegoose.svg)](https://badge.fury.io/js/nestjs-typegoose)
[![Build Status](https://travis-ci.org/kpfromer/nestjs-typegoose.svg?branch=master)](https://travis-ci.org/kpfromer/nestjs-typegoose)
[![Coverage Status](https://coveralls.io/repos/github/kpfromer/nestjs-typegoose/badge.svg?branch=master)](https://coveralls.io/github/kpfromer/nestjs-typegoose?branch=master)

## Description

Injects [typegoose](https://github.com/szokodiakos/typegoose) models for [nest](https://github.com/nestjs/nest) components and controllers. Typegoose equivalant for [@nestjs/mongoose.](https://docs.nestjs.com/techniques/mongodb)

Using Typegoose removes the need for having a Model interface.

## Installation

`npm install --save nestjs-typegoose`

## Basic usage

**app.module.ts**

```typescript
import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";

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

Create class that extends [Typegoose](https://github.com/szokodiakos/typegoose#motivation)

**cat.model.ts**

```typescript
import { prop, Typegoose } from "@hasezoey/typegoose";
import { IsString } from "class-validator";

export class Cat extends Typegoose {
  @IsString()
  @prop({ required: true })
  name: string;
}
```

Inject Cat for `CatsModule`

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

Get the cat model in a service

**cats.service.ts**

```typescript
import { Injectable } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { Cat } from "./cat.model";
import { ModelType } from "@hasezoey/typegoose";

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat) private readonly catModel: ModelType<Cat>) {}

  async create(createCatDto: { name: string }): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return await createdCat.save();
  }

  async findAll(): Promise<Cat[] | null> {
    return await this.catModel.find().exec();
  }
}
```

Finally, use the service in a controller!

**cats.controller.ts**

```typescript
import { Controller, Get, Post, Body } from "@nestjs/common";
import { CatsService } from "./cats.service";

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

### Mongoose Schema Options

To add custom [mongoose schema options](http://mongoosejs.com/docs/guide.html#options)
you can simply change `Typegoose.forFeature` to the following format:

```typescript
@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: Cat,
        schemaOptions: {
          collection: "ADifferentCollectionNameForCats"
        }
      }
    ])
  ]
})
export class CatsModule {}
```

### Async Mongoose Schema Options

To provide asynchronous mongoose schema options (similar to [nestjs mongoose implementation](https://docs.nestjs.com/techniques/mongodb)) you can use the `TypegooseModule.forRootAsync`

```typescript
@Module({
  imports: [
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.getString("MONGODB_URI")
        // ...typegooseOptions (Note: config is spread with the uri)
      }),
      inject: [ConfigService]
    })
  ]
})
export class CatsModule {}
```

#### Note: typegooseOptions with async

The typegooseOptions is spread with the `uri`. The `uri` is required!

You can also use a class with `useClass`

```typescript
import {
  TypegooseOptionsFactory,
  TypegooseModuleOptions
} from "nestjs-typegoose";

class TypegooseConfigService extends TypegooseOptionsFactory {
  createTypegooseOptions():
    | Promise<TypegooseModuleOptions>
    | TypegooseModuleOptions {
    return {
      uri: "mongodb://localhost/nest"
    };
  }
}

@Module({
  imports: [
    TypegooseModule.forAsyncRoot({
      useClass: TypegooseConfigService
    })
  ]
})
export class CatsModule {}
```

Or if you want to prevent creating another `TypegooseConfigService` class and want to use it from another imported module then use `useExisting`

```typescript
@Module({
  imports: [
    TypegooseModule.forAsyncRoot({
      imports: [ConfigModule],
      useExisting: ConfigService
    })
  ]
})
export class CatsModule {}
```

### Multiple MongoDB Connections

To have multiple mongoDB connections one needs to add a `connectionName` string to `forRoot` and `forFeature`.

**app.module.ts**

```typescript
import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";

@Module({
  imports: [
    TypegooseModule.forRoot("mongodb://localhost:27017/otherdb", {
      useNewUrlParser: true,
      connctionName: "other-mongodb"
    }),
    CatsModule
  ]
})
export class ApplicationModule {}
```

**cat.module.ts**

```typescript
@Module({
  imports: [TypegooseModule.forFeature([Cat], "other-mongodb")],
  controllers: [CatsController],
  providers: [CatsService]
})
export class CatsModule {}
```

And for `forAsyncRoot` add `connectionName` to the options as well.

```typescript
@Module({
  imports: [
    TypegooseModule.forAsyncRoot({
      connectionName: "other-mongodb",
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.getString("MONGODB_URI"),
        connectionName: config
        // ...typegooseOptions (Note: config is spread with the uri)
      }),
      inject: [ConfigService]
    })
  ]
})
export class CatsModule {}
```

## Testing

Like [@nestjs/mongoose](https://docs.nestjs.com/v5/techniques/mongodb) (see the testing section) nestjs-typegoose's `forFeature` and `forRoot` rely on a database connection to work. To unit test your `CatService` without connecting to a mongo database you need to create a fake model using a [custom provider](https://docs.nestjs.com/fundamentals/custom-providers).

```typescript
import { getModelToken } from "nestjs-typegoose";

...

@Module({
  ProductService,
  {
    provide: getModelToken('Product'),
    useValue: fakeProductModel
  }
})
```

In a spec file this would look like:

```typescript
const module: TestingModule = await Test.createTestingModule({
  providers: [
    {
      provide: getModelToken("Product"),
      useValue: productModel
    },
    ProductService
  ]
}).compile();
```

The string given to `getModelToken` function should be the class name of the typegoose model that you are testing.

## FAQ

---

**Q:** 'useNewUrlParser' does not exist in type 'TypegooseConnectionOptions'

**A:** Make sure that you have the typings for mongoose installed. `npm install --save-dev @types/mongoose`

---

## Requirements

1.  @hasezoey/typegoose +5.9.2
2.  @nestjs/common +5.0.0
3.  @nestjs/core +5.0.0
4.  mongoose (with typings `@types/mongoose`) +5.1.1

## License

nestjs-typegoose is [MIT licensed](LICENSE).
