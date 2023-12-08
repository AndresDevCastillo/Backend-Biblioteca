import { DetallePrestamo } from 'src/detalle-prestamo/entities/detalle-prestamo.entity';
import { EstadoEquipo } from 'src/estado-equipo/entities/estado-equipo.entity';
import { Novedad } from 'src/novedad/entities/novedad.entity';
import { TipoEquipo } from 'src/tipo-equipo/entities/tipo-equipo.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Equipo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 45 })
  codigo: string;

  @Column({ type: 'varchar', length: 45 })
  referencia: string;

  @Column({ type: 'varchar', length: 45 })
  serial: string;

  @ManyToOne(() => EstadoEquipo, (estado_equipo) => estado_equipo.equipo, {
    eager: true,
  })
  estado_equipo: EstadoEquipo;

  @ManyToOne(() => TipoEquipo, (tipo_equipo) => tipo_equipo.equipo, {
    eager: true,
  })
  tipo_equipo: TipoEquipo;

  @OneToMany(
    () => DetallePrestamo,
    (detalle_prestamo) => detalle_prestamo.equipo,
  )
  detalle_prestamo: DetallePrestamo[];

  @OneToMany(() => Novedad, (novedad) => novedad.equipo)
  novedad: Novedad[];
}
