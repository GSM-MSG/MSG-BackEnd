import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({})
export class UserModule {
    providers : [UserService]
}
