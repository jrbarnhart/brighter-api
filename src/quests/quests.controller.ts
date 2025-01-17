
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
import { QuestsService } from './quests.service';
import { CreateQuestDto, createQuestSchema } from './dto/create-quest.dto';
import { UpdateQuestDto, updateQuestSchema } from './dto/update-quest.dto';

@Controller('quests')
export class QuestsController {
  constructor(private readonly questsService: QuestsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createQuestSchema))
  create(@Body() createQuestDto: CreateQuestDto) {
    return this.questsService.create(createQuestDto);
  }

  @Get()
  findAll() {
    return this.questsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.questsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateQuestSchema)) updateQuestDto: UpdateQuestDto,
  ) {
    return this.questsService.update(id, updateQuestDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.questsService.remove(id);
  }
}