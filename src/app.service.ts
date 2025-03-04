import { Injectable, Render } from '@nestjs/common';

@Injectable()
export class AppService {
  @Render('index')
  root() {
    return { message: 'Hello world!' };
  }
}
