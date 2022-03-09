import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async verify(Token) {
    return true;
  }
}
