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
import { ArmorVariantsService } from './armorVariants.service';
import { CreateArmorVariantDto } from './dto/create-armorVariant.dto';
import { UpdateArmorVariantDto } from './dto/update-armorVariant.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('items/armor/variants')
export class ArmorVariantsController {
  constructor(private readonly armorVariantsService: ArmorVariantsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Create armorVariant',
    description: 'This creates a new armorVariant record',
  })
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'ArmorVariant created' })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  create(@Body() createArmorVariantDto: CreateArmorVariantDto) {
    return this.armorVariantsService.create(createArmorVariantDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all armorVariant',
    description: 'This gets all armorVariant records',
  })
  @ApiOkResponse({ description: 'Found all armorVariant records' })
  findAll() {
    return this.armorVariantsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get armorVariant by id',
    description: 'This gets one armorVariant by its id',
  })
  @ApiOkResponse({ description: 'Found armorVariant record' })
  @ApiNotFoundResponse({ description: 'ArmorVariant not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.armorVariantsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Update armorVariant',
    description: 'This updates an armorVariant record by id',
  })
  @ApiBearerAuth()
  @ApiNotFoundResponse({ description: 'ArmorVariant not found' })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateArmorVariantDto: UpdateArmorVariantDto,
  ) {
    return this.armorVariantsService.update(id, updateArmorVariantDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Delete armorVariant',
    description: 'This deletes an armorVariant record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'ArmorVariant was deleted' })
  @ApiNotFoundResponse({ description: 'ArmorVariant not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.armorVariantsService.remove(id);
  }
}
