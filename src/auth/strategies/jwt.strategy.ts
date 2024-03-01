import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-strategy.interface';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    // Injecta el modelo de usuario
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
    @Inject(JwtService) private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get<string>('SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(
    payload: JwtPayload,
  ): Promise<Usuario | { access_token: string }> {
    const { cedula } = payload;
    const userBd = await this.usuarioRepository.find({
      where: {
        cedula: cedula,
      },
    });
    if (userBd.length == 0) {
      throw new UnauthorizedException('El usuario no esta registrado');
    }
    const payloadZ = {
      sub: userBd[0].cedula,
      usuario: userBd[0].nombre,
      rol: userBd[0].rol.descripcion,
      id_rol: userBd[0].rol.id,
    };
    return {
      ...userBd,
      access_token: await this.jwtService.signAsync(payloadZ),
    };
  }

  async loginJwt(payload: JwtPayload): Promise<any> {
    const { cedula, password } = payload;

    const userBd = await this.usuarioRepository.find({
      where: {
        cedula: cedula,
      },
      relations: {
        rol: true,
      },
      select: [
        'cedula',
        'nombre',
        'apellido',
        'email',
        'contrasena',
        'rol',
        'telefono',
      ],
    });
    if (userBd.length == 0) {
      throw new UnauthorizedException('El usuario no esta registrado');
    } else if (!bcrypt.compareSync(password, userBd[0].contrasena)) {
      throw new UnauthorizedException('La contraseña es incorrecta');
    }
    const payloadZ = {
      sub: userBd[0].cedula,
      user: userBd[0].nombre,
      rol: userBd[0].rol,
      id_rol: userBd[0].rol.id
    };
    delete userBd[0].contrasena;
    const userReturn = {
     ...userBd[0],
      access_token: await this.jwtService.signAsync(payloadZ),
    };
    return userReturn;
  }
}
