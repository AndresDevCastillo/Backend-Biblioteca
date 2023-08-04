import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstadoEquipoModule } from './estado-equipo/estado-equipo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoEquipo } from './estado-equipo/entities/estado-equipo.entity';
import { DataSource } from 'typeorm';
import { PrestamoEstadoModule } from './prestamo-estado/prestamo-estado.module';
import { PrestamoEstado } from './prestamo-estado/entities/prestamo-estado.entity';
import { TipoEquipoModule } from './tipo-equipo/tipo-equipo.module';
import { RolesModule } from './roles/roles.module';
import { UsuarioModule } from './usuario/usuario.module';
import { EquipoModule } from './equipo/equipo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'biblioteca',
      entities: [EstadoEquipo,PrestamoEstado],
      synchronize: true,
      autoLoadEntities: true
    }), EstadoEquipoModule, PrestamoEstadoModule, TipoEquipoModule, RolesModule, UsuarioModule, EquipoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
