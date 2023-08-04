import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RolService} from './rol.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';

@Controller('rol')
export class RolController {
  constructor(private readonly rolService: RolService) {}
  
  @Post('/crear')
  create(@Body() createrolDto: CreateRolDto) {
    console.log(createrolDto);
    return this.rolService.create(createrolDto);
  }

  @Get()
  findAll() {
    return this.rolService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updaterolDto: UpdateRolDto) {
    return this.rolService.update(+id, updaterolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolService.remove(+id);
  }
}
