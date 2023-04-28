import { BadRequestException, Injectable } from '@nestjs/common';
import { join } from 'path';
import { existsSync } from 'fs';
@Injectable()
export class FilesService {
  async getFileService(file: string) {
    const path = join(__dirname, '../../static/uploads', file);
    if (!existsSync(path)) {
      throw new BadRequestException(`No product found with name ${file}`);
    }
    return path;
  }
}
