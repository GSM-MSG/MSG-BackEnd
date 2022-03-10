import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { clubmember } from './club-member.entity';

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

  @ManyToMany(() => clubmember, (clubmember) => clubmember.id)
  clubMember: clubmember;
}
