import { Controller } from '@nestjs/common';
import { TipoEquipoService } from './tipo-equipo.service';

@Controller('tipo-equipo')
export class TipoEquipoController {
  constructor(private readonly tipoEquipoService: TipoEquipoService) {}
}
