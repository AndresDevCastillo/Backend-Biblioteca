import { Test, TestingModule } from '@nestjs/testing';
import { EstadoEquipoService } from './estado-equipo.service';

describe('EstadoEquipoService', () => {
  let service: EstadoEquipoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstadoEquipoService],
    }).compile();

    service = module.get<EstadoEquipoService>(EstadoEquipoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
