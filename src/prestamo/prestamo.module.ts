import { Module } from '@nestjs/common';
import { PrestamoService } from './prestamo.service';
import { PrestamoController } from './prestamo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prestamo } from './entities/prestamo.entity';
import { EquipoModule } from 'src/equipo/equipo.module';
import { EquipoService } from 'src/equipo/equipo.service';
import { DetallePrestamoModule } from 'src/detalle-prestamo/detalle-prestamo.module';
import { DetallePrestamoService } from 'src/detalle-prestamo/detalle-prestamo.service';
import { EstadoPrestamoModule } from 'src/estado-prestamo/estado-prestamo.module';
import { EstadoPrestamoService } from 'src/estado-prestamo/estado-prestamo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Prestamo]),
    EquipoModule,
    DetallePrestamoModule,
    EstadoPrestamoModule,
  ],
  controllers: [PrestamoController],
  providers: [
    PrestamoService,
    EquipoService,
    DetallePrestamoService,
    EstadoPrestamoService,
  ],
  exports: [TypeOrmModule],
})
export class PrestamoModule {}
