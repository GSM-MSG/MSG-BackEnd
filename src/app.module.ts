import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ClubController } from './club/club.controller';
import { ClubModule } from './club/club.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ClubModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      password: process.env.DATABASE_PASSWORD,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      port: 3306,
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USERNAME,
      synchronize: true,
    }),
  ],
  controllers: [AppController, UserController, AuthController, ClubController],
  providers: [AppService, UserService],
})
export class AppModule {}
