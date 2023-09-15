import { Injectable } from '@nestjs/common';
import { CreateNovedadDto } from './dto/create-novedad.dto';
import { UpdateNovedadDto } from './dto/update-novedad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Novedad } from './entities/novedad.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NovedadService {

  constructor(
    @InjectRepository(Novedad) private novedadRepository: Repository<Novedad>
  ){}

  createNovedad(createNovedadDto: CreateNovedadDto) {
    return this.novedadRepository.insert(createNovedadDto)
  }

  getNovedades() {
    return this.novedadRepository.find();
  }

  getNovedad(id: number) {
    return this.novedadRepository.findOne({
      where: {
        id
      }
    });
  }

  updateNovedad(id: number, updateNovedadDto: UpdateNovedadDto) {
    return this.novedadRepository.update({id}, updateNovedadDto);
  }

  deleteNovedad(id: number) {
    return this.novedadRepository.delete({id});
  }
}
