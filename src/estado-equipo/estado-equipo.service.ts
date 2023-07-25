import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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

  async create(createEstadoEquipoDto: CreateEstadoEquipoDto) {
    const existe = await this.validarExiste(createEstadoEquipoDto.Estado);
    console.log(existe);

    if (existe) { return new BadRequestException(`El Estado con el nombre ${createEstadoEquipoDto.Estado} ya existe`) }
    try {
      const EstadoCreado = this.estadoEquipoRepository.create(createEstadoEquipoDto);
      await this.estadoEquipoRepository.save(EstadoCreado);
      return EstadoCreado;
    }
    catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error guardando');
    }
  }

  async findAll() {

    try {
      const estadosEquipos = await this.estadoEquipoRepository.find();
      if (estadosEquipos.length !== 0) { return estadosEquipos };
      return new NotFoundException('No se encontro ningun equipo');
    }
    catch (error) {
      console.log(error);
      return new InternalServerErrorException('Ocurrio un Error al buscar');
    }
  }

  async findOne(id: number) {
    try {
      const estadoEquipo = await this.estadoEquipoRepository.findOneBy({ id: id });
      if (estadoEquipo) { return estadoEquipo; }
      return new NotFoundException(`No se encontro un estado con id ${id}`);
    }
    catch (error) {
      console.log(error);
      return new InternalServerErrorException('Error al buscar por Id')
    }
  }

  update(id: number, updateEstadoEquipoDto: UpdateEstadoEquipoDto) {
    return `This action updates a #${id} estadoEquipo`;
  }

  remove(id: number) {
    return `This action removes a #${id} estadoEquipo`;
  }

  async validarExiste(Estado: string) {
    const resp = await this.estadoEquipoRepository.findOneBy({ Estado: Estado });
    if (resp) {
      return true;
    }
    return false;
  }
}
