import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PrestamoEstado {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 20 })
    estado: string;
}