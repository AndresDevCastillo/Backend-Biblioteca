import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario) private  usuarioRepository: Repository<Usuario>
    ){}

    createUsuario(usuario: CreateUsuarioDto){
        return this.usuarioRepository.insert(usuario)
    }

    getUsuarios(){
        return this.usuarioRepository.find();
    }
    
    getUsuario(id: number){
        return this.usuarioRepository.findOne({
            where: {
                id
            }
        });
    }

    deleteUsuario(id:number){
        return this.usuarioRepository.delete({id});
    }

    updateUsuario(id: number, usuario: UpdateUsuarioDto){
        return this.usuarioRepository.update({id}, usuario);
    }
}
