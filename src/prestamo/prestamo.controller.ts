import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { PrestamoService } from './prestamo.service';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';
import { Prestamo } from './entities/prestamo.entity';

@Controller('prestamo')
export class PrestamoController {
  constructor(private readonly prestamoService: PrestamoService) {}

  @Post('/createPrestamo')
  createPrestamo(@Body() createPrestamoDto: CreatePrestamoDto) {
    return this.prestamoService.createPrestamo(createPrestamoDto);
  }

  @Get('/obtenerUsuarios')
  getPrestamos(): Promise<Prestamo[]> {
    return this.prestamoService.getPrestamos();
  }

  @Get('/usuario/:id')
  getPrestamo(@Param('id', ParseIntPipe) id: number): Promise<Prestamo> {
    return this.prestamoService.getPrestamo(id);
  }

  @Put('/actualizar/:id')
  updatePrestamo(@Param('id', ParseIntPipe) id: number, @Body() updatePrestamoDto: UpdatePrestamoDto) {
    return this.prestamoService.updatePrestamo(id, updatePrestamoDto);
  }

  @Delete(':id')
  deletePrestamo(@Param('id', ParseIntPipe) id: number) {
    return this.prestamoService.deletePrestamo(id);
  }
}
