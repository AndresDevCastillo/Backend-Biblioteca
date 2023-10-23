import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { EstadoPrestamoService } from './estado-prestamo.service';
import { CreateEstadoPrestamoDto } from './dto/create-estado-prestamo.dto';
import { UpdateEstadoPrestamoDto } from './dto/update-estado-prestamo.dto';
import { EstadoPrestamo } from './entities/estado-prestamo.entity';

@Controller('estado-prestamo')
export class EstadoPrestamoController {
  constructor(private readonly estadoPrestamoService: EstadoPrestamoService) {}

  @Post('/crear')
  createEstadoPrestamo(
    @Body() createEstadoPrestamoDto: CreateEstadoPrestamoDto,
  ) {
    return this.estadoPrestamoService.createEstadoPrestamo(
      createEstadoPrestamoDto,
    );
  }

  @Get()
  async getEstadoPrestamos(): Promise<EstadoPrestamo[]> {
    return await this.estadoPrestamoService.getEstadoPrestamos();
  }

  @Get('/:id')
  getEstadoPrestamo(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<EstadoPrestamo> {
    return this.estadoPrestamoService.getEstadoPrestamo(id);
  }

  @Patch(':id')
  updateEstadoPrestamo(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEstadoPrestamoDto: UpdateEstadoPrestamoDto,
  ) {
    return this.estadoPrestamoService.updateEstadoPrestamo(
      id,
      updateEstadoPrestamoDto,
    );
  }

  @Delete('/:id')
  deleteEstadoPrestamo(@Param('id') id: number) {
    return this.estadoPrestamoService.deleteEstadoPrestamo(id);
  }
}
