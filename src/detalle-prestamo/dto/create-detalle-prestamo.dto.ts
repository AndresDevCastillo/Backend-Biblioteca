import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';
import { Equipo } from 'src/equipo/entities/equipo.entity';
import { Prestamo } from 'src/prestamo/entities/prestamo.entity';

export class CreateDetallePrestamoDto {
  @IsDateString()
  @IsNotEmpty()
  readonly fecha_inicio: Date;

  @IsDateString()
  @IsNotEmpty()
  readonly fecha_fin: Date;

  @IsNumber()
  @IsNotEmpty()
  readonly prestamo: Prestamo;

  @IsNumber()
  @IsNotEmpty()
  readonly equipo: Equipo;
}
