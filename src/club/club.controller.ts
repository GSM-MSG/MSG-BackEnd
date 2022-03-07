import { Body, Controller, Post, Req } from '@nestjs/common';
import { ClubService } from './club.service';

@Controller('club')
export class ClubController {
  constructor(private readonly clubService: ClubService) {}
  @Post('write')
  async CreateClub(@Body() CreateData, @Req() req: Request) {
    await this.clubService.CreateClub(CreateData, req);
  }
}
