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

@Module({
  imports: [UserModule, AuthModule, ClubModule],
  controllers: [AppController, UserController, AuthController, ClubController],
  providers: [AppService, UserService],
})
export class AppModule {}
