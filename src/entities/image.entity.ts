import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Club } from './club.entity';

@Entity()
export class image {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Club, (club) => club.id)
  clubId: Club;

  @Column()
  uri: string;
}
