import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private User: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async findUser(Token) {}
  async decodeToken(Token) {
    const TokenData = this.jwtService.decode(Token);
    return TokenData;
  }
}
