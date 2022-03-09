import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
type TToken = {
  sub: string;
  email: string;
  picture: string;
};
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async verify(Token: string) {
    return true;
  }
  async decodeToken(Token) {
    const TokenData = this.jwtService.decode(Token) as TToken;
    return TokenData;
  }
}
