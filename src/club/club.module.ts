import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { clubmember } from 'src/entities/club-member.entity';
import { Club } from 'src/entities/club.entity';
import { image } from 'src/entities/image.entity';
import { notifiacion } from 'src/entities/notification.entity';
import { UserModule } from 'src/user/user.module';
import { ClubController } from './club.controller';
import { ClubService } from './club.service';

@Module({
  imports: [TypeOrmModule.forFeature([Club, clubmember, image, notifiacion]),UserModule],
  controllers: [ClubController],
  providers: [ClubService],
  exports: [ClubService],
})
export class ClubModule {}
