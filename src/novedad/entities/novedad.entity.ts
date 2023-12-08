import { Equipo } from 'src/equipo/entities/equipo.entity';
import { Prestamo } from 'src/prestamo/entities/prestamo.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Novedad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'datetime', default: () => 'NOW()' })
  fecha_novedad: Date;

  @ManyToOne(() => Equipo, (equipo) => equipo.novedad, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: false,
  })
  equipo: Equipo;

  @ManyToOne(() => Prestamo, (prestamo) => prestamo.novedad, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: false,
  })
  prestamo: Prestamo;
}
