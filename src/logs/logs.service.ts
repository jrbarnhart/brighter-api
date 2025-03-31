import { Injectable } from '@nestjs/common';
import fs from 'fs';
import zlib from 'zlib';
import readline from 'readline';
import path from 'path';

@Injectable()
export class LogsService {
  async getCombinedLogs() {
    const combinedLogs: Record<any, any>[] = [];
    const combinedErrors: Record<any, any>[] = [];

    // For each .log or .gz file in /logs
    const dirPath = path.join(process.cwd(), 'logs');

    try {
      const files = await fs.promises.readdir(dirPath);

      const fileReadPromises = files.map(async (fileName) => {
        const filePath = path.join(dirPath, fileName);

        // Check if this is a log or error file we should process
        const isGzip = fileName.endsWith('.gz');
        const isLog = fileName.endsWith('.log');
        if (!isGzip && !isLog) return; // Skip non-log files

        const isError = fileName.startsWith('error');

        try {
          // Create appropriate stream
          let fileStream;
          if (isGzip) {
            const gunzip = zlib.createGunzip();
            // Handle gunzip errors specifically
            gunzip.on('error', (err) => {
              console.error(`Gunzip error in file ${fileName}: ${err.message}`);
              // Allow the process to continue with other files
            });
            fileStream = fs.createReadStream(filePath).pipe(gunzip);
          } else {
            fileStream = fs.createReadStream(filePath);
          }

          const lineReader = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
          });

          // Process each line
          for await (const line of lineReader) {
            try {
              const parsedLine = JSON.parse(line);
              if (isError) {
                combinedErrors.push(parsedLine);
              } else {
                combinedLogs.push(parsedLine);
              }
            } catch (parseErr) {
              console.error(
                `Failed to parse line in ${fileName}: ${parseErr.message}`,
              );
            }
          }
        } catch (fileErr) {
          console.error(
            `Error processing file ${fileName}: ${fileErr.message}`,
          );
          // Continue with other files rather than failing completely
        }
      });

      await Promise.all(fileReadPromises);

      return { combinedLogs, combinedErrors };
    } catch (err) {
      console.error(`Error reading logs directory: ${err.message}`);
      throw err;
    }
  }
}
