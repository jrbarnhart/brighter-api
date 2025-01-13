import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.find();

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const { password, ...result } = user;
  }
}
