import { Controller, Get } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ApiBadRequestResponse, ApiOperation } from '@nestjs/swagger';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  @ApiOperation({
    summary: 'Invalid access',
    description: 'This warns users and shows an example valid items query',
  })
  @ApiBadRequestResponse({ description: 'Cannot directly query items warning' })
  find() {
    this.itemsService.find();
  }
}
