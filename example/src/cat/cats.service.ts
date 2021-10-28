import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { Cat } from './cat.model'
import { ReturnModelType } from '@typegoose/typegoose'

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat) private readonly catModel: ReturnModelType<typeof Cat>) {}

  async create(createCatDto: { name: string }): Promise<Cat> {
    return await this.catModel.create(createCatDto)
  }

  async findAll(): Promise<Cat[] | null> {
    return await this.catModel.find().exec()
  }
}
