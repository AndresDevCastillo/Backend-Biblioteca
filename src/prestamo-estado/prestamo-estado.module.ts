import { Module } from '@nestjs/common';
import { PrestamoEstadoService } from './prestamo-estado.service';
import { PrestamoEstadoController } from './prestamo-estado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrestamoEstado } from './entities/prestamo-estado.entity';

@Module({
  imports : [TypeOrmModule.forFeature([PrestamoEstado])],
  controllers: [PrestamoEstadoController],
  providers: [PrestamoEstadoService],
  exports: [TypeOrmModule]
})
export class PrestamoEstadoModule {}
