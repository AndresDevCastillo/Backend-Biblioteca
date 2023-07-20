import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstadoEquipoModule } from './estado-equipo/estado-equipo.module';

@Module({
  imports: [EstadoEquipoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
