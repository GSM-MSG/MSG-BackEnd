import { Entity, ManyToOne } from 'typeorm';
import { club } from './club.entity';
import { User } from './user.entity';

@Entity()
export class join {
  @ManyToOne(() => User, (User) => User.id)
  userId: number;

  @ManyToOne(() => club, (club) => club.id)
  clubId: number;
}
