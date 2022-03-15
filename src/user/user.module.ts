import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

import { clubmember } from 'src/entities/club-member.entity';
import { Club } from 'src/entities/club.entity';

import { User } from 'src/entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, clubmember, Club]),
    JwtModule.register({
      secret: 'asd',
      signOptions: { expiresIn: '2s' },
    }),
    AuthModule,
    UserModule,
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
