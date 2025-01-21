import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { DropTablesService } from './dropTables.service';
import { CreateDropTableDto } from './dto/create-dropTable.dto';
import { UpdateDropTableDto } from './dto/update-dropTable.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('monsters/tables')
export class DropTablesController {
  constructor(private readonly dropTablesService: DropTablesService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Create dropTable',
    description: 'This creates a new dropTable record',
  })
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'DropTable created' })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  create(@Body() createDropTableDto: CreateDropTableDto) {
    return this.dropTablesService.create(createDropTableDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all dropTable',
    description: 'This gets all dropTable records',
  })
  @ApiOkResponse({ description: 'Found all dropTable records' })
  findAll() {
    return this.dropTablesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get dropTable by id',
    description: 'This gets one dropTable by its id',
  })
  @ApiOkResponse({ description: 'Found dropTable record' })
  @ApiNotFoundResponse({ description: 'DropTable not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.dropTablesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Update dropTable',
    description: 'This updates an dropTable record by id',
  })
  @ApiBearerAuth()
  @ApiNotFoundResponse({ description: 'DropTable not found' })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateDropTableDto: UpdateDropTableDto,
  ) {
    return this.dropTablesService.update(id, updateDropTableDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Delete dropTable',
    description: 'This deletes an dropTable record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'DropTable was deleted' })
  @ApiNotFoundResponse({ description: 'DropTable not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.dropTablesService.remove(id);
  }
}
