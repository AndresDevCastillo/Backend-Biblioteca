import { Injectable } from '@nestjs/common';
import { CreateDetallePrestamoDto } from './dto/create-detalle-prestamo.dto';
import { UpdateDetallePrestamoDto } from './dto/update-detalle-prestamo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetallePrestamo } from './entities/detalle-prestamo.entity';
import {
  DataSource,
  In,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';

@Injectable()
export class DetallePrestamoService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(DetallePrestamo)
    private detallePrestamoRepository: Repository<DetallePrestamo>,
  ) {}

  async createDetallePrestamo(
    detallePrestamo: CreateDetallePrestamoDto[] | any[],
  ) {
    //console.log('detall', detallePrestamo);

    return await this.dataSource
      .getRepository(DetallePrestamo)
      .createQueryBuilder()
      .insert()
      .into(DetallePrestamo)
      .values(detallePrestamo)
      .execute();
    //return this.detallePrestamoRepository.insert(detallePrestamo);
  }

  getDetallePrestamos() {
    return this.detallePrestamoRepository.find();
  }

  getDetallePrestamo(id: number) {
    return this.detallePrestamoRepository.findOne({
      where: {
        id,
      },
    });
  }

  updateDetallePrestamo(
    id: number,
    updateDetallePrestamoDto: UpdateDetallePrestamoDto,
  ) {
    return this.detallePrestamoRepository.update(
      { id },
      updateDetallePrestamoDto,
    );
  }

  deleteDetallePrestamo(id: number) {
    return this.detallePrestamoRepository.delete({ id });
  }
  /**
   *
   * @param  idEquipo Id del equipo a prestar
   * @param  fecha_inicio Fecha de inicio del préstamo del equipo
   * @param  fecha_fin Fecha final del préstamo del equipo
   * @returns {Promise<boolean>} Retorna true, si el equipo ya está prestado en esas fechas, de otro modo, retorna false
   */
  async equipoPrestado(
    idEquipo: number,
    fecha_inicio: Date,
    fecha_fin: Date,
  ): Promise<boolean> {
    return await this.dataSource
      .getRepository(DetallePrestamo)
      .find({
        where: {
          fecha_inicio: MoreThanOrEqual(fecha_inicio),
          fecha_fin: LessThanOrEqual(fecha_fin),
          equipo: { id: idEquipo },
          prestamo: { estado_prestamo: { id: In([1, 2]) } },
        },
      })
      .then((detalle) => {
        console.log('detalePres', detalle);

        return detalle.length > 0;
      })
      .catch((error) => {
        console.log(error);
        return true;
      });
  }
}
