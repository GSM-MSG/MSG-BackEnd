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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly UserRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginData: authDto) {
    const Token = await this.jwtService.decode(loginData.idToken);
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
    };
    if (!user) {
      const userData = await this.UserRepository.create({
        sub: Token['sub'],
        email: Token['email'],
        userPicture: Token['picture'],
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
    const Accesstoken = this.jwtService.sign(payload);
    return Accesstoken;
  }
  async createRefreshToken(payload: any) {
    const RefreshToken = await this.jwtService.sign(payload, {
      expiresIn: '1d',
    });
    return RefreshToken;
  }
  async checkToken(accessToken, refreshToken) {
    //엑세스가 없을때
    if (accessToken === undefined) {
      //리프레시가 없을때
      if (refreshToken === undefined) {
        throw new HttpException('로그인하세용', HttpStatus.BAD_REQUEST);
      }
      //리프레시가 있을때
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
