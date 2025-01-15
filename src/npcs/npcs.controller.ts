import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NpcsService } from './npcs.service';
import { CreateNpcDto } from './dto/create-npc.dto';
import { UpdateNpcDto } from './dto/update-npc.dto';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';

@Controller('npcs')
export class NpcsController {
  constructor(private readonly npcsService: NpcsService) {}

  // Npcs
  @Post()
  createNpc(@Body() createNpcDto: CreateNpcDto) {
    return this.npcsService.createNpc(createNpcDto);
  }

  @Get()
  findAllNpcs() {
    return this.npcsService.findAllNpcs();
  }

  @Get(':id')
  findOneNpc(@Param('id') id: string) {
    return this.npcsService.findOneNpc(+id);
  }

  @Patch(':id')
  updateNpc(@Param('id') id: string, @Body() updateNpcDto: UpdateNpcDto) {
    return this.npcsService.updateNpc(+id, updateNpcDto);
  }

  @Delete(':id')
  removeNpc(@Param('id') id: string) {
    return this.npcsService.removeNpc(+id);
  }

  // Vendors
  @Post('vendors')
  createVendor(@Body() createVendorDto: CreateVendorDto) {
    return this.npcsService.createVendor(createVendorDto);
  }

  @Get('vendors')
  findAllVendors() {
    return this.npcsService.findAllVendors();
  }

  @Get('vendors/:id')
  findOneVendor(@Param('id') id: string) {
    return this.npcsService.findOneVendor(+id);
  }

  @Patch('vendors/:id')
  updateVendor(
    @Param('id') id: string,
    @Body() updateVendorDto: UpdateVendorDto,
  ) {
    return this.npcsService.updateVendor(+id, updateVendorDto);
  }

  @Delete('vendors/:id')
  removeVendor(@Param('id') id: string) {
    return this.npcsService.removeVendor(+id);
  }
}
