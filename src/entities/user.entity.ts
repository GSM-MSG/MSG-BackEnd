import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  auth: string;

  @Column()
  sub: string;

  @Column()
  deviceId: string;

  @Column()
  userPicture: string;
}
