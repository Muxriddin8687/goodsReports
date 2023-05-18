import { Module } from '@nestjs/common';
import { MysqlModule } from 'nest-mysql';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MulterModule } from '@nestjs/platform-express/multer';
import { memoryStorage } from 'multer';
import { ConfigModule } from '@nestjs/config';

import { getEnvPath } from './core/envs/env.helpers';
import { AuthModule } from './modules/auth/auth.module';
import { UnitModule } from './modules/unit/unit.module';
import { ProductModule } from './modules/product/product.module';
import { ProductGroupModule } from './modules/product-group/product-group.module';
import { ActionModule } from './modules/action/action.module';
const envFilePath: string = getEnvPath('./src/core/envs');

@Module({
  imports: [
    MysqlModule.forRoot({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '',
      database: 'stock',
      multipleStatements: true
    }),
    ConfigModule.forRoot({ envFilePath: envFilePath, isGlobal: true }),
    MulterModule.register({
      storage: memoryStorage(),
    }),
    AuthModule,
    UnitModule,
    ProductModule,
    ProductGroupModule,
    ActionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
