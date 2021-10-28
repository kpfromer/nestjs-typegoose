import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypegooseModule } from 'nestjs-typegoose'
import { CatsModule } from './cat/cats.module'

@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost:27017/nest', {
      useNewUrlParser: true
    }),
    CatsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
