import {
  HttpException,
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
    const deviceId = loginData.deviceId;
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
        deviceId: deviceId,
      });
      await this.UserRepository.save(userData);

      return {
        accessToken: await this.createAccessToken(payload),
        refreshToken: await this.createRefeshToekn(),
      };
    }
    return {
      accessToken: await this.createAccessToken(payload),
      refreshToken: await this.createRefeshToekn(),
    };
  }
  async createAccessToken(payload: any) {
    const token = this.jwtService.sign(payload);
    return token;
  }
  async createRefeshToekn() {
    const token = this.jwtService.sign({}, { expiresIn: '1d' });
    return token;
  }
}
