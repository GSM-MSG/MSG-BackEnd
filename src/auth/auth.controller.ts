import { Body, Controller, Post } from '@nestjs/common';
import { authDto } from 'src/dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() authData: authDto) {
    return await this.authService.login(authData);
  }
}
