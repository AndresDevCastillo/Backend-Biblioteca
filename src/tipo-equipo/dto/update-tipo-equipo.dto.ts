import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoEquipoDto } from './create-tipo-equipo.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateTipoEquipoDto extends PartialType(CreateTipoEquipoDto) {
  @IsNotEmpty()
  id: number;
}
