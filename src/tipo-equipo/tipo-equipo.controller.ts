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
import { TipoEquipoService } from './tipo-equipo.service';
import { CreateTipoEquipoDto } from './dto/create-tipo-equipo.dto';
import { UpdateTipoEquipoDto } from './dto/update-tipo-equipo.dto';

@Controller('tipo-equipo')
export class TipoEquipoController {
  constructor(private readonly tipoEquipoService: TipoEquipoService) {}

  @Post('/crear')
  async create(@Body() createTipoEquipoDto: CreateTipoEquipoDto) {
    return await this.tipoEquipoService.create(createTipoEquipoDto);
  }

  @Get()
  async findAll() {
    return await this.tipoEquipoService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tipoEquipoService.findOne(id);
  }

  @Put()
  async update(@Body() tipoEquipo: UpdateTipoEquipoDto) {
    return this.tipoEquipoService.update(tipoEquipo);
  }

  @Delete('/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.tipoEquipoService.remove(id);
  }
}
