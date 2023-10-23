import { Inject, Injectable } from '@nestjs/common';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Prestamo } from './entities/prestamo.entity';
import { DataSource, Repository } from 'typeorm';
import { EquipoService } from 'src/equipo/equipo.service';
import { Equipo } from 'src/equipo/entities/equipo.entity';
import { DetallePrestamoService } from 'src/detalle-prestamo/detalle-prestamo.service';
import { EstadoPrestamoService } from 'src/estado-prestamo/estado-prestamo.service';

@Injectable()
export class PrestamoService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Prestamo)
    private prestamoRepository: Repository<Prestamo>,
    @Inject(EquipoService) private equipoService: EquipoService,
    @Inject(DetallePrestamoService)
    private detallePrestamoService: DetallePrestamoService,
    @Inject(EstadoPrestamoService)
    private estadoPrestamoService: EstadoPrestamoService,
  ) {}

  async createPrestamo(createPrestamoDto: CreatePrestamoDto) {
    const msgResp = [];
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.manager.find(Prestamo);
    await queryRunner.startTransaction();
    try {
      const prestamo = await this.prestamoRepository.insert({
        usuario: createPrestamoDto.usuario,
        estado_prestamo: { id: 1 },
      });
      const detalleEquipoPrestamo = [];
      let index = 0;

      for (const detalle of createPrestamoDto.detalle) {
        const equipos = await this.equipoService.getEquiposByEstadoAndTipo(
          'Bueno',
          detalle.tipo_equipo,
        );
        if (equipos.length > 0) {
          // let cantEquipo = 0;
          let equipoPrestado: boolean;
          const detalleEquipo = [];
          for (const equipo of equipos) {
            equipoPrestado = await this.detallePrestamoService.equipoPrestado(
              equipo.id,
              createPrestamoDto.fecha_inicio,
              createPrestamoDto.fecha_fin,
            );
            if (!equipoPrestado) {
              detalleEquipoPrestamo.push({
                fecha_inicio: createPrestamoDto.fecha_inicio,
                fecha_fin: createPrestamoDto.fecha_fin,
                prestamo: prestamo.raw.insertId,
                equipo: equipo.id,
              });
              detalleEquipo.push(equipo);
            }
            if (detalleEquipoPrestamo.length == detalle.cantidad) {
              break;
            }
          }
          if (detalleEquipo.length > 0) {
            msgResp.push({
              indexPrestamo: index,
              prestado: true,
              cantPrestados: detalleEquipo.length,
              equipos: detalleEquipo,
            });
          } else {
            msgResp.push({
              indexPrestamo: index,
              message:
                'No hay equipos disponibles para prestar, están ocupados',
              prestado: false,
            });
          }
        } else {
          msgResp.push({
            indexPrestamo: index,
            message: 'No hay equipos registrados',
            prestado: false,
          });
          //return { message: `No hay equipos para prestar` };
        }
        index++;
      }
      if (detalleEquipoPrestamo.length > 0) {
        await this.detallePrestamoService.createDetallePrestamo(
          detalleEquipoPrestamo,
        );
      }
      msgResp.push({ idPrestamo: prestamo.raw.insertId });
      await queryRunner.commitTransaction();
    } catch (error) {
      console.log('error Transaccion', error);
      await queryRunner.rollbackTransaction();
      return error;
    } finally {
      await queryRunner.release();
    }
    return msgResp;
    //return await this.prestamoRepository.insert(createPrestamoDto);
  }

  async getPrestamos() {
    return await this.prestamoRepository.find();
  }

  async getPrestamo(id: number) {
    return await this.prestamoRepository.find({
      where: {
        usuario: { id: id },
      },
    });
  }
  async confirmar(id: number) {
    const exist = await this.existPrestamo(id);
    if (exist) {
      const estadoPrestamo =
        await this.estadoPrestamoService.getEstadoPrestamoByEstado('Prestado');
      if (estadoPrestamo) {
        await this.prestamoRepository.update(
          { id: id },
          { estado_prestamo: { id: estadoPrestamo.id } },
        );
        return { confirm: true, message: 'Préstamo confirmado' };
      }
    }
    return { confirm: false, message: 'No existe el préstamo' };
  }
  updatePrestamo(id: number, updatePrestamoDto: UpdatePrestamoDto) {
    return this.prestamoRepository.update(id, updatePrestamoDto);
  }

  async deletePrestamo(id: number) {
    return await this.prestamoRepository.delete({ id: id });
  }

  private async existPrestamo(id: number): Promise<boolean> {
    return await this.prestamoRepository
      .findBy({ id: id })
      .then((prestamo) => {
        return prestamo.length > 0;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }
}
