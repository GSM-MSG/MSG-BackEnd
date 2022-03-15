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
let majorClubName = '';
let freeClubName = '';
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
    const TokenData = this.jwtService.decode(Token) as TToken;
    const clubMember = await this.clubMember.find({ userName: TokenData.name });
    const user = await this.User.findOne({ sub: TokenData.sub });
    console.log(clubMember);

    for (let i = 0; i < clubMember.length; i++) {
      if (clubMember[i].clubType === 'MAJOR') {
        majorClubName = clubMember[i].clubName;
      }
      if (clubMember[i].clubType === 'FREEDOM') {
        freeClubName = clubMember[i].clubName;
      }
    }
    const majorClub = await this.club.findOne({
      name: majorClubName,
      type: 'MAJOR',
    });
    console.log(majorClub);

    const freeClub = await this.club.findOne({
      name: freeClubName,
      type: 'FREEDOM',
    });
    const retureData = {
      id: user.id,
      name: user.name,
      picture: user.userPicture,
      joinedMajorClub: majorClub,
      joinedEditorialClub: freeClub,
    };
    return retureData;
  }
  async serchUser(name: string) {
    return await this.User.find({ name: name });
  }
  async editPicture(pictureUrl: string, Token) {
    const decodedToken = this.jwtService.decode(Token) as TToken;
    console.log(decodedToken);
    decodedToken.picture = pictureUrl;

    await this.User.save(decodedToken);
  }
  async inviteAccept(clubName: string, clubType: string, Token) {
    const decodedToken = this.jwtService.decode(Token) as TToken;

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
