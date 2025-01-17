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
import { WeaponVariantsService } from './weaponVariants.service';
import {
  CreateWeaponVariantDto,
  createWeaponVariantSchema,
} from './dto/create-weaponVariant.dto';
import {
  UpdateWeaponVariantDto,
  updateWeaponVariantSchema,
} from './dto/update-weaponVariant.dto';

@Controller('items/weapons/variants')
export class WeaponVariantsController {
  constructor(private readonly weaponVariantsService: WeaponVariantsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createWeaponVariantSchema))
  create(@Body() createWeaponVariantDto: CreateWeaponVariantDto) {
    return this.weaponVariantsService.create(createWeaponVariantDto);
  }

  @Get()
  findAll() {
    return this.weaponVariantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.weaponVariantsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateWeaponVariantSchema))
    updateWeaponVariantDto: UpdateWeaponVariantDto,
  ) {
    return this.weaponVariantsService.update(id, updateWeaponVariantDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.weaponVariantsService.remove(id);
  }
}
