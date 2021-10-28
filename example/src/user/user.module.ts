import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { User } from './user.model'

@Module({
  imports: [TypegooseModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
