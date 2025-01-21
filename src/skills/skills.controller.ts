import { Controller, Get } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { ApiBadRequestResponse, ApiOperation } from '@nestjs/swagger';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  @ApiOperation({
    summary: 'Invalid access',
    description: 'This warns users and shows an example valid skills query',
  })
  @ApiBadRequestResponse({
    description: 'Cannot directly query skills warning',
  })
  find() {
    this.skillsService.find();
  }
}
