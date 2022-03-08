import { IsOptional, IsString } from 'class-validator';

export class authDto {
  @IsString()
  idToken: string;

  @IsString()
  @IsOptional()
  deviceId: string;
}
