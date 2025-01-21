export const controllerTemplate = `
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
import { __PASCAL_PLURAL__Service } from './__CAMEL_PLURAL__.service';
import { Create__PASCAL__Dto } from './dto/create-__CAMEL__.dto';
import { Update__PASCAL__Dto } from './dto/update-__CAMEL__.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('__CAMEL_PLURAL__')
export class __PASCAL_PLURAL__Controller {
  constructor(private readonly __CAMEL_PLURAL__Service: __PASCAL_PLURAL__Service) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Create __CAMEL__',
    description: 'This creates a new __CAMEL__ record',
  })
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: '__PASCAL__ created' })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  create(@Body() create__PASCAL__Dto: Create__PASCAL__Dto) {
    return this.__CAMEL_PLURAL__Service.create(create__PASCAL__Dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all __CAMEL__',
    description: 'This gets all __CAMEL__ records',
  })
  @ApiOkResponse({ description: 'Found all __CAMEL__ records' })
  findAll() {
    return this.__CAMEL_PLURAL__Service.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get __CAMEL__ by id',
    description: 'This gets one __CAMEL__ by its id',
  })
  @ApiOkResponse({ description: 'Found __CAMEL__ record' })
  @ApiNotFoundResponse({ description: '__PASCAL__ not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.__CAMEL_PLURAL__Service.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Update __CAMEL__',
    description: 'This updates an __CAMEL__ record by id',
  })
  @ApiBearerAuth()
  @ApiNotFoundResponse({ description: '__PASCAL__ not found' })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    update__PASCAL__Dto: Update__PASCAL__Dto,
  ) {
    return this.__CAMEL_PLURAL__Service.update(id, update__PASCAL__Dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Delete __CAMEL__',
    description: 'This deletes an __CAMEL__ record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: '__PASCAL__ was deleted' })
  @ApiNotFoundResponse({ description: '__PASCAL__ not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.__CAMEL_PLURAL__Service.remove(id);
  }
}

`;
