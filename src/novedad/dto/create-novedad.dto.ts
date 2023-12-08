import {
  IsArray,
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Equipo } from 'src/equipo/entities/equipo.entity';
import { EstadoEquipo } from 'src/estado-equipo/entities/estado-equipo.entity';
import { EstadoPrestamo } from 'src/estado-prestamo/entities/estado-prestamo.entity';
import { Prestamo } from 'src/prestamo/entities/prestamo.entity';

export class CreateNovedadDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El Estado no puede ser estar vacío' })
  @MinLength(1)
  @MaxLength(256)
  readonly descripcion: string;

  @IsInt()
  @IsNotEmpty()
  equipo: Equipo;

  @IsInt()
  @IsNotEmpty()
  estado_equipo: EstadoEquipo;
}

export class novedadGeneral {
  @IsInt()
  @IsNotEmpty()
  prestamo: Prestamo;

  @IsInt()
  @IsNotEmpty()
  estado_prestamo: EstadoPrestamo;

  @IsArray()
  novedades: CreateNovedadDto[];
}
