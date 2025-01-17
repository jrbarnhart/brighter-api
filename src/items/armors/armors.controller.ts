
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
import { ArmorsService } from './armors.service';
import { CreateArmorDto, createArmorSchema } from './dto/create-armor.dto';
import { UpdateArmorDto, updateArmorSchema } from './dto/update-armor.dto';

@Controller('armors')
export class ArmorsController {
  constructor(private readonly armorsService: ArmorsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createArmorSchema))
  create(@Body() createArmorDto: CreateArmorDto) {
    return this.armorsService.create(createArmorDto);
  }

  @Get()
  findAll() {
    return this.armorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.armorsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateArmorSchema)) updateArmorDto: UpdateArmorDto,
  ) {
    return this.armorsService.update(id, updateArmorDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.armorsService.remove(id);
  }
}