import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";


export class UpdateEquipoDto {

    @IsString()
    @IsNotEmpty()
    @Matches(/^(?!\s*$).+/, { message: 'El Estado no puede ser estar vacío' })
    @MinLength(1)
    @MaxLength(30)
    readonly serial?: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^(?!\s*$).+/, { message: 'El Estado no puede ser estar vacío' })
    @MinLength(1)
    @MaxLength(255)
    readonly descripcion?: string;
}