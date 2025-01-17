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
import { MonstersService } from './monsters.service';
import {
  CreateMonsterDto,
  createMonsterSchema,
} from './dto/create-monster.dto';
import {
  UpdateMonsterDto,
  updateMonsterSchema,
} from './dto/update-monster.dto';

@Controller('monsters')
export class MonstersController {
  constructor(private readonly monstersService: MonstersService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createMonsterSchema))
  create(@Body() createMonsterDto: CreateMonsterDto) {
    return this.monstersService.create(createMonsterDto);
  }

  @Get()
  findAll() {
    return this.monstersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.monstersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateMonsterSchema))
    updateMonsterDto: UpdateMonsterDto,
  ) {
    return this.monstersService.update(id, updateMonsterDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.monstersService.remove(id);
  }
}
