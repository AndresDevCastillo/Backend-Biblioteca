import { Module } from '@nestjs/common';
import { EstadoEquipoService } from './estado-equipo.service';
import { EstadoEquipoController } from './estado-equipo.controller';

@Module({
  controllers: [EstadoEquipoController],
  providers: [EstadoEquipoService]
})
export class EstadoEquipoModule {}
