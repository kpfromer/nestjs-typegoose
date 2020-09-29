import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from './user.model';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>
  ) {}

  async create(createCatDto: { name: string }): Promise<User> {
    return await this.userModel.create(createCatDto);
  }

  async findAll(): Promise<User[] | null> {
    return await this.userModel.find().exec();
  }
}
