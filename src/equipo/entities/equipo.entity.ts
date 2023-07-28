import { EstadoEquipo } from "src/estado-equipo/entities/estado-equipo.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Equipo {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => EstadoEquipo, (estadoEquipo) => estadoEquipo.Equipo)
    id_estado: EstadoEquipo;
}
