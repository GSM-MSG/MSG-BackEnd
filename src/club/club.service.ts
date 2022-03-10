import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Club } from 'src/entities/club.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(Club)
    private Club: Repository<Club>,
    private readonly authService: AuthService,
  ) {}
  async CreateClub(CreateData, Token: string) {
    const articleTest = await this.articleTest(
      Token,
      CreateData.name,
      CreateData.type,
    );
    if (articleTest) {
      throw new HttpException('이미 있는 동아리입니다', HttpStatus.BAD_REQUEST);
    } else {
      await this.Club.save({ ...CreateData });
    }
  }
  async articleTest(Token, name, type) {
    const result = await this.authService.verify(Token);
    if (result) {
      return await this.Club.findOne({ name: name, type: type });
    }
  }
  async Manage(accessToken) {
    const result = await this.authService.verify(accessToken);
    if (result) {
      const TokenData = await this.authService.decodeToken(accessToken);
      return await this.Club.find({ headId: TokenData.email });
    }
  }
  async list(accessToken, type) {
    const result = await this.authService.verify(accessToken);
    if (type === 'MAJOR' || 'EDITORIAL' || 'FREEDOM') {
      if (result) {
        return await this.Club.find({ type: type });
      }
    } else {
      throw new HttpException('없는 동아리입니다', HttpStatus.BAD_REQUEST);
    }
  }
  async detailPage(id, accessToken) {
    const result = await this.authService.verify(accessToken);
    if (result) {
      const Club = await this.Club.findOne({ id: id.id });
      if (!Club)
        throw new HttpException('없는 동아리입니다', HttpStatus.BAD_REQUEST);
      return Club;
    }
  }
}
