# nestjs-typegoose
[![NPM](https://nodei.co/npm/nestjs-typegoose.png)](https://nodei.co/npm/nestjs-typegoose/)
[![npm version](https://badge.fury.io/js/nestjs-typegoose.svg)](https://badge.fury.io/js/nestjs-typegoose)
[![Build Status](https://travis-ci.org/kpfromer/nestjs-typegoose.svg?branch=master)](https://travis-ci.org/kpfromer/nestjs-typegoose)
[![Coverage Status](https://coveralls.io/repos/github/kpfromer/nestjs-typegoose/badge.svg?branch=master)](https://coveralls.io/github/kpfromer/nestjs-typegoose?branch=master)

## Description

Injects [typegoose](https://github.com/szokodiakos/typegoose) models for [nest](https://github.com/nestjs/nest) components and controllers. Typegoose equivalant for [@nestjs/mongoose.](https://docs.nestjs.com/techniques/mongodb)

Using Typegoose removes the need for having an Model interface.

## Installation

`npm install --save nestjs-typegoose`

## Basic usage

  **app.module.ts**
```typescript
import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [TypegooseModule.forRoot('mongodb://localhost/nest'), CatsModule],
})
export class ApplicationModule {}
```

Create class that extends [Typegoose](https://github.com/szokodiakos/typegoose#motivation)

**cat.model.ts**
```typescript
import { prop, Typegoose } from 'typegoose';
import { IsString } from 'class-validator';

export class Cat extends Typegoose {
  @IsString()
  @prop({ required: true })
  name: string;
}
```

Inject Cat for `CatsModule`

**cat.module.ts**
```typescript
import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Cat } from './cat.model';
import { CatsService } from './cat.service';

@Module({
  imports: [TypegooseModule.forFeature(Cat)],
  components: [CatsService]
})
export class CatsModule {}
```

Get the cat model in a service

**cats.service.ts**
```typescript
import { Component } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatSchema } from './schemas/cat.schema';

@Component()
export class CatsService {
  constructor(@InjectModel(Cat) private readonly catModel) {}

  async create(createCatDto: {name: string}): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return await createdCat.save();
  }

  async findAll(): Promise<Cat[]> {
    return await this.catModel.find().exec();
  }
}
```

## Requirements

 1. Typegoose +5.0.0
 2. @nestjs/common +4.6.6
 3. mongoose +5.0.14

## License

  nestjs-typegoose is [MIT licensed](LICENSE).