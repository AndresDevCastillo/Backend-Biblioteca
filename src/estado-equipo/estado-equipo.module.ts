import { Module } from '@nestjs/common';
import { EstadoEquipoService } from './estado-equipo.service';
import { EstadoEquipoController } from './estado-equipo.controller';
import { EstadoEquipo } from './entities/estado-equipo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EstadoEquipo])],
  controllers: [EstadoEquipoController],
  providers: [EstadoEquipoService],
  exports: [TypeOrmModule]
})
export class EstadoEquipoModule { }
