import { Injectable, Logger } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class RequestLoggerService {
  constructor(private readonly logger: Logger) {}

  log(req: Request, message: string, extraData: Record<string, unknown> = {}) {
    this.logger.log(message, {
      method: req.method,
      url: req.url,
      ip: req.ip,
      headers: {
        'user-agent': req.headers['user-agent'],
        referer: req.headers.referer,
      },
      body: req.body && Object.keys(req.body).length ? req.body : undefined,
      ...extraData,
    });
  }
}
