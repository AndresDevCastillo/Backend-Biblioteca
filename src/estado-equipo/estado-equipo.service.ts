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
    const existe = await this.validarExiste(createEstadoEquipoDto.estado);
    console.log(existe);

    if (existe) { return new BadRequestException(`El Estado con el nombre ${createEstadoEquipoDto.estado} ya existe`) }
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

  async delete(id: number) {
    const existe = await this.validarExisteId(id);
    if (existe) {
      try {
        return await this.estadoEquipoRepository.delete(id);
      }
      catch (error) {
        console.log(error);
        return new InternalServerErrorException('Error al eliminar por ese id');
      }
    }
    return new NotFoundException(`El id: ${id} no existe`);
  }

  async update(EstadoUpdate: UpdateEstadoEquipoDto) {
    const existe = await this.validarExisteId(EstadoUpdate.id);
    if (existe) {
      try {
        return await this.estadoEquipoRepository.update(EstadoUpdate.id, EstadoUpdate);
      }
      catch (error) {
        console.log(error);
        return new InternalServerErrorException('Se presento un error actualizando');
      }

    }
    return new NotFoundException('No existe un estado equipo');
  }

  async validarExiste(estado: string) {
    const resp = await this.estadoEquipoRepository.findOneBy({ estado: estado });
    if (resp) {
      return true;
    }
    return false;
  }
  async validarExisteId(id: number) {
    const resp = await this.estadoEquipoRepository.findOneBy({ id: id });
    if (resp) {
      return true;
    }
    return false;
  }
}
