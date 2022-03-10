import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { ClubService } from './club.service';

@Controller('club')
export class ClubController {
  constructor(private readonly clubService: ClubService) {}
  @Post('write')
  async CreateClub(@Body() CreateData, @Req() req: Request) {
    if (req.headers.authorization) {
      const Token = req.headers.authorization;
      console.log('token', Token);
      await this.clubService.CreateClub(CreateData, Token);
    } else {
      throw new HttpException('Not Found Token', HttpStatus.BAD_REQUEST);
    }
  }
  @Get('manage')
  async Manage(@Req() req: Request) {
    return await this.clubService.Manage(req.headers.authorization);
  }
  @Get('list')
  async list(@Req() req: Request, @Query('type') type: string) {
    return await this.clubService.list(req.headers.authorization, type);
  }
  @Get('detailPage/:id')
  async DetailPage(@Param() id: number, @Req() req: Request) {
    console.log(id);
  }
}
