import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
  ) {}

  async createUsuario(usuario: CreateUsuarioDto) {
    const c = { ...usuario };
    c.contrasena = await bcrypt.hash(c.contrasena, 10);
    return this.usuarioRepository.insert(c);
  }

  async getUsuarios() {
    return await this.usuarioRepository.find();
  }

  getUsuario(id: number) {
    return this.usuarioRepository.findOne({
      where: {
        cedula: id,
      },
    });
  }

  deleteUsuario(id: number) {
    return this.usuarioRepository.delete({ cedula: id });
  }

  updateUsuario(id: number, usuario: UpdateUsuarioDto) {
    return this.usuarioRepository.update({ cedula: id }, usuario);
  }
}
