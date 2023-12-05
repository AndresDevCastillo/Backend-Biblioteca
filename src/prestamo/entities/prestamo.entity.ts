import { DetallePrestamo } from 'src/detalle-prestamo/entities/detalle-prestamo.entity';
import { EstadoPrestamo } from 'src/estado-prestamo/entities/estado-prestamo.entity';
import { Novedad } from 'src/novedad/entities/novedad.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Prestamo {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    () => DetallePrestamo,
    (detallePrestamo) => detallePrestamo.prestamo,
    {
      eager: true,
    },
  )
  detalle: DetallePrestamo[];
  @ManyToOne(() => Usuario, (usuario) => usuario.prestamo, {
    eager: true,
  })
  usuario: Usuario;

  @ManyToOne(
    () => EstadoPrestamo,
    (estado_prestamo) => estado_prestamo.prestamo,
    {
      eager: true,
    },
  )
  estado_prestamo: EstadoPrestamo;

  @OneToMany(() => Novedad, (novedad) => novedad.prestamo, {
    eager: true,
  })
  novedad: Novedad[];
}
