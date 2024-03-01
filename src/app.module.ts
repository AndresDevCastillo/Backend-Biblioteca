/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstadoEquipoModule } from './estado-equipo/estado-equipo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoEquipo } from './estado-equipo/entities/estado-equipo.entity';
import { DataSource } from 'typeorm';
import { TipoEquipoModule } from './tipo-equipo/tipo-equipo.module';
import { RolModule } from './rol/rol.module';
import { UsuarioModule } from './usuario/usuario.module';
import { EquipoModule } from './equipo/equipo.module';
import { TipoEquipo } from './tipo-equipo/entities/tipo-equipo.entity';
import { Rol } from './rol/entities/rol.entity';
import { Usuario } from './usuario/entities/usuario.entity';
import { NovedadModule } from './novedad/novedad.module';
import { PrestamoModule } from './prestamo/prestamo.module';
import { EstadoPrestamoModule } from './estado-prestamo/estado-prestamo.module';
import { DetallePrestamoModule } from './detalle-prestamo/detalle-prestamo.module';
import { Equipo } from './equipo/entities/equipo.entity';
import { Novedad } from './novedad/entities/novedad.entity';
import { Prestamo } from './prestamo/entities/prestamo.entity';
import { EstadoPrestamo } from './estado-prestamo/entities/estado-prestamo.entity';
import { DetallePrestamo } from './detalle-prestamo/entities/detalle-prestamo.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'biblioteca',
      entities: [
        EstadoEquipo,
        TipoEquipo,
        Rol,
        Usuario,
        Equipo,
        Novedad,
        Prestamo,
        EstadoPrestamo,
        DetallePrestamo,
      ],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    EstadoEquipoModule,
    TipoEquipoModule,
    UsuarioModule,
    RolModule,
    EquipoModule,
    NovedadModule,
    PrestamoModule,
    EstadoPrestamoModule,
    DetallePrestamoModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
