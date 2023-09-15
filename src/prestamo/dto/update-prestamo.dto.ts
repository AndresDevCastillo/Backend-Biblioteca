import { IsDate, IsNotEmpty} from "class-validator";


export class UpdatePrestamoDto {
    @IsDate()
    @IsNotEmpty()
    readonly fecha_prestamo?: Date;

    @IsDate()
    @IsNotEmpty()
    readonly fecha_devolucion?: Date;

}
