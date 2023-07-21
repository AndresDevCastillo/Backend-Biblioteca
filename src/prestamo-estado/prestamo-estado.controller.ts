import { Body, Controller, Post } from '@nestjs/common';
import { PrestamoEstadoService } from './prestamo-estado.service';
import {  CreatePrestamoEstado } from './dto/create-prestamo-estado.dto';

@Controller('prestamo-estado')
export class PrestamoEstadoController {
  constructor(private readonly prestamoEstadoService: PrestamoEstadoService) {}

  @Post('/crear')
  CreatePrestamoEstado(@Body() prestamoEstado : CreatePrestamoEstado ){
    return this.prestamoEstadoService.CrearPrestamoEstado(prestamoEstado);
  }
}
