import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { RegionsService } from './regions.service';
import { ZodValidationPipe } from 'src/validation/zodValidation.pipe';
import { createRegionSchema, CretaeRegionDto } from './dto/create-region.dto';

@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createRegionSchema))
  create(@Body() createRegionDto: CretaeRegionDto) {
    return this.regionsService.create(createRegionDto);
  }

  @Get()
  findAll() {
    return this.regionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: unknown) {
    // return this.regionsService.update(data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionsService.remove(+id);
  }
}
