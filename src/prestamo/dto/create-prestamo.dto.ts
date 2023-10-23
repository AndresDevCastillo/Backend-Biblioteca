import {
  IsArray,
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { TipoEquipo } from 'src/tipo-equipo/entities/tipo-equipo.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

export class CreatePrestamoDto {
  @IsDateString()
  @IsNotEmpty()
  readonly fecha_inicio: Date;

  @IsDateString()
  @IsNotEmpty()
  readonly fecha_fin: Date;

  @IsArray()
  readonly detalle: PrestamoDetallePrestamoDto[];

  @IsNotEmpty()
  readonly usuario: Usuario;
}

export class PrestamoDetallePrestamoDto {
  @IsNotEmpty()
  readonly tipo_equipo: number;

  @IsNotEmpty()
  @IsNumber()
  readonly cantidad: number;
}
