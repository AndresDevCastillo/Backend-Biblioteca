import { Injectable } from '@nestjs/common';
import { CreateDetallePrestamoDto } from './dto/create-detalle-prestamo.dto';
import { UpdateDetallePrestamoDto } from './dto/update-detalle-prestamo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetallePrestamo } from './entities/detalle-prestamo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DetallePrestamoService {

  constructor(
    @InjectRepository(DetallePrestamo) private detallePrestamoRepository: Repository<DetallePrestamo>
  ){}

  createDetallePrestamo( detallePrestamo: CreateDetallePrestamoDto) {
    return this.detallePrestamoRepository.insert(detallePrestamo);
  }

  getDetallePrestamos() {
    return this.detallePrestamoRepository.find();
  }

  getDetallePrestamo(id: number) {
    return this.detallePrestamoRepository.findOne({
      where: {
        id
      }
    });
  }

  updateDetallePrestamo(id: number, updateDetallePrestamoDto: UpdateDetallePrestamoDto) {
    return this.detallePrestamoRepository.update({id}, updateDetallePrestamoDto);
  }

  deleteDetallePrestamo(id: number) {
    return this.detallePrestamoRepository.delete({id});
  }
}
