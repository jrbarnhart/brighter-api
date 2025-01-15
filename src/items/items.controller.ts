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
import { AuthGuard } from 'src/auth/auth.guard';
import { ItemsService } from './items.service';
import { CreateResourceDto } from './dto/resource/create-resource.dto';
import { UpdateResourceDto } from './dto/resource/update-resource.dto';
import { CreateResourceVariantDto } from './dto/resource/create-resource-variant.dto';
import { UpdateResourceVariantDto } from './dto/resource/update-resource-variant.dto';
import { CreateConsumableDto } from './dto/consumable/create-consumable.dto';
import { UpdateConsumableDto } from './dto/consumable/update-consumable.dto';
import { CreateConsumableVariantDto } from './dto/consumable/create-consumable-variant.dto';
import { UpdateConsumableVariantDto } from './dto/consumable/update-consumable-variant.dto';
import { CreateWeaponDto } from './dto/weapon/create-weapon.dto';
import { UpdateWeaponDto } from './dto/weapon/update-weapon.dto';
import { CreateWeaponVariantDto } from './dto/weapon/create-weapon-variant.dto';
import { UpdateWeaponVariantDto } from './dto/weapon/update-weapon-variant.dto';
import { CreateArmorDto } from './dto/armor/create-armor.dto';
import { UpdateArmorDto } from './dto/armor/update-armor.dto';
import { CreateArmorVariantDto } from './dto/armor/create-armor-variant.dto';
import { UpdateArmorVariantDto } from './dto/armor/update-armor-variant.dto';

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
    @Body() updateResourceDto: UpdateResourceVariantDto,
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
  @Post('weapons/variants')
  @UseGuards(AuthGuard)
  createWeaponVariant(@Body() createWeaponVariantDto: CreateWeaponVariantDto) {
    return this.itemsService.createWeaponVariant(createWeaponVariantDto);
  }

  @Get('weapons/variants')
  findAllWeaponVariants() {
    return this.itemsService.findAllWeaponVariants();
  }

  @Get('weapons/variants/:id')
  findOneWeaponVariant(@Param('id') id: string) {
    return this.itemsService.findOneWeaponVariant(+id);
  }

  @Patch('weapons/variants/:id')
  @UseGuards(AuthGuard)
  updateWeaponVariant(
    @Param('id') id: string,
    @Body() updateWeaponVariantDto: UpdateWeaponVariantDto,
  ) {
    return this.itemsService.updateWeaponVariant(+id, updateWeaponVariantDto);
  }

  @Delete('weapons/variants/:id')
  @UseGuards(AuthGuard)
  removeWeaponVariant(@Param('id') id: string) {
    return this.itemsService.removeWeaponVariant(+id);
  }

  // Weapons
  @Post('weapons')
  @UseGuards(AuthGuard)
  createWeapon(@Body() createWeaponDto: CreateWeaponDto) {
    return this.itemsService.createWeapon(createWeaponDto);
  }

  @Get('weapons')
  findAllWeapons() {
    return this.itemsService.findAllWeapons();
  }

  @Get('weapons/:id')
  findOneWeapon(@Param('id') id: string) {
    return this.itemsService.findOneWeapon(+id);
  }

  @Patch('weapons/:id')
  @UseGuards(AuthGuard)
  updateWeapon(
    @Param('id') id: string,
    @Body() updateWeaponDto: UpdateWeaponDto,
  ) {
    return this.itemsService.updateWeapon(+id, updateWeaponDto);
  }

  @Delete('weapons/:id')
  @UseGuards(AuthGuard)
  removeWeapon(@Param('id') id: string) {
    return this.itemsService.removeWeapon(+id);
  }

  // Armor Variants
  @Post('armor/variants')
  @UseGuards(AuthGuard)
  createArmorVariant(@Body() createArmorVariantDto: CreateArmorVariantDto) {
    return this.itemsService.createArmorVariant(createArmorVariantDto);
  }

  @Get('armor/variants')
  findAllArmorVariants() {
    return this.itemsService.findAllArmorVariants();
  }

  @Get('armor/variants/:id')
  findOneArmorVariant(@Param('id') id: string) {
    return this.itemsService.findOneArmorVariant(+id);
  }

  @Patch('armor/variants/:id')
  @UseGuards(AuthGuard)
  updateArmorVariant(
    @Param('id') id: string,
    @Body() updateArmorVariantDto: UpdateArmorVariantDto,
  ) {
    return this.itemsService.updateArmorVariant(+id, updateArmorVariantDto);
  }

  @Delete('armor/variants/:id')
  @UseGuards(AuthGuard)
  removeArmorVariant(@Param('id') id: string) {
    return this.itemsService.removeArmorVariant(+id);
  }

  // Armor
  @Post('armor')
  @UseGuards(AuthGuard)
  createArmor(@Body() createArmorDto: CreateArmorDto) {
    return this.itemsService.createArmor(createArmorDto);
  }

  @Get('armor')
  findAllArmors() {
    return this.itemsService.findAllArmor();
  }

  @Get('armor/:id')
  findOneArmor(@Param('id') id: string) {
    return this.itemsService.findOneArmor(+id);
  }

  @Patch('armor/:id')
  @UseGuards(AuthGuard)
  updateArmor(@Param('id') id: string, @Body() updateArmorDto: UpdateArmorDto) {
    return this.itemsService.updateArmor(+id, updateArmorDto);
  }

  // Misc Items
}
