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
    response.send(file);
  }

  @Get('stream')
  stream(@Res() response: Response) {
    const file = this.downloadService.imageStream();
    file.pipe(response);
  }

  @Get('streamable')
  streamable(@Res({ passthrough: true }) response: Response) {
    const file = this.downloadService.fileStream();
    // or
    // const file = this.downloadService.fileBuffer();
    return new StreamableFile(file); // 👈 supports Buffer and Stream
  }
}
