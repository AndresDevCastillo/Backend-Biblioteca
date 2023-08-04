import { Injectable } from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';
import { Rol } from './entities/rol.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateRolDto } from './dto/update-rol.dto';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol)
    private rolRepository: Repository<Rol>,
){}
create(createrolDto: CreateRolDto) {
  return this.rolRepository.insert(createrolDto);
}

findAll() {
  return this.rolRepository.find();
}

findOne(id: number) {
  return `This action returns a #${id} rol`;
}

update(id: number, updaterolDto: UpdateRolDto) {
  return `This action updates a #${id} rol`;
}

remove(id: number) {
  return `This action removes a #${id} rol`;
}
}
