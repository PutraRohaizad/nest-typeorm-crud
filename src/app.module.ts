import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import config from '../config';

@Module({
  imports: [TypeOrmModule.forRoot(config), UserModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
