import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ZodValidationPipe } from 'src/validation/zodValidation.pipe';
import { NpcsService } from './npcs.service';
import { CreateNpcDto, createNpcSchema } from './dto/create-npc.dto';
import { UpdateNpcDto, updateNpcSchema } from './dto/update-npc.dto';

@Controller('npcs')
export class NpcsController {
  constructor(private readonly npcsService: NpcsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createNpcSchema))
  create(@Body() createNpcDto: CreateNpcDto) {
    return this.npcsService.create(createNpcDto);
  }

  @Get()
  findAll() {
    return this.npcsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.npcsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateNpcSchema)) updateNpcDto: UpdateNpcDto,
  ) {
    return this.npcsService.update(id, updateNpcDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.npcsService.remove(id);
  }
}
