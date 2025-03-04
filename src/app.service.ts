import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  root() {
    const prod = process.env.NODE_ENV === 'production';
    return { prod };
  }
}
