import { Module } from '@nestjs/common';
import { DownloadService } from './download.service';
import { DownloadController } from './download.controller';

@Module({
  controllers: [DownloadController],
  providers: [DownloadService]
})
export class DownloadModule {}
