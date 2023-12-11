import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { EstadoEquipo } from 'src/estado-equipo/entities/estado-equipo.entity';
import { TipoEquipo } from 'src/tipo-equipo/entities/tipo-equipo.entity';

export class CreateEquipoDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El código no puede ser estar vacío' })
  @MinLength(1)
  @MaxLength(45)
  readonly codigo: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'La referencia no puede ser estar vacía' })
  @MinLength(1)
  @MaxLength(45)
  readonly referencia: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El Estado no puede ser estar vacío' })
  @MinLength(1)
  @MaxLength(30)
  readonly serial: string;

  @IsNotEmpty()
  readonly estado_equipo: EstadoEquipo;

  @IsNotEmpty()
  readonly tipo_equipo: TipoEquipo;
}
