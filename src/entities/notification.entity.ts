import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Club } from './club.entity';

@Entity()
export class notifiacion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Club, (club) => club.id)
  clubId: Club;

  @Column()
  title: string;

  @Column()
  content: string;
}
