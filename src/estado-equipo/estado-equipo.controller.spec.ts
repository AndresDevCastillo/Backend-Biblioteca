import { Test, TestingModule } from '@nestjs/testing';
import { EstadoEquipoController } from './estado-equipo.controller';
import { EstadoEquipoService } from './estado-equipo.service';

describe('EstadoEquipoController', () => {
  let controller: EstadoEquipoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstadoEquipoController],
      providers: [EstadoEquipoService],
    }).compile();

    controller = module.get<EstadoEquipoController>(EstadoEquipoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
