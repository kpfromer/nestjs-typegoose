---
id: discriminators
title: Mongoose Discriminators
---

To add [discriminators](https://mongoosejs.com/docs/discriminators.html) to a model, you may specify a `discriminators` array in the long-form options shown above.

You may either add just the class, or if you need to override the [discriminator key](https://mongoosejs.com/docs/discriminators.html#discriminator-keys) value, an object with `typegooseClass` and `discriminatorId` property. 

For example:
```typescript
class Tabby extends Cat {
  @prop()
  spotted: boolean 
}

class BlackCat extends Cat {
  @prop()
  unlucky: boolean
}

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: Cat,
        discriminators: [
          Tabby,
          {
            typegooseClass: BlackCat,
            discriminatorId: 'Black'
          }
        ]
      }
    ])
  ]
})
export class CatsModule {}
```
