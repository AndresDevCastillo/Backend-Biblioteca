import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TipoEquipo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 30 })
    tipo: string;

}