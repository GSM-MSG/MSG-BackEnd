import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Club {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  teacher: string;

  @OneToMany(() => User, (User) => User.id)
  head: User;

  @Column()
  discord: string;

  @Column()
  picture: string;

  @Column('simple-array')
  clubPictures: string[];

}
