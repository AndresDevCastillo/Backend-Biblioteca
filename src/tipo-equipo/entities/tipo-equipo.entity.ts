import { Equipo } from "src/equipo/entities/equipo.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class TipoEquipo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 30 })
    tipo: string;

    @OneToMany(() => Equipo, (equipo) => equipo.tipo_equipo)
    equipo: Equipo[];
}
