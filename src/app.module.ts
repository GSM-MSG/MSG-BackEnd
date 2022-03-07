import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ClubModule } from './club/club.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { clubmember } from './entities/club-member.entity';
import { User } from './entities/user.entity';
import { Club } from './entities/club.entity';
import { notifiacion } from './entities/notification.entity';
import { image } from './entities/image.entity';
import { join } from './entities/request-join.entity';

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
      entities: [clubmember, User, Club, notifiacion, image, join],
      port: 3306,
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USERNAME,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
