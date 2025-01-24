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
import { CraftingRecipesService } from './craftingRecipes.service';
import { CreateCraftingRecipeDto } from './dto/create-craftingRecipe.dto';
import { UpdateCraftingRecipeDto } from './dto/update-craftingRecipe.dto';
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
  CraftingRecipeEntity,
  CraftingRecipeBaseEntity,
} from './entities/craftingRecipes.entity';

@Controller('skills/crafting/recipes')
export class CraftingRecipesController {
  constructor(
    private readonly craftingRecipesService: CraftingRecipesService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Create craftingRecipe',
    description: 'This creates a new craftingRecipe record',
  })
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'CraftingRecipe created',
    type: CraftingRecipeBaseEntity,
  })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  create(@Body() createCraftingRecipeDto: CreateCraftingRecipeDto) {
    return this.craftingRecipesService.create(createCraftingRecipeDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all craftingRecipe',
    description: 'This gets all craftingRecipe records',
  })
  @ApiOkResponse({
    description: 'Found all craftingRecipe records',
    type: CraftingRecipeEntity,
  })
  findAll() {
    return this.craftingRecipesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get craftingRecipe by id',
    description: 'This gets one craftingRecipe by its id',
  })
  @ApiOkResponse({
    description: 'Found craftingRecipe record',
    type: CraftingRecipeEntity,
  })
  @ApiNotFoundResponse({ description: 'CraftingRecipe not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.craftingRecipesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Update craftingRecipe',
    description: 'This updates an craftingRecipe record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Updated craftingRecipe record',
    type: CraftingRecipeBaseEntity,
  })
  @ApiNotFoundResponse({ description: 'CraftingRecipe not found' })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateCraftingRecipeDto: UpdateCraftingRecipeDto,
  ) {
    return this.craftingRecipesService.update(id, updateCraftingRecipeDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Delete craftingRecipe',
    description: 'This deletes an craftingRecipe record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'CraftingRecipe was deleted',
    type: CraftingRecipeBaseEntity,
  })
  @ApiNotFoundResponse({ description: 'CraftingRecipe not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.craftingRecipesService.remove(id);
  }
}
