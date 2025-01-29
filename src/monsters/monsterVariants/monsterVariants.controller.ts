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
import { MonsterVariantsService } from './monsterVariants.service';
import { CreateMonsterVariantDto } from './dto/create-monsterVariant.dto';
import { UpdateMonsterVariantDto } from './dto/update-monsterVariant.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  MonsterVariantEntity,
  MonsterVariantBaseEntity,
} from './entities/monsterVariants.entity';

@Controller('monsters/variants')
export class MonsterVariantsController {
  constructor(
    private readonly monsterVariantsService: MonsterVariantsService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Create monsterVariant',
    description: 'This creates a new monsterVariant record',
  })
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'MonsterVariant created',
    type: MonsterVariantBaseEntity,
  })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  create(@Body() createMonsterVariantDto: CreateMonsterVariantDto) {
    return this.monsterVariantsService.create(createMonsterVariantDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all monsterVariant',
    description: 'This gets all monsterVariant records',
  })
  @ApiOkResponse({
    isArray: true,
    description: 'Found all monsterVariant records',
    type: MonsterVariantEntity,
  })
  findAll() {
    return this.monsterVariantsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get monsterVariant by id',
    description: 'This gets one monsterVariant by its id',
  })
  @ApiOkResponse({
    description: 'Found monsterVariant record',
    type: MonsterVariantEntity,
  })
  @ApiNotFoundResponse({ description: 'MonsterVariant not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.monsterVariantsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Update monsterVariant',
    description: 'This updates an monsterVariant record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Updated monsterVariant record',
    type: MonsterVariantBaseEntity,
  })
  @ApiNotFoundResponse({ description: 'MonsterVariant not found' })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateMonsterVariantDto: UpdateMonsterVariantDto,
  ) {
    return this.monsterVariantsService.update(id, updateMonsterVariantDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Delete monsterVariant',
    description: 'This deletes an monsterVariant record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'MonsterVariant was deleted',
    type: MonsterVariantBaseEntity,
  })
  @ApiNotFoundResponse({ description: 'MonsterVariant not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.monsterVariantsService.remove(id);
  }
}
