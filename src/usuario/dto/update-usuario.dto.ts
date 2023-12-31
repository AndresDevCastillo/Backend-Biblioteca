import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class UpdateUsuarioDto {

    @IsString()
    @IsNotEmpty()
    @Matches(/^(?!\s*$).+/, { message: 'El Estado no puede ser estar vacío' })
    @MinLength(1)
    @MaxLength(80)
    readonly nombre?: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^(?!\s*$).+/, { message: 'El Estado no puede ser estar vacío' })
    @MinLength(1)
    @MaxLength(80)
    readonly apellido?: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^(?!\s*$).+/, { message: 'El Estado no puede ser estar vacío' })
    readonly telefono?: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^(?!\s*$).+/, { message: 'El Estado no puede ser estar vacío' })
    @MinLength(1)
    @MaxLength(50)
    readonly email?: string;
    
}