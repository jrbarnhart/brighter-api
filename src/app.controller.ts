import { Get, Controller, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @ApiExcludeEndpoint(true)
  @Get()
  @Render('index')
  root() {
    return this.appService.root();
  }
}
