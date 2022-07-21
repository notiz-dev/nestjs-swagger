import {
  Controller,
  Get,
  Res,
  StreamableFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DownloadService } from './download.service';
import { Response } from 'express';
import { LoggingInterceptor } from 'src/logging.interceptor';

@UseInterceptors(LoggingInterceptor)
@Controller('download')
@ApiTags('download')
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) {}

  @Get('buffer')
  buffer(@Res() response: Response) {
    const file = this.downloadService.imageBuffer();
    response.contentType('png');
    response.attachment('notiz.png');
    response.send(file);
  }

  @Get('stream')
  stream(@Res() response: Response) {
    const file = this.downloadService.imageStream();
    response.contentType('png');
    file.pipe(response);
  }

  @Get('streamable')
  streamable(@Res({ passthrough: true }) response: Response) {
    const file = this.downloadService.fileStream();
    // or
    // const file = this.downloadService.fileBuffer();
    response.contentType('application/json');
    response.attachment('package.json');
    return new StreamableFile(file); // 👈 supports Buffer and Stream
  }
}
