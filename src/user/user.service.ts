import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
type TToken = {
  sub: string;
  email: string;
  picture: string;
};
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private User: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async findUser(Token) {
    const TokenData = await this.decodeToken(Token);
    return await this.User.findOne({ sub: TokenData.sub });
  }

  async decodeToken(Token) {
    const TokenData = this.jwtService.decode(Token) as TToken;
    return TokenData;
  }
}
