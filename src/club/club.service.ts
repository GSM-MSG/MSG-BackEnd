import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Club } from 'src/entities/club.entity';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(Club)
    private readonly Club: Repository<Club>,
    private readonly userService: UserService,
  ) {}
  async CreateClub(CreateData, req) {
    const Token = req.cookies['access_token'];
    const articleTest = await this.articleTest(
      Token,
      CreateData.title,
      CreateData.description,
    );
    if (articleTest) {
    }
  }
  async articleTest(Token, title, description) {
    const user = await this.userService.findUser(Token);
    return await this.Club.findOne({});
  }
}
