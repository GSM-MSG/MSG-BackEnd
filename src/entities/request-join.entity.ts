import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Club } from './club.entity';
import { User } from './user.entity';

@Entity()
export class join {
  @PrimaryColumn()
  @ManyToOne(() => User, (User) => User.id)
  userId: User;

  @ManyToOne(() => Club, (club) => club.id)
  clubId: Club;
}
