import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly onlyUser = {
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
  };

  return() {
    return this.onlyUser;
  }
}
