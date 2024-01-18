import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
  ) {}

  createUsuario(usuario: CreateUsuarioDto) {
    return this.usuarioRepository.insert(usuario);
  }

  async getUsuarios() {
    return await this.usuarioRepository.find({ relations: ['rol'] });
  }

  getUsuario(id: number) {
    return this.usuarioRepository.findOne({
      where: {
        cedula: id,
      },
      relations: ['rol'],
    });
  }

  deleteUsuario(id: number) {
    return this.usuarioRepository.delete({ cedula: id });
  }

  updateUsuario(id: number, usuario: UpdateUsuarioDto) {
    return this.usuarioRepository.update({ cedula: id }, usuario);
  }
}
