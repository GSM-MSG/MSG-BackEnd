import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  head: string;

  @Column()
  discord: string;

  @Column()
  picture: string;

  @Column('simple-array')
  clubPictures: string[];

  @Column()
  headId: string; 
}
