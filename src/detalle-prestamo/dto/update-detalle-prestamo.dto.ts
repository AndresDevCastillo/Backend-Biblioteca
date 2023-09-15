import { IsNotEmpty, IsNumber } from "class-validator";
import { Equipo } from "src/equipo/entities/equipo.entity";
import { Prestamo } from "src/prestamo/entities/prestamo.entity";

export class UpdateDetallePrestamoDto {

    
    @IsNumber()
    @IsNotEmpty()
    readonly id: number;
    
    @IsNumber()
    @IsNotEmpty()
    readonly prestamo?: Prestamo;

    @IsNumber()
    @IsNotEmpty()
    readonly equipo?: Equipo;

}