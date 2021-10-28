import { Body, Controller, Get, Post } from '@nestjs/common'
import { CatsService } from './cats.service'
import { Cat } from './cat.model'

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async getCats(): Promise<Cat[] | null> {
    return await this.catsService.findAll()
  }

  @Post()
  async create(@Body() cat: Cat): Promise<Cat> {
    return await this.catsService.create(cat)
  }
}
