import { IsNotEmpty, IsNumber } from 'class-validator';

export class IniciarSesionDto {
  @IsNumber()
  readonly cedula: number;
  @IsNotEmpty()
  readonly contrasena: string;
}
