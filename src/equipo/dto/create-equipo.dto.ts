import { IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateEquipoDto {
    @IsNotEmpty()
    @Matches(/^(?!\s*$).+/, { message: 'El id_estado no puede ser estar vacío' })
    id_estado: number;

    @IsNotEmpty()
    @Matches(/^(?!\s*$).+/, { message: 'El id_tipo no puede ser estar vacío' })
    id_tipo: number;

    @IsString()
    @IsNotEmpty()
    @Matches(/^(?!\s*$).+/, { message: 'El serial no puede ser estar vacío' })
    serial: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^(?!\s*$).+/, { message: 'La descripción no puede estar vacía' })
    descripcion: string;


}
