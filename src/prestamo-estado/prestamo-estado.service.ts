import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PrestamoEstado } from './entities/prestamo-estado.entity';
import { Repository } from 'typeorm';
import { CreatePrestamoEstado } from './dto/create-prestamo-estado.dto';


@Injectable()
export class PrestamoEstadoService {
    constructor(
        @InjectRepository(PrestamoEstado)
        private tablaPrestamoEstado: Repository<PrestamoEstado>,
    ) { }

    async CrearPrestamoEstado(Prestamo: CreatePrestamoEstado) {
        const existeEstado = await this.tablaPrestamoEstado.find({ where: { estado: Prestamo.estado } });
        console.log(existeEstado);
        if (existeEstado.length == 0) {
            return await this.tablaPrestamoEstado.insert(Prestamo);

        }
        return 'Nombre de estado de prestamo existe';
       
    }


}
