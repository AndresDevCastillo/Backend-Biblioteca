import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { PrestamoService } from './prestamo.service';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { Prestamo } from './entities/prestamo.entity';
import { EntregaDto } from './dto/entrega.dto';

@Controller('prestamo')
export class PrestamoController {
  constructor(private readonly prestamoService: PrestamoService) {}

  @Post('/crear')
  async createPrestamo(@Body() createPrestamoDto: CreatePrestamoDto) {
    return await this.prestamoService.createPrestamo(createPrestamoDto);
  }

  @Post('/entregar')
  async entregar(@Body() entrega: EntregaDto) {
    return await this.prestamoService.entregar(entrega);
  }
  @Get('/obtenerUsuarios')
  getPrestamos(): Promise<Prestamo[]> {
    return this.prestamoService.getPrestamos();
  }

  @Get('/usuario/:id')
  async getPrestamo(@Param('id', ParseIntPipe) id: number) {
    return await this.prestamoService.getPrestamo(id);
  }

  @Put('/confirmar/:id')
  async updatePrestamo(@Param('id', ParseIntPipe) id: number) {
    return await this.prestamoService.confirmar(id);
  }

  @Delete('/:id')
  async deletePrestamo(@Param('id', ParseIntPipe) id: number) {
    return await this.prestamoService.deletePrestamo(id);
  }
}
