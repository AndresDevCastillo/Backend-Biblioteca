import { Injectable } from '@nestjs/common';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Prestamo } from './entities/prestamo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PrestamoService {
  constructor(
    @InjectRepository(Prestamo) private prestamoRepository: Repository<Prestamo>
  ){}

  createPrestamo(createPrestamoDto: CreatePrestamoDto) {
    return this.prestamoRepository.insert(createPrestamoDto);
  }

  getPrestamos() {
    return this.prestamoRepository.find();
  }

  getPrestamo(id: number) {
    return this.prestamoRepository.findOne({
      where: {
        id
      }
    });
  }

  updatePrestamo(id: number, updatePrestamoDto: UpdatePrestamoDto) {
    return this.prestamoRepository.update(id, updatePrestamoDto);
  }

  deletePrestamo(id: number) {
    return this.prestamoRepository.delete(id);
  }
}
