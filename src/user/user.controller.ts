import { Controller, Get, Param, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private userservice: UserService,
    private authService: AuthService,
  ) {}
  @Get()
  async findUser(@Req() req: Request) {
    const result = await this.authService.checkToken(
      req.headers.authorization,
      req.headers.refreshtoken,
    );
    console.log(result);
  }
}
