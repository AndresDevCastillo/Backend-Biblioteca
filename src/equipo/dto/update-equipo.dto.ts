import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipoDto } from './create-equipo.dto';
import { IsNotEmpty, IsNumber, Matches } from 'class-validator';

export class UpdateEquipoDto extends PartialType(CreateEquipoDto) {
    @IsNumber()
    @IsNotEmpty()
    @Matches(/^(?!\s*$).+/, { message: 'El id no puede ser estar vacío' })
    id: number;
}
