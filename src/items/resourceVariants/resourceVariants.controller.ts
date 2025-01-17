import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ResourceVariantsService } from './resourceVariants.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ZodValidationPipe } from 'src/validation/zodValidation.pipe';
import {
  CreateResourceVariantDto,
  createResourceVariantSchema,
} from './dto/create-resourceVariant.dto';
import {
  UpdateResourceVariantDto,
  updateResourceVariantSchema,
} from './dto/update-resourceVariant.dto';

@Controller('items/resources/variants')
export class ResourceVariantsController {
  constructor(
    private readonly resourceVariantsService: ResourceVariantsService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createResourceVariantSchema))
  create(@Body() createResourceVariantDto: CreateResourceVariantDto) {
    return this.resourceVariantsService.create(createResourceVariantDto);
  }

  @Get()
  findAll() {
    return this.resourceVariantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.resourceVariantsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateResourceVariantSchema))
    updateResourceVariantDto: UpdateResourceVariantDto,
  ) {
    return this.resourceVariantsService.update(id, updateResourceVariantDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.resourceVariantsService.remove(id);
  }
}
