import { Injectable } from '@nestjs/common';
import { CreateEstadoPrestamoDto } from './dto/create-estado-prestamo.dto';
import { UpdateEstadoPrestamoDto } from './dto/update-estado-prestamo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EstadoPrestamo } from './entities/estado-prestamo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstadoPrestamoService {
  constructor(
    @InjectRepository(EstadoPrestamo)
    private estadoPrestamoRepository: Repository<EstadoPrestamo>,
  ) {}

  async createEstadoPrestamo(createEstadoPrestamoDto: CreateEstadoPrestamoDto) {
    return await this.estadoPrestamoRepository.insert(createEstadoPrestamoDto);
  }

  async getEstadoPrestamos() {
    return await this.estadoPrestamoRepository.find();
  }

  async getEstadoPrestamo(id: number) {
    return await this.estadoPrestamoRepository.findOne({ where: { id: id } });
  }
  async getEstadoPrestamoByEstado(
    estado = 'Prestado',
  ): Promise<EstadoPrestamo> {
    return await this.estadoPrestamoRepository.findOne({
      where: { estado: estado },
    });
  }

  updateEstadoPrestamo(
    id: number,
    updateEstadoPrestamoDto: UpdateEstadoPrestamoDto,
  ) {
    return this.estadoPrestamoRepository.update(
      { id },
      updateEstadoPrestamoDto,
    );
  }

  deleteEstadoPrestamo(id: number) {
    return this.estadoPrestamoRepository.delete({ id });
  }
}
