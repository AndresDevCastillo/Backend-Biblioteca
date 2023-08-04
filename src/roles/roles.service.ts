import { Injectable } from '@nestjs/common';
import { CreateRolesDto } from './dto/create-roles.dto';
import { Roles } from './entities/roles.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateRolesDto } from './dto/update-roles.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>,
){}
create(createRolesDto: CreateRolesDto) {
  return this.rolesRepository.insert(createRolesDto);
}

findAll() {
  return this.rolesRepository.find();
}

findOne(id: number) {
  return `This action returns a #${id} roles`;
}

update(id: number, updateRolesDto: UpdateRolesDto) {
  return `This action updates a #${id} roles`;
}

remove(id: number) {
  return `This action removes a #${id} roles`;
}
}
