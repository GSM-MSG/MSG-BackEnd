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
  deviceToken: string;

  @Column()
  userPicture: string;

  @Column()
  grade: number;

  @Column()
  class: number;

  @Column()
  number: number;

  @Column()
  name: string;
}
