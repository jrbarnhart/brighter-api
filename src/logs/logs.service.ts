import { Injectable } from '@nestjs/common';
import fs from 'fs';
import zlib from 'zlib';
import readline from 'readline';

@Injectable()
export class LogsService {
  getCombinedLogs() {
    const combinedLogs: Record<any, any>[] = [];
    const combinedErrors: Record<any, any>[] = [];

    // For each .log or .gz file in /logs
    const dirPath = __dirname + '/logs';
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        // Handle error
      }

      files.forEach(async (file) => {
        // File type
        const isGzip = file.endsWith('.gz');
        const isLog = file.endsWith('.log');
        // Error or log file
        const isError = file.startsWith('error');

        // Create readline interface
        const lineReader = isGzip
          ? readline.createInterface({
              input: fs.createReadStream(file).pipe(zlib.createGunzip()),
            })
          : isLog
            ? readline.createInterface({ input: fs.createReadStream(file) })
            : null;

        // For each line in the interface add it to combinedErrors or combinedLogs
        if (lineReader) {
          for await (const line of lineReader) {
            if (isError) {
              combinedErrors.push(JSON.parse(line));
            } else {
              combinedLogs.push(JSON.parse(line));
            }
          }
        }
      });
    });

    return { combinedLogs, combinedErrors };
  }
}
