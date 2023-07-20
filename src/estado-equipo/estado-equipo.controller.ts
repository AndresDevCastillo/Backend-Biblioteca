import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadoEquipoService } from './estado-equipo.service';
import { CreateEstadoEquipoDto } from './dto/create-estado-equipo.dto';
import { UpdateEstadoEquipoDto } from './dto/update-estado-equipo.dto';

@Controller('estado-equipo')
export class EstadoEquipoController {
  constructor(private readonly estadoEquipoService: EstadoEquipoService) {}

  @Post()
  create(@Body() createEstadoEquipoDto: CreateEstadoEquipoDto) {
    return this.estadoEquipoService.create(createEstadoEquipoDto);
  }

  @Get()
  findAll() {
    return this.estadoEquipoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadoEquipoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstadoEquipoDto: UpdateEstadoEquipoDto) {
    return this.estadoEquipoService.update(+id, updateEstadoEquipoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadoEquipoService.remove(+id);
  }
}
