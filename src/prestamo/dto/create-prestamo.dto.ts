import { IsDate, IsNotEmpty} from "class-validator";


export class CreatePrestamoDto {
    @IsDate()
    @IsNotEmpty()
    readonly fecha_prestamo: Date;

    @IsDate()
    @IsNotEmpty()
    readonly fecha_devolucion: Date;

}
