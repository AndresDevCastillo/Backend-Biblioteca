import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EstadoEquipo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 20 })
    estado: string;

}