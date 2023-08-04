import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Equipo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    serial: string;

    @Column()
    descripcion: string;

}