import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ItemsService } from './items.service';
import {
  CreateResourceDto,
  createResourceSchema,
} from './dto/resource/create-resource.dto';
import {
  UpdateResourceDto,
  updateResourceSchema,
} from './dto/resource/update-resource.dto';
import {
  CreateResourceVariantDto,
  createResourceVariantSchema,
} from './dto/resource/create-resource-variant.dto';
import {
  UpdateResourceVariantDto,
  updateResourceVariantSchema,
} from './dto/resource/update-resource-variant.dto';
import {
  CreateConsumableDto,
  createConsumableSchema,
} from './dto/consumable/create-consumable.dto';
import {
  UpdateConsumableDto,
  updateConsumableSchema,
} from './dto/consumable/update-consumable.dto';
import {
  CreateConsumableVariantDto,
  createConsumableVariantSchema,
} from './dto/consumable/create-consumable-variant.dto';
import {
  UpdateConsumableVariantDto,
  updateConsumableVariantSchema,
} from './dto/consumable/update-consumable-variant.dto';
import {
  CreateWeaponDto,
  createWeaponSchema,
} from './dto/weapon/create-weapon.dto';
import {
  UpdateWeaponDto,
  updateWeaponSchema,
} from './dto/weapon/update-weapon.dto';
import {
  CreateWeaponVariantDto,
  createWeaponVariantSchema,
} from './dto/weapon/create-weapon-variant.dto';
import {
  UpdateWeaponVariantDto,
  updateWeaponVariantSchema,
} from './dto/weapon/update-weapon-variant.dto';
import {
  CreateArmorDto,
  createArmorSchema,
} from './dto/armor/create-armor.dto';
import {
  UpdateArmorDto,
  updateArmorSchema,
} from './dto/armor/update-armor.dto';
import {
  CreateArmorVariantDto,
  createArmorVariantSchema,
} from './dto/armor/create-armor-variant.dto';
import {
  UpdateArmorVariantDto,
  updateArmorVariantSchema,
} from './dto/armor/update-armor-variant.dto';
import {
  CreateMiscItemDto,
  createMiscItemSchema,
} from './dto/miscItem/create-misc-item.dto';
import {
  UpdateMiscItemDto,
  updateMiscItemSchema,
} from './dto/miscItem/update-misc-item.dto';
import { ZodValidationPipe } from 'src/validation/zodValidation.pipe';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  // Resource Variants
  @Post('resources/variants')
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createResourceVariantSchema))
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
  findOneResourceVariant(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.findOneResourceVariant(id);
  }

  @Patch('resources/variants/:id')
  @UseGuards(AuthGuard)
  updateResourceVariant(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateResourceVariantSchema))
    updateResourceDto: UpdateResourceVariantDto,
  ) {
    return this.itemsService.updateResourceVariant(id, updateResourceDto);
  }

  @Delete('resources/variants/:id')
  @UseGuards(AuthGuard)
  removeResourceVariant(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.removeResourceVariant(id);
  }

  // Resources
  @Post('resources')
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createResourceSchema))
  createResource(@Body() createResourceDto: CreateResourceDto) {
    return this.itemsService.createResource(createResourceDto);
  }

  @Get('resources')
  findAllResources() {
    return this.itemsService.findAllResources();
  }

  @Get('resources/:id')
  findOneResource(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.findOneResource(id);
  }

  @Patch('resources/:id')
  @UseGuards(AuthGuard)
  updateResource(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateResourceSchema))
    updateResourceDto: UpdateResourceDto,
  ) {
    return this.itemsService.updateResource(id, updateResourceDto);
  }

  @Delete('resources/:id')
  @UseGuards(AuthGuard)
  removeResource(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.removeResource(id);
  }

  // Consumable Variants
  @Post('consumables/variants')
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createConsumableVariantSchema))
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
  findOneConsumableVariant(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.findOneConsumableVariant(id);
  }

  @Patch('consumables/variants/:id')
  @UseGuards(AuthGuard)
  updateConsumableVariant(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateConsumableVariantSchema))
    updateConsumableVariantDto: UpdateConsumableVariantDto,
  ) {
    return this.itemsService.updateConsumableVariant(
      +id,
      updateConsumableVariantDto,
    );
  }

  @Delete('consumables/variants/:id')
  @UseGuards(AuthGuard)
  removeConsumableVariant(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.removeConsumableVariant(id);
  }

  // Consumables
  @Post('consumables')
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createConsumableSchema))
  createConsumable(@Body() createConsumableDto: CreateConsumableDto) {
    return this.itemsService.createConsumable(createConsumableDto);
  }

  @Get('consumables')
  findAllConsumables() {
    return this.itemsService.findAllConsumables();
  }

  @Get('consumables/:id')
  findOneConsumable(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.findOneConsumable(id);
  }

  @Patch('consumables/:id')
  @UseGuards(AuthGuard)
  updateConsumable(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateConsumableSchema))
    updateConsumableDto: UpdateConsumableDto,
  ) {
    return this.itemsService.updateConsumable(id, updateConsumableDto);
  }

  @Delete('consumables/:id')
  @UseGuards(AuthGuard)
  removeConsumable(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.removeConsumable(id);
  }

  // Weapon Variants
  @Post('weapons/variants')
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createWeaponVariantSchema))
  createWeaponVariant(@Body() createWeaponVariantDto: CreateWeaponVariantDto) {
    return this.itemsService.createWeaponVariant(createWeaponVariantDto);
  }

  @Get('weapons/variants')
  findAllWeaponVariants() {
    return this.itemsService.findAllWeaponVariants();
  }

  @Get('weapons/variants/:id')
  findOneWeaponVariant(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.findOneWeaponVariant(id);
  }

  @Patch('weapons/variants/:id')
  @UseGuards(AuthGuard)
  updateWeaponVariant(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateWeaponVariantSchema))
    updateWeaponVariantDto: UpdateWeaponVariantDto,
  ) {
    return this.itemsService.updateWeaponVariant(id, updateWeaponVariantDto);
  }

  @Delete('weapons/variants/:id')
  @UseGuards(AuthGuard)
  removeWeaponVariant(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.removeWeaponVariant(id);
  }

  // Weapons
  @Post('weapons')
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createWeaponSchema))
  createWeapon(@Body() createWeaponDto: CreateWeaponDto) {
    return this.itemsService.createWeapon(createWeaponDto);
  }

  @Get('weapons')
  findAllWeapons() {
    return this.itemsService.findAllWeapons();
  }

  @Get('weapons/:id')
  findOneWeapon(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.findOneWeapon(id);
  }

  @Patch('weapons/:id')
  @UseGuards(AuthGuard)
  updateWeapon(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateWeaponSchema))
    updateWeaponDto: UpdateWeaponDto,
  ) {
    return this.itemsService.updateWeapon(id, updateWeaponDto);
  }

  @Delete('weapons/:id')
  @UseGuards(AuthGuard)
  removeWeapon(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.removeWeapon(id);
  }

  // Armor Variants
  @Post('armor/variants')
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createArmorVariantSchema))
  createArmorVariant(@Body() createArmorVariantDto: CreateArmorVariantDto) {
    return this.itemsService.createArmorVariant(createArmorVariantDto);
  }

  @Get('armor/variants')
  findAllArmorVariants() {
    return this.itemsService.findAllArmorVariants();
  }

  @Get('armor/variants/:id')
  findOneArmorVariant(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.findOneArmorVariant(id);
  }

  @Patch('armor/variants/:id')
  @UseGuards(AuthGuard)
  updateArmorVariant(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateArmorVariantSchema))
    updateArmorVariantDto: UpdateArmorVariantDto,
  ) {
    return this.itemsService.updateArmorVariant(id, updateArmorVariantDto);
  }

  @Delete('armor/variants/:id')
  @UseGuards(AuthGuard)
  removeArmorVariant(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.removeArmorVariant(id);
  }

  // Armor
  @Post('armor')
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createArmorSchema))
  createArmor(@Body() createArmorDto: CreateArmorDto) {
    return this.itemsService.createArmor(createArmorDto);
  }

  @Get('armor')
  findAllArmors() {
    return this.itemsService.findAllArmor();
  }

  @Get('armor/:id')
  findOneArmor(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.findOneArmor(id);
  }

  @Patch('armor/:id')
  @UseGuards(AuthGuard)
  updateArmor(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateArmorSchema))
    updateArmorDto: UpdateArmorDto,
  ) {
    return this.itemsService.updateArmor(id, updateArmorDto);
  }

  @Delete('armor/:id')
  @UseGuards(AuthGuard)
  removeArmor(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.removeArmor(id);
  }

  // Misc Items
  @Post('misc')
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createMiscItemSchema))
  createMiscItem(@Body() createMiscItemDto: CreateMiscItemDto) {
    return this.itemsService.createMiscItem(createMiscItemDto);
  }

  @Get('misc')
  findAllMiscItems() {
    return this.itemsService.findAllMiscItem();
  }

  @Get('misc/:id')
  findOneMiscItem(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.findOneMiscItem(id);
  }

  @Patch('misc/:id')
  @UseGuards(AuthGuard)
  updateMiscItem(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateMiscItemSchema))
    updateMiscItemDto: UpdateMiscItemDto,
  ) {
    return this.itemsService.updateMiscItem(id, updateMiscItemDto);
  }

  @Delete('misc/:id')
  @UseGuards(AuthGuard)
  removeMiscItem(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.removeMiscItem(id);
  }
}
