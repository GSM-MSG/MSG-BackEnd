import { IsString } from 'class-validator';

export class CreateDataDto {
  @IsString()
  type: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  teacher: string;

  @IsString()
  head: string;

  @IsString()
  discord: string;

  @IsString()
  picture: string;
}
