import { Injectable } from '@nestjs/common';
import { CreateNovedadDto, novedadGeneral } from './dto/create-novedad.dto';
import { UpdateNovedadDto } from './dto/update-novedad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Novedad } from './entities/novedad.entity';
import { Repository } from 'typeorm';
import { Equipo } from 'src/equipo/entities/equipo.entity';
import { Prestamo } from 'src/prestamo/entities/prestamo.entity';

@Injectable()
export class NovedadService {
  constructor(
    @InjectRepository(Novedad) private novedadRepository: Repository<Novedad>,
    @InjectRepository(Equipo) private equipoRepository: Repository<Equipo>,
    @InjectRepository(Prestamo)
    private prestamoRepository: Repository<Prestamo>,
  ) {}

  async createNovedad(novedadG: novedadGeneral) {
    await this.prestamoRepository.update(novedadG.prestamo, {
      estado_prestamo: novedadG.estado_prestamo,
    });
    novedadG.novedades.forEach(async (novedad) => {
      await this.equipoRepository.update(novedad.equipo, {
        estado_equipo: novedad.estado_equipo,
      });
      await this.novedadRepository.insert({
        descripcion: novedad.descripcion,
        equipo: novedad.equipo,
        prestamo: novedadG.prestamo,
      });
    });
  }

  getNovedades() {
    return this.novedadRepository.find();
  }

  getNovedad(id: number) {
    return this.novedadRepository.findOne({
      where: {
        id,
      },
    });
  }

  updateNovedad(id: number, updateNovedadDto: UpdateNovedadDto) {
    return this.novedadRepository.update({ id }, updateNovedadDto);
  }

  deleteNovedad(id: number) {
    return this.novedadRepository.delete({ id });
  }
}
