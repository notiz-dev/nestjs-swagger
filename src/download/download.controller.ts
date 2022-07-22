import {
  Controller,
  Get,
  HttpStatus,
  Res,
  StreamableFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiProduces,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DownloadService } from './download.service';
import { Response } from 'express';
import { LoggingInterceptor } from 'src/logging.interceptor';
import { ApiFileResponse } from './api-file-response.decorator';

@UseInterceptors(LoggingInterceptor)
@Controller('download')
@ApiTags('download')
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) {}

  @ApiFileResponse('image/png')
  @Get('buffer')
  buffer(@Res() response: Response) {
    const file = this.downloadService.imageBuffer();
    response.contentType('png');
    response.attachment('notiz.png');
    response.send(file);
  }

  @ApiResponse({
    schema: {
      type: 'string',
      format: 'binary',
    },
  })
  @Get('stream')
  stream(@Res() response: Response) {
    const file = this.downloadService.imageStream();
    response.contentType('png');
    file.pipe(response);
  }

  @ApiOkResponse({
    schema: {
      type: 'string',
      format: 'binary',
    },
  })
  @ApiProduces('application/json')
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
