import { Controller, Post, UploadedFile, UploadedFiles } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiFileFields } from './api-file-fields.decorator';
import { ApiFile, ApiImageFile, ApiPdfFile } from './api-file.decorator';
import { ApiFiles } from './api-files.decorator';
import { FilesService } from './files.service';
import { ParseFile } from './parse-file.pipe';
import { fileMimetypeFilter } from './file-mimetype-filter';

@Controller('files')
@ApiTags('upload')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('avatar')
  @ApiImageFile('avatar', true)
  uploadAvatar(@UploadedFile(ParseFile) file: Express.Multer.File) {
    console.log(file);
  }
  
  @Post('document')
  @ApiPdfFile('document', true)
  uploadDocument(@UploadedFile(ParseFile) file: Express.Multer.File) {
    console.log(file);
  }

  @Post('uploads')
  @ApiFiles('files', true)
  uploadFiles(@UploadedFiles(ParseFile) files: Array<Express.Multer.File>) {
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
