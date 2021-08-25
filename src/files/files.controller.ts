import { Controller, Post, UploadedFile, UploadedFiles } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiFileFields } from './api-file-fields.decorator';
import { ApiFile } from './api-file.decorator';
import { ApiFiles } from './api-files.decorator';
import { FilesService } from './files.service';

@Controller('files')
@ApiTags('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @ApiFile('avatar', false)
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  @Post('uploads')
  @ApiFiles('files', true)
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }

  @Post('uploadFields')
  @ApiFileFields([
    { name: 'avatar', maxCount: 1, required: true },
    { name: 'background', maxCount: 1 },
  ])
  uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[]) {
    console.log(files);
  }
}
