import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstadoEquipoModule } from './estado-equipo/estado-equipo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoEquipo } from './estado-equipo/entities/estado-equipo.entity';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'biblioteca',
      entities: [EstadoEquipo],
      synchronize: true,
      autoLoadEntities: true
    }), EstadoEquipoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
