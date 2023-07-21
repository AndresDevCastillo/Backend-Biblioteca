import { Injectable } from '@nestjs/common';
import { CreateEstadoEquipoDto } from './dto/create-estado-equipo.dto';
import { UpdateEstadoEquipoDto } from './dto/update-estado-equipo.dto';
import { EstadoEquipo } from './entities/estado-equipo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EstadoEquipoService {
  constructor(
    @InjectRepository(EstadoEquipo)
    private estadoEquipoRepository: Repository<EstadoEquipo>,
  ) { }

  create(createEstadoEquipoDto: CreateEstadoEquipoDto) {
    return this.estadoEquipoRepository.insert(createEstadoEquipoDto);
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
