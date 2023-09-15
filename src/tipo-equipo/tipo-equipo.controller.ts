import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { TipoEquipoService } from './tipo-equipo.service';
import { CreateTipoEquipoDto } from './dto/create-tipo-equipo.dto';
import { UpdateTipoEquipoDto } from './dto/update-tipo-equipo.dto';
import { TipoEquipo } from './entities/tipo-equipo.entity';

@Controller('tipo-equipo')
export class TipoEquipoController {
  constructor(private readonly tipoEquipoService: TipoEquipoService) 
  {}

  @Post('/crear-tipo-equipo')
  createTipoEquipo(@Body() newTipoEquipoDto: CreateTipoEquipoDto){
    return this.tipoEquipoService.createTipoEquipo(newTipoEquipoDto);
  }

  @Get('/obtenerUsuarios')
  getTipoEquipos(): Promise<TipoEquipo[]> {
    return this.tipoEquipoService.getTipoEquipos();
  }

  @Get('/usuarui/:id')
  getTipoEquipo(@Param('id', ParseIntPipe) id: number) {
    return this.tipoEquipoService.getTipoEquipo(id);
  }

  @Put('/actualizar/:id')
  updateTipoEquipo(@Param('id', ParseIntPipe) id: number, @Body() tipoEquipo: UpdateTipoEquipoDto) {
    return this.tipoEquipoService.updateTipoEquipo(id, tipoEquipo);
  }

  @Delete(':id')
  deleteTipoEquipo(@Param('id', ParseIntPipe) id: number) {
    return this.tipoEquipoService.deleteTipoEquipo(id);
  }
}
