import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Patch,
  Delete,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { EquipoService } from './equipo.service';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { Equipo } from './entities/equipo.entity';

@Controller('equipo')
export class EquipoController {
  constructor(private readonly equipoService: EquipoService) {}

  @Post('/crearEquipo')
  createEquipo(@Body() CreateEquipoDto: CreateEquipoDto) {
    return this.equipoService.createEquipo(CreateEquipoDto);
  }
  @Get()
  async getEquipos(): Promise<Equipo[]> {
    return await this.equipoService.getEquipos();
  }

  @Get('/obtenerEquipo/:id')
  getEquipo(@Param('id', ParseIntPipe) id: number): Promise<Equipo> {
    return this.equipoService.getEquipo(id);
  }

  @Put(':id')
  updateEquipo(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEquipoDto: UpdateEquipoDto,
  ) {
    return this.equipoService.updateEquipo(id, updateEquipoDto);
  }

  @Delete(':id')
  deleteEquipo(@Param('id', ParseIntPipe) id: number) {
    return this.equipoService.deleteEquipo(id);
  }
}
