---
id: schema-options
title: Schema Options
---

To add custom [mongoose schema options](http://mongoosejs.com/docs/guide.html#options) you can simply change `Typegoose.forFeature` to the following format:

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