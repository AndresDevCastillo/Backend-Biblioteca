import { IsNotEmpty, Matches } from 'class-validator';

export class CreateTipoEquipoDto {
  @IsNotEmpty({ message: 'El tipo de equipo no puede estar vacío' })
  @Matches(/^(?!\s*$).+/, {
    message: 'El tipo de equipo no puede ser sólo espacios en blanco',
  })
  readonly tipo: string;
}
