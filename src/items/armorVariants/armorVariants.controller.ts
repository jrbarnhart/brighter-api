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
import { ArmorVariantsService } from './armorVariants.service';
import {
  CreateArmorVariantDto,
  createArmorVariantSchema,
} from './dto/create-armorVariant.dto';
import {
  UpdateArmorVariantDto,
  updateArmorVariantSchema,
} from './dto/update-armorVariant.dto';

@Controller('armorVariants')
export class ArmorVariantsController {
  constructor(private readonly armorVariantsService: ArmorVariantsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createArmorVariantSchema))
  create(@Body() createArmorVariantDto: CreateArmorVariantDto) {
    return this.armorVariantsService.create(createArmorVariantDto);
  }

  @Get()
  findAll() {
    return this.armorVariantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.armorVariantsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateArmorVariantSchema))
    updateArmorVariantDto: UpdateArmorVariantDto,
  ) {
    return this.armorVariantsService.update(id, updateArmorVariantDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.armorVariantsService.remove(id);
  }
}
