import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    const TokenData = (await this.jwtService.decode(Token)) as TToken;
    const user = await this.User.findOne({ email: TokenData.email });
    if (!user) {
      throw new HttpException(
        '유저의 정보가 없습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }
}
