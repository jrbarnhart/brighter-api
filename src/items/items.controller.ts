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
import { CreateResourceDto } from './dto/resource/create-resource.dto';
import { UpdateResourceDto } from './dto/resource/update-resource.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateResourceVariantDto } from './dto/resource/create-resource-variant.dto';
import { CreateConsumableVariantDto } from './dto/consumable/create-consumable-variant.dto';
import { UpdateConsumableDto } from './dto/consumable/update-consumable.dto';
import { CreateConsumableDto } from './dto/consumable/create-consumable.dto';
import { UpdateConsumableVariantDto } from './dto/consumable/update-consumable-variant.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  // Resource Variants
  @Post('resources/variants')
  @UseGuards(AuthGuard)
  createResourceVariant(
    @Body() createResourceVariantDto: CreateResourceVariantDto,
  ) {
    return this.itemsService.createResourceVariant(createResourceVariantDto);
  }

  @Get('resources/variants')
  findAllResourceVariants() {
    return this.itemsService.findAllResourceVariants();
  }

  @Get('resources/variants/:id')
  findOneResourceVariant(@Param('id') id: string) {
    return this.itemsService.findOneResourceVariant(+id);
  }

  @Patch('resources/variants/:id')
  @UseGuards(AuthGuard)
  updateResourceVariant(
    @Param('id') id: string,
    @Body() updateResourceDto: UpdateResourceDto,
  ) {
    return this.itemsService.updateResourceVariant(+id, updateResourceDto);
  }

  @Delete('resources/variants/:id')
  @UseGuards(AuthGuard)
  removeResourceVariant(@Param('id') id: string) {
    return this.itemsService.removeResourceVariant(+id);
  }

  // Resources
  @Post('resources')
  @UseGuards(AuthGuard)
  createResource(@Body() createResourceDto: CreateResourceDto) {
    return this.itemsService.createResource(createResourceDto);
  }

  @Get('resources')
  findAllResources() {
    return this.itemsService.findAllResources();
  }

  @Get('resources/:id')
  findOneResource(@Param('id') id: string) {
    return this.itemsService.findOneResource(+id);
  }

  @Patch('resources/:id')
  @UseGuards(AuthGuard)
  updateResource(
    @Param('id') id: string,
    @Body() updateResourceDto: UpdateResourceDto,
  ) {
    return this.itemsService.updateResource(+id, updateResourceDto);
  }

  @Delete('resources/:id')
  @UseGuards(AuthGuard)
  removeResource(@Param('id') id: string) {
    return this.itemsService.removeResource(+id);
  }

  // Consumable Variants
  @Post('consumables/variants')
  @UseGuards(AuthGuard)
  createConsumableVariant(
    @Body() createConsumableVariantDto: CreateConsumableVariantDto,
  ) {
    return this.itemsService.createConsumableVariant(
      createConsumableVariantDto,
    );
  }

  @Get('consumables/variants')
  findAllConsumableVariants() {
    return this.itemsService.findAllConsumableVariants();
  }

  @Get('consumables/variants/:id')
  findOneConsumableVariant(@Param('id') id: string) {
    return this.itemsService.findOneConsumableVariant(+id);
  }

  @Patch('consumables/variants/:id')
  @UseGuards(AuthGuard)
  updateConsumableVariant(
    @Param('id') id: string,
    @Body() updateConsumableVariantDto: UpdateConsumableVariantDto,
  ) {
    return this.itemsService.updateConsumableVariant(
      +id,
      updateConsumableVariantDto,
    );
  }

  @Delete('consumables/variants/:id')
  @UseGuards(AuthGuard)
  removeConsumableVariant(@Param('id') id: string) {
    return this.itemsService.removeConsumableVariant(+id);
  }

  // Consumables
  @Post('consumables')
  @UseGuards(AuthGuard)
  createConsumable(@Body() createConsumableDto: CreateConsumableDto) {
    return this.itemsService.createConsumable(createConsumableDto);
  }

  @Get('consumables')
  findAllConsumables() {
    return this.itemsService.findAllConsumables();
  }

  @Get('consumables/:id')
  findOneConsumable(@Param('id') id: string) {
    return this.itemsService.findOneConsumable(+id);
  }

  @Patch('consumables/:id')
  @UseGuards(AuthGuard)
  updateConsumable(
    @Param('id') id: string,
    @Body() updateConsumableDto: UpdateConsumableDto,
  ) {
    return this.itemsService.updateConsumable(+id, updateConsumableDto);
  }

  @Delete('consumables/:id')
  @UseGuards(AuthGuard)
  removeConsumable(@Param('id') id: string) {
    return this.itemsService.removeConsumable(+id);
  }

  // Weapon Variants

  // Weapons

  // Armor Variants

  // Armor

  // Misc Items
}
