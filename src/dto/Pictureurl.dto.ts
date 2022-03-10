import { IsString } from 'class-validator';

export class pictureUrldto {
  @IsString()
  pictureUrl: string;
}
