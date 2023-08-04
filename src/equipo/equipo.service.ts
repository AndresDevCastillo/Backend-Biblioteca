import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipo } from './entities/equipo.entity';
import { Repository } from 'typeorm';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';

@Injectable()
export class EquipoService {
    constructor(
        @InjectRepository(Equipo)
        private equipoRepository: Repository<Equipo>,
    ){}

create(createEquipoDto: CreateEquipoDto) {
    return this.equipoRepository.insert(createEquipoDto);
  }

  findAll() {
    return this.equipoRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} estadoEquipo`;
  }

  update(id: number, updateEstadoEquipoDto: UpdateEquipoDto) {
    return `This action updates a #${id} estadoEquipo`;
  }

  remove(id: number) {
    return `This action removes a #${id} estadoEquipo`;
  }
}

