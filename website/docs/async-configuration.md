---
id: async-configuration
title: Async Configuration
---

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

The typegooseOptions is spread with the `uri`. The `uri` is **required**!

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
    TypegooseModule.forRootAsync({
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
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: ConfigService
    })
  ]
})
export class CatsModule {}
```