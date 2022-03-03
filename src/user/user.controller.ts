import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userservice: UserService) {}
  @Get('findOne')
  async findOne(@Param() id: string) {}
}
