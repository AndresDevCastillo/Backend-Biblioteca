import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:"varchar", length: 80})
    nombre: string;

    @Column({type:"varchar", length: 80})
    apellido: string;

    @Column()
    telefono: string;

    @Column({type:"varchar", length: 50})
    email: string;
}