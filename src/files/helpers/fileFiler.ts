import { BadRequestException } from '@nestjs/common';

export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  if (!file) return callback(new BadRequestException('File is empty'), false);
  const fileExtension = file.mimetype.split('/')[1];
  const validExptension = ['jpg', 'jpeg', 'png', 'gif'];
  if (validExptension.includes(fileExtension)) {
    return callback(null, true);
  }
  callback(null, false);
};
