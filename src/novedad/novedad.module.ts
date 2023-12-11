import { Module } from '@nestjs/common';
import { NovedadService } from './novedad.service';
import { NovedadController } from './novedad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Novedad } from './entities/novedad.entity';
import { Equipo } from 'src/equipo/entities/equipo.entity';
import { Prestamo } from 'src/prestamo/entities/prestamo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Novedad, Equipo, Prestamo])],
  controllers: [NovedadController],
  providers: [NovedadService],
  exports: [TypeOrmModule, NovedadService],
})
export class NovedadModule {}
