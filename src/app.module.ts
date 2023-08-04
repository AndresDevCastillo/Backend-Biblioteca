import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstadoEquipoModule } from './estado-equipo/estado-equipo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoEquipo } from './estado-equipo/entities/estado-equipo.entity';
import { DataSource } from 'typeorm';
import { TiposEquipoModule } from './tipos-equipo/tipos-equipo.module';
import { EstadoPrestamoModule } from './estado-prestamo/estado-prestamo.module';
import { EstadoPrestamo } from './estado-prestamo/entities/estado-prestamo.entity';
import { TiposEquipo } from './tipos-equipo/entities/tipos-equipo.entity';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'bibliotecasena',
      entities: [EstadoEquipo, EstadoPrestamo,TiposEquipo],
      synchronize: true,
      autoLoadEntities: true
    }), EstadoEquipoModule, TiposEquipoModule, EstadoPrestamoModule, UsuarioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
