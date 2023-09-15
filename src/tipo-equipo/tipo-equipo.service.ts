import { Injectable } from '@nestjs/common';
import { CreateTipoEquipoDto } from './dto/create-tipo-equipo.dto';
import { UpdateTipoEquipoDto } from './dto/update-tipo-equipo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoEquipo } from './entities/tipo-equipo.entity';

@Injectable()
export class TipoEquipoService {
  constructor(@InjectRepository(TipoEquipo) private tipoEquipoRepository: Repository<TipoEquipo>,
){}
createTipoEquipo(createTipoEquipoDto: CreateTipoEquipoDto) {
  return this.tipoEquipoRepository.insert(createTipoEquipoDto);
}

getTipoEquipos() {
  return this.tipoEquipoRepository.find();
}

getTipoEquipo(id: number) {
  return this.tipoEquipoRepository.findOne({
    where: {
      id
    }
  });
}

updateTipoEquipo(id: number, tipoEquipo: UpdateTipoEquipoDto) {
  return this.tipoEquipoRepository.update({id}, tipoEquipo);
}

deleteTipoEquipo(id: number) {
  return this.tipoEquipoRepository.delete({id});
}
}
