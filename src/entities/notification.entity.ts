import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { club } from './club.entity';

@Entity()
export class notifiacion {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => club, (club) => club.id)
  clubId: number;
  @Column()
  title: string;
  @Column()
  content: string;
}
