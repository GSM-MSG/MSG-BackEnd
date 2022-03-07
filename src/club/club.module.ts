import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { clubmember } from 'src/entities/club-member.entity';
import { Club } from 'src/entities/club.entity';
import { image } from 'src/entities/image.entity';
import { notifiacion } from 'src/entities/notification.entity';
import { ClubService } from './club.service';

@Module({
  imports: [TypeOrmModule.forFeature([Club, clubmember, image, notifiacion])],
  providers: [ClubService],
})
export class ClubModule {}
