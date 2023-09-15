import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rol {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 20 })
    descripcion: string;

    @OneToMany(() => Usuario, (usuario) => usuario.rol)
    usuario: Usuario[];
}