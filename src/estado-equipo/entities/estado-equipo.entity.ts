import { Equipo } from "src/equipo/entities/equipo.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EstadoEquipo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 20 })
    estado: string;

    @OneToMany(() => Equipo, (equipo) => equipo.id_estado)
    Equipo: Equipo[]
}