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
import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
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
  ResourceEntity,
  ResourceBaseEntity,
} from './entities/resources.entity';

@Controller('items/resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Create resource',
    description: 'This creates a new resource record',
  })
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Resource created',
    type: ResourceBaseEntity,
  })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  create(@Body() createResourceDto: CreateResourceDto) {
    return this.resourcesService.create(createResourceDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all resource',
    description: 'This gets all resource records',
  })
  @ApiOkResponse({
    description: 'Found all resource records',
    type: ResourceEntity,
  })
  findAll() {
    return this.resourcesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get resource by id',
    description: 'This gets one resource by its id',
  })
  @ApiOkResponse({ description: 'Found resource record', type: ResourceEntity })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.resourcesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Update resource',
    description: 'This updates an resource record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Updated resource record',
    type: ResourceBaseEntity,
  })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateResourceDto: UpdateResourceDto,
  ) {
    return this.resourcesService.update(id, updateResourceDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Delete resource',
    description: 'This deletes an resource record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Resource was deleted',
    type: ResourceBaseEntity,
  })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.resourcesService.remove(id);
  }
}
