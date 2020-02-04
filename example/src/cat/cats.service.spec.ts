// Inspired by https://github.com/jmcdo29/testing-nestjs/blob/master/apps/mongo-sample/src/cat/cat.service.spec.ts

import { Cat } from "./cat.model";
import { CatsService } from "./cats.service";
import { ReturnModelType } from "@typegoose/typegoose";
import { TestingModule, Test } from "@nestjs/testing";
import { getModelToken } from "nestjs-typegoose";

const mockCat: (mock?: {
  name: string;
}) => Cat = (mock?: {
  name: string;
}) => {
  return {
    name: (mock && mock.name) || 'Ventus',
  };
};

const catsArray: Cat[] = [
  mockCat(),
  mockCat({ name: 'Vitani' }),
  mockCat({ name: 'Simba' }),
];

describe('CatsService', () => {
  let service: CatsService;
  let model: ReturnModelType<typeof Cat>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: getModelToken('Cat'),
          // notice that only the functions we call from the model are mocked
          useValue: {
            new: jest.fn().mockResolvedValue(mockCat()),
            constructor: jest.fn().mockResolvedValue(mockCat()),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CatsService>(CatsService);
    model = module.get<ReturnModelType<typeof Cat>>(getModelToken('Cat'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // In all the spy methods/mock methods we need to make sure to
  // add in the property function exec and tell it what to return
  // this way all of our mongo functions can and will be called
  // properly allowing for us to successfully test them.
  it('should return all cats', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(catsArray),
    } as any);
    await expect(service.findAll()).resolves.toEqual(catsArray);
  });
  it('should insert a new cat', async () => {
    jest.spyOn(model, 'create').mockResolvedValueOnce({
      name: 'Oliver',
    } as any); // dreaded as any, but it can't be helped
    const newCat = await service.create({
      name: 'Oliver'
    });
    expect(newCat).toEqual(mockCat({ name: 'Oliver' }));
  });
});
