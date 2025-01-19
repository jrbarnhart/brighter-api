
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
import { DropTablesService } from './dropTables.service';
import { CreateDropTableDto, createDropTableSchema } from './dto/create-dropTable.dto';
import { UpdateDropTableDto, updateDropTableSchema } from './dto/update-dropTable.dto';

@Controller('dropTables')
export class DropTablesController {
  constructor(private readonly dropTablesService: DropTablesService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createDropTableSchema))
  create(@Body() createDropTableDto: CreateDropTableDto) {
    return this.dropTablesService.create(createDropTableDto);
  }

  @Get()
  findAll() {
    return this.dropTablesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.dropTablesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateDropTableSchema)) updateDropTableDto: UpdateDropTableDto,
  ) {
    return this.dropTablesService.update(id, updateDropTableDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.dropTablesService.remove(id);
  }
}