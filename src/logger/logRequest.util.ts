import { instance as logger } from './winston.logger';
import { Request } from 'express';

export function logRequest(
  req: Request,
  message: string,
  extraData: Record<string, unknown> = {},
) {
  logger.info(message, {
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
