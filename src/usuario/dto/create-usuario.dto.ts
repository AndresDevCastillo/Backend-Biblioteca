import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Rol } from 'src/rol/entities/rol.entity';

export class CreateUsuarioDto {
  @IsNotEmpty()
  @IsNumber()
  readonly cedula: number;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El nombre no puede ser estar vacío' })
  @MinLength(1)
  @MaxLength(80)
  readonly nombre: string;
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El apellido no puede ser estar vacío' })
  @MinLength(1)
  @MaxLength(80)
  readonly apellido: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El teléfono no puede ser estar vacío' })
  readonly telefono: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El correo no puede ser estar vacío' })
  @MinLength(1)
  @MaxLength(50)
  readonly email: string;

  @IsNotEmpty({ message: 'La contraseña no puede ser estar vacía' })
  readonly contrasena: string;

  readonly rol: Rol;
}
export class LoginDto {
  @IsNotEmpty()
  readonly cedula: number;

  @IsNotEmpty()
  readonly password: string;
}
