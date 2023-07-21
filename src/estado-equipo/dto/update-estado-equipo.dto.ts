import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadoEquipoDto } from './create-estado-equipo.dto';

export class UpdateEstadoEquipoDto extends PartialType(CreateEstadoEquipoDto) {


}
