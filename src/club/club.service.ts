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
  async CreateClub(CreateData, req) {
    const Token = req.headers['Authorization'];
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
    const user = await this.authService.verify(Token);
    if (user) {
      return await this.Club.findOne({ name: name, type: type });
    }
  }
}
