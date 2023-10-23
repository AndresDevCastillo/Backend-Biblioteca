import { Equipo } from 'src/equipo/entities/equipo.entity';
import { Prestamo } from 'src/prestamo/entities/prestamo.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DetallePrestamo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime', default: () => 'NOW()' })
  fecha_inicio: Date;

  @Column({ type: 'datetime', nullable: true })
  fecha_fin: Date;

  @ManyToOne(() => Prestamo, (prestamo) => prestamo.detalle, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  prestamo: Prestamo;

  @ManyToOne(() => Equipo, (equipo) => equipo.detalle_prestamo, {
    eager: true,
  })
  equipo: Equipo;
}
