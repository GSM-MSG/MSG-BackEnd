import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { authDto } from 'src/dto/auth.dto';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() authData: authDto) {
    return await this.authService.login(authData);
  }
  @Get('test')
  async Token(@Req() req: Request) {
    const accessToken = req.headers.authorization;
    const refreshToken = req.headers.refreshtoken;
    return await this.authService.checkToken(accessToken, refreshToken);
  }
}
