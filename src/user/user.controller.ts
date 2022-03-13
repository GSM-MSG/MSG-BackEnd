import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { pictureUrldto } from 'src/dto/Pictureurl.dto';

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
    const result = await this.authService.checkToken(
      req.headers.authorization,
      req.headers.refreshtoken,
    );
    if (result) {
      return result;
    }
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
  @Put('/edit/picture')
  async editPicture(@Body() picturedata: pictureUrldto, @Req() req: Request) {
    const result = await this.authService.checkToken(
      req.headers.authorization,
      req.headers.refreshtoken,
    );
    if (result) {
      return result;
    }
    return await this.userservice.editPicture(
      picturedata.pictureUrl,
      req.headers.authorization,
    );
  }
  @Put('/invite/accept')
  async inviteAccept(
    @Query('q') clubName: string,
    @Query('type') clubType: string,
    @Req() req: Request,
  ) {
    const result = await this.authService.checkToken(
      req.headers.authorization,
      req.headers.refreshtoken,
    );
    if (result) {
      return result;
    }
    return await this.userservice.inviteAccept(
      clubName,
      clubType,
      req.headers.authorization,
    );
  }
  @Get('dd')
  async aa() {
    return this.userservice.tt();
  }
}
