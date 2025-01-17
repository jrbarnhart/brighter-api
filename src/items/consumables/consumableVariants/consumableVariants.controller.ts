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
import { ConsumableVariantsService } from './consumableVariants.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ZodValidationPipe } from 'src/validation/zodValidation.pipe';
import {
  CreateConsumableVariantDto,
  createConsumableVariantSchema,
} from './dto/create-consumableVariant.dto';
import {
  UpdateConsumableVariantDto,
  updateConsumableVariantSchema,
} from './dto/update-consumableVariant.dto';

@Controller('items/consumables/variants')
export class ConsumableVariantsController {
  constructor(
    private readonly consumableVariantsService: ConsumableVariantsService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createConsumableVariantSchema))
  create(@Body() createConsumableVariantDto: CreateConsumableVariantDto) {
    return this.consumableVariantsService.create(createConsumableVariantDto);
  }

  @Get()
  findAll() {
    return this.consumableVariantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.consumableVariantsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateConsumableVariantSchema))
    updateConsumableVariantDto: UpdateConsumableVariantDto,
  ) {
    return this.consumableVariantsService.update(
      id,
      updateConsumableVariantDto,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.consumableVariantsService.remove(id);
  }
}
