import { Injectable } from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';
import { Rol } from './entities/rol.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateRolDto } from './dto/update-rol.dto';

@Injectable()
export class RolService {
    constructor(
        @InjectRepository(Rol) private rolRepository: Repository<Rol>,
    ){}
    createRol(createrolDto: CreateRolDto) {
      return this.rolRepository.insert(createrolDto);
    }

    getRoles() {
      return this.rolRepository.find();
    }

    getRol(id: number) {
      return this.rolRepository.findOne({
        where: {
          id
        }
      });
    }

    deleteRol(id:number){
      return this.rolRepository.delete({id});
    }
    
    updateRol(id:number, rol: UpdateRolDto){
      return this.rolRepository.update({id}, rol);
    }

}
