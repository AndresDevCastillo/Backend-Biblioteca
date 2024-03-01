import { IsArray, IsDateString, IsNotEmpty, IsNumber } from 'class-validator';
import { Usuario } from 'src/usuario/entities/usuario.entity';

export class CreatePrestamoDto {
  @IsDateString()
  @IsNotEmpty()
  readonly fecha_inicio: Date;

  @IsDateString()
  @IsNotEmpty()
  readonly fecha_fin: Date;

  @IsArray({ message: 'Debe ser un arreglo' })
  readonly detalle: PrestamoDetallePrestamoDto[];

  @IsNotEmpty({ message: 'El usuario no puede estar vacío' })
  readonly usuario: Usuario;
}

export class PrestamoDetallePrestamoDto {
  @IsNotEmpty()
  readonly tipo_equipo: number;

  @IsNotEmpty()
  @IsNumber()
  readonly cantidad: number;
}
