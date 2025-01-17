
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
import { MiscItemsService } from './miscItems.service';
import { CreateMiscItemDto, createMiscItemSchema } from './dto/create-miscItem.dto';
import { UpdateMiscItemDto, updateMiscItemSchema } from './dto/update-miscItem.dto';

@Controller('miscItems')
export class MiscItemsController {
  constructor(private readonly miscItemsService: MiscItemsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createMiscItemSchema))
  create(@Body() createMiscItemDto: CreateMiscItemDto) {
    return this.miscItemsService.create(createMiscItemDto);
  }

  @Get()
  findAll() {
    return this.miscItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.miscItemsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateMiscItemSchema)) updateMiscItemDto: UpdateMiscItemDto,
  ) {
    return this.miscItemsService.update(id, updateMiscItemDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.miscItemsService.remove(id);
  }
}