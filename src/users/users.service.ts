import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly onlyUser = {
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
    id: 42069101,
  };

  find() {
    return this.onlyUser;
  }
}
