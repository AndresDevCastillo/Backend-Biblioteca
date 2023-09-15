import { Equipo } from "src/equipo/entities/equipo.entity";
import { Column, Entity, Equal, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EstadoEquipo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 20 })
    estado: string;

    @OneToMany(() => Equipo, (equipo) => equipo.estado_equipo)
    equipo: Equipo[];

}