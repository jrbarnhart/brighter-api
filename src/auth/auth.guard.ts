import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly logger: Logger,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get request and extract token from it
    const req = context.switchToHttp().getRequest();
    const { method, url, ip, headers, body } = req;
    const token = this.extractTokenFromHeader(req);

    // Exception on no token
    if (!token) {
      this.logger.log('Unauthorized request - no token', {
        method,
        url,
        ip,
        headers: {
          'user-agent': headers['user-agent'],
          referer: headers.referer,
        },
        body: body && Object.keys(body).length ? body : undefined,
      });
      throw new UnauthorizedException();
    }

    // Verify token with jwtService
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      });
      req['user'] = payload;
    } catch {
      this.logger.log('Unauthorized request', {
        method,
        url,
        ip,
        headers: {
          'user-agent': headers['user-agent'],
          referer: headers.referer,
        },
        body: body && Object.keys(body).length ? body : undefined,
      });
      throw new UnauthorizedException();
    }
    // If no exceptions then the user is authorized
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
