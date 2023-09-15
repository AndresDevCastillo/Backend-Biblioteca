import { Equipo } from "src/equipo/entities/equipo.entity";
import { Prestamo } from "src/prestamo/entities/prestamo.entity";
import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DetallePrestamo {

    @PrimaryGeneratedColumn()
    id : number;
    
    @OneToOne(() => Prestamo)
    @JoinColumn()   
    prestamo : Prestamo;
    
    @ManyToOne(() => Equipo , (equipo) => equipo.detalle_prestamo)
    equipo : Equipo;

}
