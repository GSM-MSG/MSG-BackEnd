import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Club } from 'src/entities/club.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(Club)
    private Club: Repository<Club>,
    private readonly authService: AuthService,
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
    const user = await this.authService.verify(Token);
    if (user) {
      return await this.Club.findOne({ name: title, description: description });
    }
  }
}
