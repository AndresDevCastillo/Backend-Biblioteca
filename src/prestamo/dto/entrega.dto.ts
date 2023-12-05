import { IsArray, IsNumber, IsOptional } from 'class-validator';

export class EntregaDto {
  @IsNumber()
  readonly idPrestamo: number;

  @IsArray()
  readonly equipos: EntregaEquiposDto[];
}

export class EntregaEquiposDto {
  @IsNumber()
  readonly id_equipo: number;

  @IsNumber()
  readonly estado_equipo: number;

  @IsOptional()
  readonly observacion: string;
}
