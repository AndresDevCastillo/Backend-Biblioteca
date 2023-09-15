import { Injectable } from '@nestjs/common';
import { CreateEstadoPrestamoDto } from './dto/create-estado-prestamo.dto';
import { UpdateEstadoPrestamoDto } from './dto/update-estado-prestamo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EstadoPrestamo } from './entities/estado-prestamo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstadoPrestamoService {

  constructor(
    @InjectRepository(EstadoPrestamo) private estadoPrestamo: Repository<EstadoPrestamo>
  ){}

  createEstadoPrestamo(createEstadoPrestamoDto: CreateEstadoPrestamoDto) {
    return this.estadoPrestamo.insert(createEstadoPrestamoDto);
  }

  getEstadoPrestamos() {
    return this.estadoPrestamo.find();
  }

  getEstadoPrestamo(id: number) {
    return this.estadoPrestamo.findOne({
      where: {
        id
      }
    });
  }

  updateEstadoPrestamo(id: number, updateEstadoPrestamoDto: UpdateEstadoPrestamoDto) {
    return this.estadoPrestamo.update({id}, updateEstadoPrestamoDto);
  }

  deleteEstadoPrestamo(id: number) {
    return this.estadoPrestamo.delete({id});
  }
}
