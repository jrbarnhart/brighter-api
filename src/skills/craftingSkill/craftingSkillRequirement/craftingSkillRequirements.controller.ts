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
import { CraftingSkillRequirementsService } from './craftingSkillRequirements.service';
import {
  CreateCraftingSkillRequirementDto,
  createCraftingSkillRequirementSchema,
} from './dto/create-craftingSkillRequirement.dto';
import {
  UpdateCraftingSkillRequirementDto,
  updateCraftingSkillRequirementSchema,
} from './dto/update-craftingSkillRequirement.dto';

@Controller('/skills/crafting/requirements')
export class CraftingSkillRequirementsController {
  constructor(
    private readonly craftingSkillRequirementsService: CraftingSkillRequirementsService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createCraftingSkillRequirementSchema))
  create(
    @Body()
    createCraftingSkillRequirementDto: CreateCraftingSkillRequirementDto,
  ) {
    return this.craftingSkillRequirementsService.create(
      createCraftingSkillRequirementDto,
    );
  }

  @Get()
  findAll() {
    return this.craftingSkillRequirementsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.craftingSkillRequirementsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateCraftingSkillRequirementSchema))
    updateCraftingSkillRequirementDto: UpdateCraftingSkillRequirementDto,
  ) {
    return this.craftingSkillRequirementsService.update(
      id,
      updateCraftingSkillRequirementDto,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.craftingSkillRequirementsService.remove(id);
  }
}
