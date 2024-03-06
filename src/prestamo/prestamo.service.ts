import { Inject, Injectable } from '@nestjs/common';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Prestamo } from './entities/prestamo.entity';
import { DataSource, Repository } from 'typeorm';
import { EquipoService } from 'src/equipo/equipo.service';
import { DetallePrestamoService } from 'src/detalle-prestamo/detalle-prestamo.service';
import { EstadoPrestamoService } from 'src/estado-prestamo/estado-prestamo.service';
import { EntregaDto } from './dto/entrega.dto';
import { NovedadService } from 'src/novedad/novedad.service';

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
    @Inject(NovedadService) private novedadService: NovedadService,
  ) {}

  async createPrestamo(createPrestamoDto: CreatePrestamoDto) {
    console.log('DATOS ANDROID: ', createPrestamoDto);

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

            if (detalleEquipo.length != detalle.cantidad) {
              if (!equipoPrestado) {
                detalleEquipoPrestamo.push({
                  fecha_inicio: createPrestamoDto.fecha_inicio,
                  fecha_fin: createPrestamoDto.fecha_fin,
                  prestamo: prestamo.raw.insertId,
                  equipo: equipo.id,
                });
                detalleEquipo.push(equipo);
              }
            } else {
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

  async getPrestamo(id: number, action = 'all') {
    action = action.toLowerCase();
    let prestamos: Prestamo[];
    //idEstadoPrestamo = 1 es Reservado, idEstadoPrestamo=2 es Entregado y 3 es Devuelto
    if (action == 'entregar') {
      prestamos = await this.prestamoRepository.find({
        where: {
          usuario: { cedula: id },
          estado_prestamo: { id: 1 },
        },
        select: ['detalle', 'estado_prestamo', 'id', 'novedad'],
      });
    } else if (action == 'devolucion') {
      prestamos = await this.prestamoRepository.find({
        where: {
          usuario: { cedula: id },
          estado_prestamo: { id: 2 },
        },
        select: ['detalle', 'estado_prestamo', 'id', 'novedad'],
      });
    } else {
      prestamos = await this.prestamoRepository.find({
        where: {
          usuario: { cedula: id },
        },
      });
    }
    //Toco hacerlo así, no puedo evitar traer la información del usuario en la consulta
    prestamos = prestamos.map((prestamo) => {
      delete prestamo.usuario;
      return prestamo;
    });
    return prestamos;
  }
  async confirmar(id: number) {
    const exist = await this.existPrestamo(id);
    if (exist) {
      const estadoPrestamo =
        await this.estadoPrestamoService.getEstadoPrestamoByEstado('Entregado');
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

  async entregar(idPrestamo: number) {
    if (idPrestamo) {
      const estadoP =
        await this.estadoPrestamoService.getEstadoPrestamoByEstado('Entregado');
      await this.prestamoRepository.update(idPrestamo, {
        estado_prestamo: { id: estadoP.id },
      });
      return true;
    }
    return false;
  }

  async devolucion(entrega: EntregaDto) {
    //this.novedadService.createNovedad();
    const novedades: any = entrega.equipos.map((equipo) => {
      return {
        descripcion: equipo.observacion,
        prestamo: entrega.idPrestamo,
        equipo: equipo.id_equipo,
      };
    });
    const novedadCreate = await this.novedadService.crearNovedades(novedades);
    if (novedadCreate) {
      const estadoP =
        await this.estadoPrestamoService.getEstadoPrestamoByEstado('Devuelto');
      for (const equipo of entrega.equipos) {
        await this.equipoService.actualizarEstadoEquipo(
          equipo.id_equipo,
          equipo.estado_equipo,
        );
      }
      await this.prestamoRepository.update(entrega.idPrestamo, {
        estado_prestamo: { id: estadoP.id },
      });
      return true;
    }
    return false;
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
