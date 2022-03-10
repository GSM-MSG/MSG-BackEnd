import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Club } from './club.entity';
import { User } from './user.entity';

@Entity()
export class clubmember {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (User) => User.id)
  userId: User;

  @ManyToOne(() => Club, (club) => club.id)
  clubId: Club;
}
