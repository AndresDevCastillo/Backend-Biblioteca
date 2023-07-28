import { Module } from '@nestjs/common';
import { EquipoService } from './equipo.service';
import { EquipoController } from './equipo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipo } from './entities/equipo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Equipo])],
  controllers: [EquipoController],
  providers: [EquipoService],
  exports: [TypeOrmModule]
})
export class EquipoModule { }
