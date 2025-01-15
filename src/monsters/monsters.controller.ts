import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MonstersService } from './monsters.service';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { UpdateMonsterDto } from './dto/update-monster.dto';
import { CreateMonsterVariantDto } from './dto/create-monster-variant.dto';
import { UpdateMonsterVariantDto } from './dto/update-monster-variant.dto';

@Controller('monsters')
export class MonstersController {
  constructor(private readonly monstersService: MonstersService) {}

  // Monsters
  @Post()
  create(@Body() createMonsterDto: CreateMonsterDto) {
    return this.monstersService.createMonster(createMonsterDto);
  }

  @Get()
  findAll() {
    return this.monstersService.findAllMonsters();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.monstersService.findOneMonster(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMonsterDto: UpdateMonsterDto) {
    return this.monstersService.updateMonster(+id, updateMonsterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.monstersService.removeMonster(+id);
  }

  // Monster Variants
  @Post('variants')
  createMonsterVariant(
    @Body() createMonsterVariantDto: CreateMonsterVariantDto,
  ) {
    return this.monstersService.createMonsterVariant(createMonsterVariantDto);
  }

  @Get('variants')
  findAllMonsterVariants() {
    return this.monstersService.findAllMonsterVariants();
  }

  @Get('variants/:id')
  findOneMonsterVariant(@Param('id') id: string) {
    return this.monstersService.findOneMonsterVariant(+id);
  }

  @Patch('variants/:id')
  updateMonsterVariant(
    @Param('id') id: string,
    @Body() updateMonsterVariantDto: UpdateMonsterVariantDto,
  ) {
    return this.monstersService.updateMonsterVariant(
      +id,
      updateMonsterVariantDto,
    );
  }

  @Delete('variants/:id')
  removeMonsterVariant(@Param('id') id: string) {
    return this.monstersService.removeMonsterVariant(+id);
  }
}
