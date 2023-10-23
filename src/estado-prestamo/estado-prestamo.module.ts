import { Module } from '@nestjs/common';
import { EstadoPrestamoService } from './estado-prestamo.service';
import { EstadoPrestamoController } from './estado-prestamo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoPrestamo } from './entities/estado-prestamo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EstadoPrestamo])],
  controllers: [EstadoPrestamoController],
  providers: [EstadoPrestamoService],
  exports: [TypeOrmModule, EstadoPrestamoService]
})
export class EstadoPrestamoModule {}
