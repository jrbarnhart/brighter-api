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
import { ZodValidationPipe } from 'src/validation/zodValidation.pipe';
import { CraftingSkillsService } from './craftingSkills.service';
import {
  CreateCraftingSkillDto,
  createCraftingSkillSchema,
} from './dto/create-craftingSkill.dto';
import {
  UpdateCraftingSkillDto,
  updateCraftingSkillSchema,
} from './dto/update-craftingSkill.dto';

@Controller('skills/crafting')
export class CraftingSkillsController {
  constructor(private readonly craftingSkillsService: CraftingSkillsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createCraftingSkillSchema))
  create(@Body() createCraftingSkillDto: CreateCraftingSkillDto) {
    return this.craftingSkillsService.create(createCraftingSkillDto);
  }

  @Get()
  findAll() {
    return this.craftingSkillsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.craftingSkillsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateCraftingSkillSchema))
    updateCraftingSkillDto: UpdateCraftingSkillDto,
  ) {
    return this.craftingSkillsService.update(id, updateCraftingSkillDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.craftingSkillsService.remove(id);
  }
}
