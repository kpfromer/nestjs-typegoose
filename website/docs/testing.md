---
id: testing
title: Testing
---

Like [@nestjs/mongoose](https://docs.nestjs.com/v5/techniques/mongodb) (see the testing section) nestjs-typegoose's `forFeature` and `forRoot` rely on a database connection to work. To unit test your `CatService` without connecting to a mongo database you need to create a fake model using a [custom provider](https://docs.nestjs.com/fundamentals/custom-providers).

```typescript
import { getModelToken } from "nestjs-typegoose";

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

const fakeProductModel = jest.fn();

const module: TestingModule = await Test.createTestingModule({
  providers: [
    {
      provide: getModelToken("Product"),
      useValue: fakeProductModel
    },
    ProductService
  ]
}).compile();
```

The string given to `getModelToken` function should be the class name of the typegoose model that you are testing.

<!-- TODO: document using a in memory mongo database -->