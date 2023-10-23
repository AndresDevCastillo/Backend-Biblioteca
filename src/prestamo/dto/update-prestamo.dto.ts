import { IsArray, IsDate, IsNotEmpty } from 'class-validator';
import { DetallePrestamo } from 'src/detalle-prestamo/entities/detalle-prestamo.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

export class UpdatePrestamoDto {
  @IsNotEmpty()
  readonly id: number;

  @IsDate()
  @IsNotEmpty()
  readonly fecha_inicio: Date;

  @IsDate()
  @IsNotEmpty()
  readonly fecha_fin: Date;

  @IsArray()
  readonly detalle_prestamo: DetallePrestamo[];

  @IsNotEmpty()
  readonly usuario: Usuario;
}
