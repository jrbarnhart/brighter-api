import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  // Resources
  @Post('resources')
  @UseGuards(AuthGuard)
  create(@Body() createItemDto: CreateResourceDto) {
    return this.itemsService.createResource(createItemDto);
  }

  @Get('resources')
  findAll() {
    return this.itemsService.findAllResources();
  }

  @Get('resources/:id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOneResource(+id);
  }

  @Patch('resources/:id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateResourceDto: UpdateResourceDto,
  ) {
    return this.itemsService.updateResource(+id, updateResourceDto);
  }

  @Delete('resources/:id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.itemsService.removeResource(+id);
  }

  // Consumables

  // Weapons

  // Armor

  // Misc Items
}
