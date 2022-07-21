import { Injectable } from '@nestjs/common';
import { createReadStream, readFileSync } from 'fs';
import { join } from 'path';

/**
 * This service would probably download files from a file storage
 * like S3, minio etc.
 */
@Injectable()
export class DownloadService {
  constructor() {
    // create connection to your file storage
  }

  imageBuffer() {
    return readFileSync(join(process.cwd(), 'notiz.png'));
  }

  imageStream() {
    return createReadStream(join(process.cwd(), 'notiz.png'));
  }

  fileBuffer() {
    return readFileSync(join(process.cwd(), 'package.json'));
  }

  fileStream() {
    return createReadStream(join(process.cwd(), 'package.json'));
  }
}
