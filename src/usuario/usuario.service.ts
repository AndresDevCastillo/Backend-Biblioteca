import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { IniciarSesionDto } from './dto/iniciarSesion.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
  ) {}

  async createUsuario(usuario: CreateUsuarioDto) {
    const existUsuario = await this.usuarioExist(usuario.cedula);
    if (!existUsuario) {
      const salt = 10;
      const hash = await bcrypt.hash(usuario.contrasena, salt);
      const u = { ...usuario };
      delete u.contrasena;
      u.contrasena = hash;
      return await this.usuarioRepository.insert(u);
    }
    return {
      creado: false,
      message: 'Ya existe un usuario con esa cédula',
    };
  }
  async iniciarSesion(usuario: IniciarSesionDto) {
    const usuarioBD = await this.usuarioRepository.findOne({
      where: { cedula: usuario.cedula },
    });
    if (usuarioBD != null) {
      const pCorrecta = await bcrypt.compare(
        usuario.contrasena,
        usuarioBD.contrasena,
      );
      return pCorrecta
        ? {
            login: true,
            message: 'Inicio de sesión correcto',
            usuario: usuarioBD,
          }
        : { login: false, message: 'Contraseña incorrecta' };
    }
    return {
      login: false,
      message: 'No existe ningún usuario con ese número de cédula',
    };
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
  async usuarioExist(cedula: number): Promise<boolean> {
    return await this.usuarioRepository
      .find({ where: { cedula: cedula } })
      .then((usuario) => usuario.length > 0)
      .catch(() => {
        return false;
      });
  }
}
