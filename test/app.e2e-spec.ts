import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { Body, Controller, Module, Post } from '@nestjs/common';
import { InjectModel, TypegooseModule } from '../src';
import { prop } from '@typegoose/typegoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();

@Module({
  imports: [TypegooseModule.forRoot('mongoose:uri')]
})
export class MockApp {
}

class MockTypegooseClass {

  @prop()
  description;
}

@Controller()
class MockController {
  constructor(@InjectModel(MockTypegooseClass) private readonly model: any) {
  } // In reality, it's a Model<schema of MockTypegooseClass>

  @Post('create')
  async createTask(@Body() body: { description: string }) {
    return this.model.create({
      description: body.description
    });
  }

  @Post('get')
  async getTask(@Body() body: { description: string }) {
    return this.model.findOne({
      description: body.description
    });
  }

}

@Module({
  imports: [TypegooseModule.forFeature([MockTypegooseClass])],
  controllers: [MockController]
})
class MockSubModule {
}

describe('App consuming TypegooseModule', () => {
  let app;

  beforeAll(async () => {
    await mongod.getConnectionString();

    const moduleFixture = await Test.createTestingModule({
      imports: [MockApp, MockSubModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should store and get mockTask', async () => {
    await request(app.getHttpServer())
      .post('/create')
      .send({
        description: 'hello world'
      });

    const response = await request(app.getHttpServer())
      .post('/get')
      .send({
        description: 'hello world'
      });

    const body = response.body;

    expect(body._id).toBeTruthy();
    expect(body.description).toBe('hello world');
  });

  afterAll(() => mongod.stop());
});
