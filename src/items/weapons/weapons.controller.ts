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
import { WeaponsService } from './weapons.service';
import { CreateWeaponDto, createWeaponSchema } from './dto/create-weapon.dto';
import { UpdateWeaponDto, updateWeaponSchema } from './dto/update-weapon.dto';

@Controller('weapons')
export class WeaponsController {
  constructor(private readonly weaponsService: WeaponsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createWeaponSchema))
  create(@Body() createWeaponDto: CreateWeaponDto) {
    return this.weaponsService.create(createWeaponDto);
  }

  @Get()
  findAll() {
    return this.weaponsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.weaponsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateWeaponSchema))
    updateWeaponDto: UpdateWeaponDto,
  ) {
    return this.weaponsService.update(id, updateWeaponDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.weaponsService.remove(id);
  }
}
