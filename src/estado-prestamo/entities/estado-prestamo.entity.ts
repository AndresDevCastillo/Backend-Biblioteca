import { Prestamo } from 'src/prestamo/entities/prestamo.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class EstadoPrestamo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 15 })
  estado: string;

  @OneToMany(() => Prestamo, (prestamo) => prestamo.estado_prestamo)
  prestamo: Prestamo[];
}
