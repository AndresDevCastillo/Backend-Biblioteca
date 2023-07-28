import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TipoEquipo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  tipo: string;
}
