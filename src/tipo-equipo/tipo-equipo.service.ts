import { Injectable } from '@nestjs/common';
import { CreateTipoEquipoDto } from './dto/create-tipo-equipo.dto';
import { UpdateTipoEquipoDto } from './dto/update-tipo-equipo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoEquipo } from './entities/tipo-equipo.entity';

@Injectable()
export class TipoEquipoService {
  constructor(
    @InjectRepository(TipoEquipo)
    private TipoEquipoRepository: Repository<TipoEquipo>,
){}
create(createTipoEquipoDto: CreateTipoEquipoDto) {
  return this.TipoEquipoRepository.insert(createTipoEquipoDto);
}

findAll() {
  return this.TipoEquipoRepository.find();
}

findOne(id: number) {
  return `This action returns a #${id} TipoEquipo`;
}

update(id: number, updateTipoEquipoDto: UpdateTipoEquipoDto) {
  return `This action updates a #${id} TipoEquipo`;
}

remove(id: number) {
  return `This action removes a #${id} TipoEquipo`;
}
}
