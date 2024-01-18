import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { NovedadService } from './novedad.service';
import { CreateNovedadDto, novedadGeneral } from './dto/create-novedad.dto';
import { UpdateNovedadDto } from './dto/update-novedad.dto';
import { Novedad } from './entities/novedad.entity';

@Controller('novedad')
export class NovedadController {
  constructor(private readonly novedadService: NovedadService) {}

  @Post('/crear')
  async createNovedad(@Body() novedadGeneral: novedadGeneral) {
    return this.novedadService.createNovedad(novedadGeneral);
  }

  @Get('/obtenerUsuarios')
  getNovedades(): Promise<Novedad[]> {
    return this.novedadService.getNovedades();
  }

  @Get('/usuario/:id')
  getNovedad(@Param('id', ParseIntPipe) id: number): Promise<Novedad> {
    return this.novedadService.getNovedad(id);
  }

  @Put('/actualizar/:id')
  updateNovedad(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNovedadDto: UpdateNovedadDto,
  ) {
    return this.novedadService.updateNovedad(id, updateNovedadDto);
  }

  @Delete(':id')
  deleteNovedad(@Param('id', ParseIntPipe) id: number) {
    return this.novedadService.deleteNovedad(id);
  }
}
