---
id: multiple-connections
title: Multiple MongoDB Connections
---

To have multiple MongoDB connections one needs to add a `connectionName` string to `forRoot` and `forFeature`.

## `forRoot` usage

**app.module.ts**

```typescript
import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";

@Module({
  imports: [
    TypegooseModule.forRoot("mongodb://localhost:27017/otherdb", {
      useNewUrlParser: true,
      connectionName: "other-mongodb"
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

Here the CatsService will use the `other-mongodb` connection defined in the `forRoot`.

## `forRootAsync` usage

Same **cat.module.ts** as above for the `forFeature`.

**cat.module.ts**

```typescript
@Module({
  imports: [TypegooseModule.forFeature([Cat], "other-mongodb")],
  controllers: [CatsController],
  providers: [CatsService]
})
export class CatsModule {}
```

And for `forRootAsync` add `connectionName` to the options as well.

```typescript
@Module({
  imports: [
    TypegooseModule.forRootAsync({
      connectionName: "other-mongodb",
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.getString("MONGODB_URI"),
        // ...typegooseOptions (Note: config is spread with the uri)
      }),
      inject: [ConfigService]
    })
  ]
})
export class CatsModule {}