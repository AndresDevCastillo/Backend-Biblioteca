import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadoEquipoDto } from './create-estado-equipo.dto';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class UpdateEstadoEquipoDto extends PartialType(CreateEstadoEquipoDto) {
    @IsString()
    @IsNotEmpty()
    @Matches(/^(?!\s*$).+/, { message: 'El id no puede ser estar vacío' })
    id: number;
}
