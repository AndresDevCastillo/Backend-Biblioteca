import { DetallePrestamo } from "src/detalle-prestamo/entities/detalle-prestamo.entity";
import { EstadoEquipo } from "src/estado-equipo/entities/estado-equipo.entity";
import { TipoEquipo } from "src/tipo-equipo/entities/tipo-equipo.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Equipo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length:30})
    serial: string;

    @Column({type: "varchar", length:256})
    descripcion: string;

    @OneToMany(() => DetallePrestamo, (detalle_prestamo) => detalle_prestamo.equipo)
    detalle_prestamo : DetallePrestamo[];

    @ManyToOne(() => EstadoEquipo, (estado_equipo) => estado_equipo.equipo)
    estado_equipo: EstadoEquipo;

    @ManyToOne(() => TipoEquipo, (tipo_equipo) => tipo_equipo.equipo)
    tipo_equipo: TipoEquipo;
}