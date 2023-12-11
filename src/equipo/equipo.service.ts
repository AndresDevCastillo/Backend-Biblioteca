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
  ) {}

  async createEquipo(createEquipoDto: CreateEquipoDto) {
    return await this.equipoRepository.insert(createEquipoDto);
  }

  async getEquipos() {
    return await this.equipoRepository.find();
  }

  getEquipo(id: number) {
    return this.equipoRepository.findOne({
      where: {
        id,
      },
    });
  }

  updateEquipo(id: number, updateEstadoEquipoDto: UpdateEquipoDto) {
    return this.equipoRepository.update({ id }, updateEstadoEquipoDto);
  }

  async deleteEquipo(id: number) {
    return await this.equipoRepository.delete({ id });
  }
}
