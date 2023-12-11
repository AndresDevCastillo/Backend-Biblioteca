import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateTipoEquipoDto {

    @IsString()
    @IsNotEmpty()
    @Matches(/^(?!\s*$).+/, { message: 'El tipo de equipo no puede ser estar vacío' })
    @MinLength(1)
    @MaxLength(30)
    readonly tipo: string;
}