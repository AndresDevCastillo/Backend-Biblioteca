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

  createEstadoEquipo(createEstadoEquipoDto: CreateEstadoEquipoDto) {
    return this.estadoEquipoRepository.insert(createEstadoEquipoDto);
  }

  getEstadoEquipos() {
    return this.estadoEquipoRepository.find();
  }

  getEstadoEquipo(id: number) {
    return this.estadoEquipoRepository.findOne({
      where: {
        id
      }
    });
  }

  updateEstadoEquipo(id: number, updateEstadoEquipoDto: UpdateEstadoEquipoDto) {
    return this.estadoEquipoRepository.update({id}, updateEstadoEquipoDto);
  }

  deleteEstadoEquipo(id: number) {
    return this.estadoEquipoRepository.delete({id});
  }
}
