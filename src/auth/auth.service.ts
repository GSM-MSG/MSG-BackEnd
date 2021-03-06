import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { authDto } from 'src/dto/auth.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
type TToken = {
  sub: string;
  email: string;
  picture: string;
  name: string;
};
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly UserRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async verify(Token: string) {
    return true;
  }
  async decodeToken(Token) {
    const TokenData = (await this.jwtService.decode(Token)) as TToken;
    return TokenData;
  }
  async login(loginData: authDto) {
    const Token = (await this.jwtService.decode(loginData.idToken)) as TToken;
    const deviceToken = loginData.deviceToken;
    if (Token['sub'] === null) {
      throw new UnauthorizedException();
    }
    const user = await this.UserRepository.findOne({
      where: { sub: Token['sub'] },
    });
    const payload = {
      sub: Token['sub'],
      email: Token['email'],
      picture: Token['picture'],
      name: Token['name'],
    };
    if (!user) {
      const userData = await this.UserRepository.create({
        sub: Token['sub'],
        email: Token['email'],
        userPicture: Token['picture'],
        name: Token.name,
        deviceToken: deviceToken,
      });
      await this.UserRepository.save(userData);

      return {
        accessToken: await this.createAccessToken(payload),
        refreshToken: await this.createRefreshToken(payload),
      };
    }
    return {
      accessToken: await this.createAccessToken(payload),
      refreshToken: await this.createRefreshToken(payload),
    };
  }
  async createAccessToken(payload: any) {
    const Accesstoken = await this.jwtService.sign(payload);
    return Accesstoken;
  }
  async createRefreshToken(payload: any) {
    const RefreshToken = await this.jwtService.sign(payload, {
      expiresIn: '1d',
    });
    return RefreshToken;
  }
  async checkToken(accessToken, refreshToken) {
    //???????????? ?????????
    if (accessToken === undefined) {
      //??????????????? ?????????
      if (refreshToken === undefined) {
        throw new HttpException('??????????????????', HttpStatus.BAD_REQUEST);
      }
      //??????????????? ?????????
      const decoded = await this.jwtService.decode(refreshToken);
      const payload = {
        sub: decoded['sub'],
        email: decoded['email'],
        picture: decoded['picture'],
      };
      const newAccessToken = await this.jwtService.sign(payload);
      return { accessToken: newAccessToken };
    }
  }
}
