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

  @Put('/entregar/:id')
  async entregar(@Param('id') id: number) {
    return await this.prestamoService.entregar(id);
  }
  @Post('/devolucion')
  async devolucion(@Body() devolucion: EntregaDto) {
    return await this.prestamoService.devolucion(devolucion);
  }
  @Get()
  async getPrestamos(): Promise<Prestamo[]> {
    return await this.prestamoService.getPrestamos();
  }

  /**
   *
   * @param id Cédula del usuario a listar préstamos
   * @param action Que quieres hacer, all=listar los préstamos, devolucion=listar préstamos Entregados, entregar=listar préstamos Reservados
   * @returns Retorna una lista de préstamos según la action
   */
  @Get('/usuario/:id/:action')
  async getPrestamo(
    @Param('id', ParseIntPipe) id: number,
    @Param('action') action: string,
  ) {
    return await this.prestamoService.getPrestamo(id, action);
  }

  @Put('/confirmar/:id')
  async updatePrestamo(@Param('id', ParseIntPipe) id: number) {
    return await this.prestamoService.confirmar(id);
  }

  //Cancelar préstamo
  @Delete('/:id')
  async deletePrestamo(@Param('id', ParseIntPipe) id: number) {
    return await this.prestamoService.deletePrestamo(id);
  }
}
