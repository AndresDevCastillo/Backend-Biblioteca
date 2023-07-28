import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateTipoEquipoDto } from './dto/create-tipo-equipo.dto';
import { UpdateTipoEquipoDto } from './dto/update-tipo-equipo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoEquipo } from './entities/tipo-equipo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TipoEquipoService {
  constructor(
    @InjectRepository(TipoEquipo)
    private tipoEquipoRespository: Repository<TipoEquipo>,
  ) {}
  async create(
    createTipoEquipoDto: CreateTipoEquipoDto,
  ): Promise<BadRequestException | TipoEquipo | InternalServerErrorException> {
    const existeTipo = await this.existeTipoEquipo(createTipoEquipoDto.tipo);
    if (existeTipo) {
      return new BadRequestException(
        `El tipo de equipo: ${createTipoEquipoDto.tipo} ya existe`,
      );
    }
    try {
      const TipoEquipoCreado =
        this.tipoEquipoRespository.create(createTipoEquipoDto);
      await this.tipoEquipoRespository.save(createTipoEquipoDto);
      return TipoEquipoCreado;
    } catch (error) {
      return new InternalServerErrorException(
        `Error creando el tipo de equipo: ${error}`,
      );
    }
  }

  async findAll() {
    return await this.tipoEquipoRespository.find();
  }

  async findOne(id: number) {
    return await this.tipoEquipoRespository.findBy({ id: id });
  }

  async update(tipoEquipoUpdate: UpdateTipoEquipoDto) {
    const existeTipo = await this.existeTipoEquipo(tipoEquipoUpdate.tipo);
    const existeId = await this.existeIdTipoEquipo(tipoEquipoUpdate.id);
    if (existeTipo || !existeId) {
      return new BadRequestException(
        `El tipo de equipo: ${tipoEquipoUpdate.tipo} ya existe o el id: ${tipoEquipoUpdate.id} no existe`,
      );
    }
    try {
      return await this.tipoEquipoRespository.update(
        tipoEquipoUpdate.id,
        tipoEquipoUpdate,
      );
    } catch (error) {
      return new InternalServerErrorException(
        `Error actualizando el tipo de equipo: ${error}`,
      );
    }
  }

  async remove(id: number) {
    const existeIdTipoEquipo = await this.existeIdTipoEquipo(id);
    if (existeIdTipoEquipo) {
      try {
        return await this.tipoEquipoRespository.delete(id);
      } catch (error) {
        return new InternalServerErrorException(
          `Error actualizando el tipo de equipo: ${error}`,
        );
      }
    }
    return new BadRequestException(
      `El id: ${id} no existe, no se puede eliminar`,
    );
  }

  async existeTipoEquipo(tipo: string): Promise<boolean | void> {
    return await this.tipoEquipoRespository
      .findBy({ tipo: tipo })
      .then((tipo) => {
        return tipo == null ? false : tipo.length == 0 ? false : true;
      });
  }

  async existeIdTipoEquipo(id: number): Promise<boolean> {
    return await this.tipoEquipoRespository.findBy({ id: id }).then((id) => {
      return id == null ? false : id.length == 0 ? false : true;
    });
  }
}
