import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { pictureUrldto } from 'src/dto/Pictureurl.dto';
import { clubmember } from 'src/entities/club-member.entity';
import { Club } from 'src/entities/club.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
type TToken = {
  sub: string;
  email: string;
  picture: string;
  name: string;
};
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private User: Repository<User>,
    @InjectRepository(clubmember)
    private clubMember: Repository<clubmember>,
    @InjectRepository(Club)
    private club: Repository<Club>,
    private jwtService: JwtService,
  ) {}

  async findUser(Token) {
    const TokenData = (await this.jwtService.decode(Token)) as TToken;
    const user = await this.User.findOne({ sub: TokenData.sub });
    console.log(user);
    if (!user) {
      throw new HttpException(
        '유저의 정보가 없습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return { user };
  }
  async serchUser(name: string) {
    return await this.User.find({ name: name });
  }
  async editPicture(pictureUrl: string, Token) {
    const decodedToken = (await this.jwtService.decode(Token)) as TToken;
    console.log(decodedToken);
    decodedToken.picture = pictureUrl;

    await this.User.save(decodedToken);
  }
  async inviteAccept(clubName: string, clubType: string, Token) {
    const decodedToken = (await this.jwtService.decode(Token)) as TToken;
    const club = await this.club.findOne({ name: clubName, type: clubType });

    return await this.clubMember.save({
      userName: decodedToken.name,
      clubName: clubName,
      clubType: clubType,
    });
  }
  async tt() {
    return this.clubMember.find();
  }
}
