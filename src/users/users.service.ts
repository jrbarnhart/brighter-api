import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly onlyUser = {
    id: process.env.ADMIN_ID,
    username: process.env.ADMIN_USERNAME,
    passwordHash: process.env.ADMIN_PASSWORD_HASH,
  };

  find() {
    return this.onlyUser;
  }
}
