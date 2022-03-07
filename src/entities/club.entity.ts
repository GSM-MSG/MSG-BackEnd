import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class club {
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

  @Column()
  head: string;

  @Column()
  discord: string;

  @Column('simple-array')
  clubMember: string[];

  @Column('simple-array')
  clubPicture: string[];
}
