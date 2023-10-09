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
import { EstadoEquipoService } from './estado-equipo.service';
import { CreateEstadoEquipoDto } from './dto/create-estado-equipo.dto';
import { UpdateEstadoEquipoDto } from './dto/update-estado-equipo.dto';

@Controller('estado-equipo')
export class EstadoEquipoController {
  constructor(private readonly estadoEquipoService: EstadoEquipoService) {}

  @Post('/crear')
  async createEstadoEquipo(
    @Body() createEstadoEquipoDto: CreateEstadoEquipoDto,
  ) {
    console.log(createEstadoEquipoDto);
    return await this.estadoEquipoService.createEstadoEquipo(
      createEstadoEquipoDto,
    );
  }

  @Get()
  async getEstadoEquipos() {
    return await this.estadoEquipoService.getEstadoEquipos();
  }

  @Get('/estadoEquipo/:id')
  async getEstadoEquipo(@Param('id') id: number) {
    return await this.estadoEquipoService.getEstadoEquipo(id);
  }

  @Put('/actualizar/:id')
  async updateEstadoEquipo(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEstadoEquipoDto: UpdateEstadoEquipoDto,
  ) {
    return await this.estadoEquipoService.updateEstadoEquipo(
      id,
      updateEstadoEquipoDto,
    );
  }

  @Delete(':id')
  async deleteEstadoEquipo(@Param('id', ParseIntPipe) id: number) {
    return await this.estadoEquipoService.deleteEstadoEquipo(id);
  }
}
