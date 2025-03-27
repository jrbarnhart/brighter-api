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

    if (request.url === '/health') {
      return next.handle();
    }

    const { method, url, ip, headers, body } = request;

    if (body.password) {
      body.password = '[REDACTED]';
    }
    if (body.username) {
      body.username = '[REDACTED]';
    }

    this.logger.log('Incoming request', {
      method,
      url,
      ip,
      headers: {
        'user-agent': headers['user-agent'],
        referer: headers.referer,
      },
      body: body && Object.keys(body).length ? body : {},
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
