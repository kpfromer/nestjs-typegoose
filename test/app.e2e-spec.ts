import * as request from "supertest";
import { Test } from "@nestjs/testing";
import {
  Body,
  Controller,
  Module,
  Post,
  INestApplication
} from "@nestjs/common";
import { InjectModel, TypegooseModule, getModelToken } from "../src";
import { prop } from "@typegoose/typegoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const mongod = new MongoMemoryServer();

@Module({
  imports: [TypegooseModule.forRoot("mongoose:uri")]
})
export class MockApp {}

class MockTypegooseClass {
  @prop()
  description;
}

class MockDiscriminatorParent extends MockTypegooseClass {
  @prop()
  isParent: boolean;
}

class MockDiscriminator extends MockDiscriminatorParent {
  @prop()
  isSubtype: boolean;
}

@Controller()
class MockController {
  constructor(@InjectModel(MockTypegooseClass) private readonly model: any) {} // In reality, it's a Model<schema of MockTypegooseClass>

  @Post("create")
  async createTask(@Body() body: { description: string }) {
    return this.model.create({
      description: body.description
    });
  }

  @Post("get")
  async getTask(@Body() body: { description: string }) {
    return this.model.findOne({
      description: body.description
    });
  }
}

@Controller()
class MockSubController {
  constructor(@InjectModel(MockDiscriminator) private readonly model: any) {} // In reality, it's a Model<schema of MockDiscriminator>

  @Post("createSubTask")
  async createSubTask(
    @Body() body: { description: string; isSubtype: boolean }
  ) {
    return this.model.create({
      description: body.description,
      isParent: false,
      isSubtype: body.isSubtype
    });
  }

  @Post("getSubTask")
  async getSubTask(@Body() body: { isSubtype: boolean }) {
    return this.model.findOne({
      isSubtype: body.isSubtype
    });
  }
}

@Module({
  imports: [
    TypegooseModule.forFeature([
      MockTypegooseClass,
      {
        typegooseClass: MockDiscriminatorParent,
        discriminators: [MockDiscriminator]
      }
    ])
  ],
  controllers: [MockController, MockSubController]
})
class MockSubModule {}

describe("App consuming TypegooseModule", () => {
  let app;

  beforeAll(async () => {
    await mongod.getConnectionString();

    const moduleFixture = await Test.createTestingModule({
      imports: [MockApp, MockSubModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(() => mongod.stop());

  it("should store and get mockTask", async () => {
    await request(app.getHttpServer())
      .post("/create")
      .send({
        description: "hello world"
      });

    const response = await request(app.getHttpServer())
      .post("/get")
      .send({
        description: "hello world"
      });

    const body = response.body;

    expect(body._id).toBeTruthy();
    expect(body.description).toBe("hello world");
  });
});

describe("Clear typegoose state after module destroy", () => {
  let app: INestApplication;

  beforeAll(async () => {
    await mongod.getConnectionString();
  });

  afterAll(() => mongod.stop());

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [MockApp, MockSubModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  Array.from({ length: 2 }).forEach(() => {
    it("resolved model should use correct connection", async () => {
      const model = await app.get(getModelToken(MockTypegooseClass.name));
      await model.create({
        description: "test"
      });
    });
  });

  it("should store and get mockSubTask", async () => {
    await request(app.getHttpServer())
      .post("/createSubTask")
      .send({
        description: "hello world",
        isSubtype: true
      });

    const response = await request(app.getHttpServer())
      .post("/getSubTask")
      .send({
        description: "hello world",
        isSubtype: true
      });

    const body = response.body;

    expect(body._id).toBeTruthy();
    expect(body.isParent).toBe(false);
    expect(body.isSubtype).toBe(true);
  });
});
