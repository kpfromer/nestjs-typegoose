import { Body, Controller, Get, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './user.model'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(): Promise<User[] | null> {
    return await this.userService.findAll()
  }

  @Post()
  async create(@Body() user: User): Promise<User> {
    return await this.userService.create(user)
  }
}
