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
import { VendorsService } from './vendors.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { VendorEntity, VendorBaseEntity } from './entities/vendors.entity';

@Controller('npcs/vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Create vendor',
    description: 'This creates a new vendor record',
  })
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Vendor created', type: VendorBaseEntity })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  create(@Body() createVendorDto: CreateVendorDto) {
    return this.vendorsService.create(createVendorDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all vendor',
    description: 'This gets all vendor records',
  })
  @ApiOkResponse({
    isArray: true,
    description: 'Found all vendor records',
    type: VendorEntity,
  })
  findAll() {
    return this.vendorsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get vendor by id',
    description: 'This gets one vendor by its id',
  })
  @ApiOkResponse({ description: 'Found vendor record', type: VendorEntity })
  @ApiNotFoundResponse({ description: 'Vendor not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.vendorsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Update vendor',
    description: 'This updates an vendor record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Updated vendor record',
    type: VendorBaseEntity,
  })
  @ApiNotFoundResponse({ description: 'Vendor not found' })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateVendorDto: UpdateVendorDto,
  ) {
    return this.vendorsService.update(id, updateVendorDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Delete vendor',
    description: 'This deletes an vendor record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Vendor was deleted', type: VendorBaseEntity })
  @ApiNotFoundResponse({ description: 'Vendor not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.vendorsService.remove(id);
  }
}
