import { Body, Controller, Delete, Get, Param, ParseIntPipe, Put, Post, UseGuards } from '@nestjs/common';
import { RolService} from './rol.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { Rol } from './entities/rol.entity';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('rol')
export class RolController {
  constructor(private readonly rolService: RolService) {}
  
  @Post('/crearRol')
  createRol(@Body() createrolDto: CreateRolDto) {
    return this.rolService.createRol(createrolDto);
  }
  @UseGuards(JwtAuthGuard) 
  @Get('/obtenerUsuario s')
  getRoles():Promise<Rol[]> {
    return this.rolService.getRoles();
  }

  @Get('/usuario/:id')
  getRol(@Param('id', ParseIntPipe) id: number): Promise<Rol> {
    return this.rolService.getRol(id);
  }

  @Delete(':id')
  deleteRol(@Param('id', ParseIntPipe) id: number) {
    return this.rolService.deleteRol(id);
  }

  @Put('/actualizar/:id')
  updateRol(@Param('id') id: number, @Body() rol: UpdateRolDto) {
    return this.rolService.updateRol(id, rol);
  }
}
