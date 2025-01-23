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
import { ConsumableVariantsService } from './consumableVariants.service';
import { CreateConsumableVariantDto } from './dto/create-consumableVariant.dto';
import { UpdateConsumableVariantDto } from './dto/update-consumableVariant.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ConsumableVariantEntity } from './entities/consumableVariants.entity';

@Controller('consumableVariants')
export class ConsumableVariantsController {
  constructor(
    private readonly consumableVariantsService: ConsumableVariantsService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Create consumableVariant',
    description: 'This creates a new consumableVariant record',
  })
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'ConsumableVariant created',
    type: ConsumableVariantEntity,
  })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  create(@Body() createConsumableVariantDto: CreateConsumableVariantDto) {
    return this.consumableVariantsService.create(createConsumableVariantDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all consumableVariant',
    description: 'This gets all consumableVariant records',
  })
  @ApiOkResponse({
    description: 'Found all consumableVariant records',
    type: ConsumableVariantEntity,
  })
  findAll() {
    return this.consumableVariantsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get consumableVariant by id',
    description: 'This gets one consumableVariant by its id',
  })
  @ApiOkResponse({
    description: 'Found consumableVariant record',
    type: ConsumableVariantEntity,
  })
  @ApiNotFoundResponse({ description: 'ConsumableVariant not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.consumableVariantsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Update consumableVariant',
    description: 'This updates an consumableVariant record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Updated consumableVariant record',
    type: ConsumableVariantEntity,
  })
  @ApiNotFoundResponse({ description: 'ConsumableVariant not found' })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateConsumableVariantDto: UpdateConsumableVariantDto,
  ) {
    return this.consumableVariantsService.update(
      id,
      updateConsumableVariantDto,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Delete consumableVariant',
    description: 'This deletes an consumableVariant record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'ConsumableVariant was deleted',
    type: ConsumableVariantEntity,
  })
  @ApiNotFoundResponse({ description: 'ConsumableVariant not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.consumableVariantsService.remove(id);
  }
}
