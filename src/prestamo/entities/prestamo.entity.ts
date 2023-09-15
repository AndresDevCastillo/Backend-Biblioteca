import { EstadoPrestamo } from "src/estado-prestamo/entities/estado-prestamo.entity";
import { Novedad } from "src/novedad/entities/novedad.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Prestamo {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'datetime', default: ()=> 'NOW()'})
    fecha_prestamo: Date;

    @Column({type:'datetime', nullable: true})
    fecha_devolucion: Date;

    @ManyToOne(() => Usuario, (cedula) => cedula.prestamo)
    cedula: Usuario;

    @ManyToOne(() => EstadoPrestamo, (estado_prestamo) => estado_prestamo.prestamo)
    estado_prestamo: EstadoPrestamo;

    @OneToMany(() => Novedad, (novedad) => novedad.prestamo)
    novedad: Novedad[];
}
