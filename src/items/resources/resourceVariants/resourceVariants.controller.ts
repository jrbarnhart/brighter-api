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
import { ResourceVariantsService } from './resourceVariants.service';
import { CreateResourceVariantDto } from './dto/create-resourceVariant.dto';
import { UpdateResourceVariantDto } from './dto/update-resourceVariant.dto';
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
  ResourceVariantEntity,
  ResourceVariantBaseEntity,
} from './entities/resourceVariants.entity';

@Controller('items/resources/variants')
export class ResourceVariantsController {
  constructor(
    private readonly resourceVariantsService: ResourceVariantsService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Create resourceVariant',
    description: 'This creates a new resourceVariant record',
  })
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'ResourceVariant created',
    type: ResourceVariantBaseEntity,
  })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  create(@Body() createResourceVariantDto: CreateResourceVariantDto) {
    return this.resourceVariantsService.create(createResourceVariantDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all resourceVariant',
    description: 'This gets all resourceVariant records',
  })
  @ApiOkResponse({
    description: 'Found all resourceVariant records',
    type: ResourceVariantEntity,
  })
  findAll() {
    return this.resourceVariantsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get resourceVariant by id',
    description: 'This gets one resourceVariant by its id',
  })
  @ApiOkResponse({
    description: 'Found resourceVariant record',
    type: ResourceVariantEntity,
  })
  @ApiNotFoundResponse({ description: 'ResourceVariant not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.resourceVariantsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Update resourceVariant',
    description: 'This updates an resourceVariant record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Updated resourceVariant record',
    type: ResourceVariantBaseEntity,
  })
  @ApiNotFoundResponse({ description: 'ResourceVariant not found' })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateResourceVariantDto: UpdateResourceVariantDto,
  ) {
    return this.resourceVariantsService.update(id, updateResourceVariantDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Delete resourceVariant',
    description: 'This deletes an resourceVariant record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'ResourceVariant was deleted',
    type: ResourceVariantBaseEntity,
  })
  @ApiNotFoundResponse({ description: 'ResourceVariant not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.resourceVariantsService.remove(id);
  }
}
