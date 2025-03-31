import { Injectable } from '@nestjs/common';

@Injectable()
export class LogsService {
  getCombinedLogs() {
    return { combinedErrors: [], combinedLogs: [] };
  }
}
