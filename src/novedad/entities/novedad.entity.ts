import { Prestamo } from "src/prestamo/entities/prestamo.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Novedad {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255})
    descripcion: string;

    @Column({ type: 'datetime', default: () => 'NOW()'})
    fecha_novedad : Date;

    @Column({ type: 'varchar', length: 20})
    tipo_novedad: string;

    @Column({ type: 'boolean'})
    estado_novedad: boolean;

    @ManyToOne(() => Prestamo, (prestamo) => prestamo.novedad)
    prestamo: Prestamo;

}
