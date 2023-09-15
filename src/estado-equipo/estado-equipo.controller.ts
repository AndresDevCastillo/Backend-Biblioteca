import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { EstadoEquipoService } from './estado-equipo.service';
import { CreateEstadoEquipoDto } from './dto/create-estado-equipo.dto';
import { UpdateEstadoEquipoDto } from './dto/update-estado-equipo.dto';

@Controller('estado-equipo')
export class EstadoEquipoController {
  constructor(private readonly estadoEquipoService: EstadoEquipoService) { }

  @Post('/crearEstadoEquipo')
  createEstadoEquipo(@Body() createEstadoEquipoDto: CreateEstadoEquipoDto) {
    console.log(createEstadoEquipoDto);
    return this.estadoEquipoService.createEstadoEquipo(createEstadoEquipoDto);
  }

  @Get('/obtenerEstadoEquipos')
  getEstadoEquipos() {
    return this.estadoEquipoService.getEstadoEquipos();
  }

  @Get('/estadoEquipo/:id')
  getEstadoEquipo(@Param('id') id: number) {
    return this.estadoEquipoService.getEstadoEquipo(id);
  }

  @Put('/actualizar/:id')
  updateEstadoEquipo(@Param('id', ParseIntPipe) id: number, @Body() updateEstadoEquipoDto: UpdateEstadoEquipoDto) {
    return this.estadoEquipoService.updateEstadoEquipo(id, updateEstadoEquipoDto);
  }

  @Delete(':id')
  deleteEstadoEquipo(@Param('id', ParseIntPipe) id: number) {
    return this.estadoEquipoService.deleteEstadoEquipo(id);
  }
}
