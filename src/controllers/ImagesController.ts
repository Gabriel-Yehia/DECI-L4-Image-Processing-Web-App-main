import { Request, Response, Router } from 'express';
import config from '../config';
import { resizeImage } from '../utils/resizeImage';
import { fileExist } from '../utils/fileExist';
import { generateFileName } from '../utils/generateFileName';
import fs from 'fs';

export const ImagesController: Router = Router();

ImagesController.get('/', (req: Request, res: Response): void => {
  const imageFiles = fs.readdirSync(config.ORIGINAL_IMAGES_FOLDER);
  res.status(200).json(imageFiles);
});

ImagesController.get('/:imageName', async (req: Request, res: Response): Promise<Response | void> => {
  const { imageName } = req.params;

  const path = `${config.ORIGINAL_IMAGES_FOLDER}/${imageName}`;
  const coreFileExists = fileExist(path);

  if (coreFileExists) {
    const width = Number(req.query.w) || null;
    const height = Number(req.query.h) || null;

    if (!((width === null || width <= 0) && (height === null || height <= 0))) {
      const imageNameWithoutExtension = imageName.split('.')[0];
      const resizedImageName = generateFileName(imageNameWithoutExtension, width, height);
      const resizedImagePath = `${config.THUMBNAIL_IMAGES_FOLDER}/${resizedImageName}`;

      if (!fileExist(resizedImagePath)) {
        await resizeImage(imageNameWithoutExtension, width, height);
      }

      return res.status(200).sendFile(resizedImagePath);
    } else {
      return res.status(200).send('Please provide valid width and/or height for the image');
    }
  } else {
    return res.status(404).send('Image failed to process: base file does not exists');
  }
});
