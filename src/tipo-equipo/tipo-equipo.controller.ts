import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TipoEquipoService } from './tipo-equipo.service';
import { CreateTipoEquipoDto } from './dto/create-tipo-equipo.dto';
import { UpdateTipoEquipoDto } from './dto/update-tipo-equipo.dto';

@Controller('tipo-equipo')
export class TipoEquipoController {
  constructor(private readonly tipoEquipoService: TipoEquipoService) {}

  @Post('/crear')
  create(@Body() createTipoEquipoDto: CreateTipoEquipoDto) {
    console.log(createTipoEquipoDto);
    return this.tipoEquipoService.create(createTipoEquipoDto);
  }

  @Get()
  findAll() {
    return this.tipoEquipoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoEquipoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoEquipoDto: UpdateTipoEquipoDto) {
    return this.tipoEquipoService.update(+id, updateTipoEquipoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoEquipoService.remove(+id);
  }
}
