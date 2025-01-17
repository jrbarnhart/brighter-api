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
import { MonsterVariantsService } from './monsterVariants.service';
import {
  CreateMonsterVariantDto,
  createMonsterVariantSchema,
} from './dto/create-monsterVariant.dto';
import {
  UpdateMonsterVariantDto,
  updateMonsterVariantSchema,
} from './dto/update-monsterVariant.dto';

@Controller('monsters/variants')
export class MonsterVariantsController {
  constructor(
    private readonly monsterVariantsService: MonsterVariantsService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createMonsterVariantSchema))
  create(@Body() createMonsterVariantDto: CreateMonsterVariantDto) {
    return this.monsterVariantsService.create(createMonsterVariantDto);
  }

  @Get()
  findAll() {
    return this.monsterVariantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.monsterVariantsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateMonsterVariantSchema))
    updateMonsterVariantDto: UpdateMonsterVariantDto,
  ) {
    return this.monsterVariantsService.update(id, updateMonsterVariantDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.monsterVariantsService.remove(id);
  }
}
