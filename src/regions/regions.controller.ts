import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { RegionsService } from './regions.service';
import { ZodValidationPipe } from 'src/validation/zodValidation.pipe';
import { createRegionSchema, CreateRegionDto } from './dto/create-region.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateRegionDto, updateRegionSchema } from './dto/update-region.dto';

@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createRegionSchema))
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionsService.create(createRegionDto);
  }

  @Get()
  findAll() {
    return this.regionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.regionsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateRegionSchema))
    updateRegionDto: UpdateRegionDto,
  ) {
    return this.regionsService.update(id, updateRegionDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.regionsService.remove(id);
  }
}
