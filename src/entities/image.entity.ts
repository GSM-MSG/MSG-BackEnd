import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { club } from './club.entity';

@Entity()
export class image {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => club, (club) => club.id)
  club_id: club;

  @Column()
  uri: string;
}
