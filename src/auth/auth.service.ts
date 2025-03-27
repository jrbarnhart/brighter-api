import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    passwordHash: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.find();

    if (user.username !== username || !user.passwordHash) {
      throw new UnauthorizedException();
    }

    const match = await bcrypt.compare(passwordHash, user.passwordHash);
    if (!match) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
