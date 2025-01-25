import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtEntity } from './entities/jwt.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOkResponse({ description: 'Valid login credentials', type: JwtEntity })
  @ApiUnauthorizedResponse({ description: 'Invalid login credentials' })
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}
