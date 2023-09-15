import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UpdateTipoEquipoDto {

    @IsString()
    @IsNotEmpty()
    @Matches(/^(?!\s*$).+/, { message: 'El Estado no puede ser estar vacío' })
    @MinLength(1)
    @MaxLength(30)
    readonly tipo?: string;
}