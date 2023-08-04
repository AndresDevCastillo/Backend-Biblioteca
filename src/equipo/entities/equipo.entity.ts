import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Equipo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Serial: string;

    @Column()
    Descripcion: string;

}