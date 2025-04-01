import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();

    if (request.url === '/health' || request.url === '/logs') {
      return next.handle();
    }

    const { method, url, ip, headers, body } = request;

    const sanitizedBody =
      body && typeof body === 'object' && !Array.isArray(body)
        ? { ...body }
        : {};

    if (sanitizedBody.password) {
      sanitizedBody.password = '[REDACTED]';
    }
    if (sanitizedBody.username) {
      sanitizedBody.username = '[REDACTED]';
    }

    this.logger.log('Incoming request', {
      method,
      url,
      ip,
      headers: {
        'user-agent': headers['user-agent'],
        referer: headers.referer,
      },
      body:
        sanitizedBody && Object.keys(sanitizedBody).length > 0
          ? sanitizedBody
          : {},
    });

    const now = Date.now();
    return next.handle().pipe(
      tap(() =>
        this.logger.log(`Request completed in ${Date.now() - now}ms`, {
          method,
          url,
          ip,
        }),
      ),
    );
  }
}
