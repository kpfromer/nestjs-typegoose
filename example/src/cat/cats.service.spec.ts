import { Cat } from "./cat.model";
import { CatsService } from "./cats.service";
import { TestingModule, Test } from "@nestjs/testing";
import { TypegooseModule } from "nestjs-typegoose";
import { TestDatabaseModule } from "../database/test-database.module";

const testCat = {
  name: "Mica"
}

describe('CatsService', () => {
  let module: TestingModule;
  let service: CatsService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TestDatabaseModule,
        TypegooseModule.forFeature([Cat])
      ],
      providers: [CatsService],
    }).compile();

    service = module.get<CatsService>(CatsService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should insert a new cat', async () => {
    const newCat = await service.create(testCat);
    expect(newCat.name).toEqual('Mica');
  });

  it('should return all cats', async () => {
    await expect(service.findAll()).resolves.toHaveLength(1);
    await service.create(testCat);
    await expect(service.findAll()).resolves.toHaveLength(2);
  });
});
