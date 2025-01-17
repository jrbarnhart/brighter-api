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
import { QuestStepsService } from './questSteps.service';
import {
  CreateQuestStepDto,
  createQuestStepSchema,
} from './dto/create-questStep.dto';
import {
  UpdateQuestStepDto,
  updateQuestStepSchema,
} from './dto/update-questStep.dto';

// Maybe change this and controller/service logic later to allow for /quests/:id/steps
@Controller('quests/steps')
export class QuestStepsController {
  constructor(private readonly questStepsService: QuestStepsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createQuestStepSchema))
  create(@Body() createQuestStepDto: CreateQuestStepDto) {
    return this.questStepsService.create(createQuestStepDto);
  }

  @Get()
  findAll() {
    return this.questStepsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.questStepsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateQuestStepSchema))
    updateQuestStepDto: UpdateQuestStepDto,
  ) {
    return this.questStepsService.update(id, updateQuestStepDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.questStepsService.remove(id);
  }
}
