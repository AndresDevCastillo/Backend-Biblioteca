import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, ParseIntPipe, Put } from '@nestjs/common';
import { EstadoEquipoService } from './estado-equipo.service';
import { CreateEstadoEquipoDto } from './dto/create-estado-equipo.dto';
import { UpdateEstadoEquipoDto } from './dto/update-estado-equipo.dto';


@Controller('estado-equipo')
export class EstadoEquipoController {
  constructor(private readonly estadoEquipoService: EstadoEquipoService) { }


  @Post('/crear')
  create(@Body(new ValidationPipe()) createEstadoEquipoDto: CreateEstadoEquipoDto) {
    console.log(createEstadoEquipoDto);
    return this.estadoEquipoService.create(createEstadoEquipoDto);
  }

  @Get()
  findAll() {
    return this.estadoEquipoService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.estadoEquipoService.findOne(id);
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.estadoEquipoService.delete(id);
  }

  @Put()
  update(@Body() estado: UpdateEstadoEquipoDto) {
    return this.estadoEquipoService.update(estado);
  }


}
