import { Module } from '@nestjs/common';
import { DetallePrestamoService } from './detalle-prestamo.service';
import { DetallePrestamoController } from './detalle-prestamo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetallePrestamo } from './entities/detalle-prestamo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetallePrestamo])],
  controllers: [DetallePrestamoController],
  providers: [DetallePrestamoService],
  exports: [TypeOrmModule, DetallePrestamoService]
})
export class DetallePrestamoModule {}
