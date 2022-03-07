import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Club } from './club.entity';
import { User } from './user.entity';

@Entity()
export class join {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => User, (User) => User.id)
  user_id: User;

  @ManyToOne(() => Club, (club) => club.id)
  club_id: Club;
}
