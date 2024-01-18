import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { DetallePrestamoService } from './detalle-prestamo.service';
import { CreateDetallePrestamoDto } from './dto/create-detalle-prestamo.dto';
import { UpdateDetallePrestamoDto } from './dto/update-detalle-prestamo.dto';
import { DetallePrestamo } from './entities/detalle-prestamo.entity';

@Controller('detalle-prestamo')
export class DetallePrestamoController {
  constructor(
    private readonly detallePrestamoService: DetallePrestamoService,
  ) {}

  @Post('/crearDetallePrestamo')
  createDetallePrestamo(
    @Body() createDetallePrestamoDto: CreateDetallePrestamoDto[],
  ) {
    return this.detallePrestamoService.createDetallePrestamo(
      createDetallePrestamoDto,
    );
  }

  @Get()
  getDetallePrestamos(): Promise<DetallePrestamo[]> {
    return this.detallePrestamoService.getDetallePrestamos();
  }

  @Get('/:idPrestamo')
  async getDetallePrestamo(
    @Param('idPrestamo', ParseIntPipe) idPrestamo: number,
  ): Promise<DetallePrestamo[]> {
    return await this.detallePrestamoService.getDetallePrestamo(idPrestamo);
  }

  @Put('/actualizar/:id')
  updateDetallePrestamo(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDetallePrestamoDto: UpdateDetallePrestamoDto,
  ) {
    return this.detallePrestamoService.updateDetallePrestamo(
      id,
      updateDetallePrestamoDto,
    );
  }

  @Delete(':id')
  deleteDetallePrestamo(@Param('id', ParseIntPipe) id: number) {
    return this.detallePrestamoService.deleteDetallePrestamo(id);
  }
}
