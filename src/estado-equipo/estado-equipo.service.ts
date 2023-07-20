import { Injectable } from '@nestjs/common';
import { CreateEstadoEquipoDto } from './dto/create-estado-equipo.dto';
import { UpdateEstadoEquipoDto } from './dto/update-estado-equipo.dto';

@Injectable()
export class EstadoEquipoService {
  create(createEstadoEquipoDto: CreateEstadoEquipoDto) {
    return 'This action adds a new estadoEquipo';
  }

  findAll() {
    return `This action returns all estadoEquipo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estadoEquipo`;
  }

  update(id: number, updateEstadoEquipoDto: UpdateEstadoEquipoDto) {
    return `This action updates a #${id} estadoEquipo`;
  }

  remove(id: number) {
    return `This action removes a #${id} estadoEquipo`;
  }
}
