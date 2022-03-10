import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
  Req,
} from '@nestjs/common';
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
    if (result) {
      return result;
    }
    return this.userservice.findUser(req.headers.authorization);
  }
  @Get('/search')
  async searchUser(@Req() req: Request, @Query('q') name: string) {
    if (!name) {
      throw new HttpException('검색어가 없습니다.', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userservice.serchUser(name);
    if (!user[0]) {
      throw new HttpException(
        '유저가 존재하지 않습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }
}
