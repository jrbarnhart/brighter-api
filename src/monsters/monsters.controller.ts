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
import { MonstersService } from './monsters.service';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { UpdateMonsterDto } from './dto/update-monster.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('items/monsters')
export class MonstersController {
  constructor(private readonly monstersService: MonstersService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Create monster',
    description: 'This creates a new monster record',
  })
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Monster created' })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  create(@Body() createMonsterDto: CreateMonsterDto) {
    return this.monstersService.create(createMonsterDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all monster',
    description: 'This gets all monster records',
  })
  @ApiOkResponse({ description: 'Found all monster records' })
  findAll() {
    return this.monstersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get monster by id',
    description: 'This gets one monster by its id',
  })
  @ApiOkResponse({ description: 'Found monster record' })
  @ApiNotFoundResponse({ description: 'Monster not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.monstersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Update monster',
    description: 'This updates an monster record by id',
  })
  @ApiBearerAuth()
  @ApiNotFoundResponse({ description: 'Monster not found' })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateMonsterDto: UpdateMonsterDto,
  ) {
    return this.monstersService.update(id, updateMonsterDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Delete monster',
    description: 'This deletes an monster record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Monster was deleted' })
  @ApiNotFoundResponse({ description: 'Monster not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.monstersService.remove(id);
  }
}
