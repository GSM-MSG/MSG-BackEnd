import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class clubmember {
  @PrimaryGeneratedColumn()
  userId: number;
  @Column()
  clubId: number;
}
