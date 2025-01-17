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
import { ConsumablesService } from './consumables.service';
import {
  CreateConsumableDto,
  createConsumableSchema,
} from './dto/create-consumable.dto';
import {
  UpdateConsumableDto,
  updateConsumableSchema,
} from './dto/update-consumable.dto';

@Controller('consumables')
export class ConsumablesController {
  constructor(private readonly consumablesService: ConsumablesService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createConsumableSchema))
  create(@Body() createConsumableDto: CreateConsumableDto) {
    return this.consumablesService.create(createConsumableDto);
  }

  @Get()
  findAll() {
    return this.consumablesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.consumablesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateConsumableSchema))
    updateConsumableDto: UpdateConsumableDto,
  ) {
    return this.consumablesService.update(id, updateConsumableDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.consumablesService.remove(id);
  }
}
