import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { clubmember } from 'src/entities/club-member.entity';
import { Club } from 'src/entities/club.entity';
import { image } from 'src/entities/image.entity';
import { notifiacion } from 'src/entities/notification.entity';
import { ClubController } from './club.controller';
import { ClubService } from './club.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Club, clubmember, image, notifiacion]),
    AuthModule,
  ],
  controllers: [ClubController],
  providers: [ClubService],
})
export class ClubModule {}
