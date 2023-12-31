import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UpdateUsuarioDto} from './dto/update-usuario.dto';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './entities/usuario.entity';


@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService)
  {}

  @Post('/crearUsuario')
  createUsuario(@Body() newUsuario: CreateUsuarioDto){
    return this.usuarioService.createUsuario(newUsuario);
  }

  @Get('/obtenerUsuarios')
  getUsuarios(): Promise<Usuario[]>{
    return this.usuarioService.getUsuarios();
  }

  @Get('/usuario/:id')
  getUsuario(@Param('id', ParseIntPipe) id: number): Promise<Usuario>{
    return this.usuarioService.getUsuario(id);
  }

  @Delete(':id')
  deleteUsuario(@Param('id', ParseIntPipe) id: number){
    return this.usuarioService.deleteUsuario(id);
  }

  @Put('/actualizar/id')
  updateUsuario(@Param('id', ParseIntPipe) id: number, @Body() usuario: UpdateUsuarioDto){
    return this.usuarioService.updateUsuario(id, usuario);
  }
}
