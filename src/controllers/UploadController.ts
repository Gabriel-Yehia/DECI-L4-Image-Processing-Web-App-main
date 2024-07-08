import { Request, Response, Router } from 'express';
import multer from 'multer';
import config from '../config';
import path from 'path';

export const UploadController: Router = Router();

UploadController.get('/', (req: Request, res: Response): Response => res.status(200).send('Image Processing API'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.ORIGINAL_IMAGES_FOLDER);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedExtensions = ['.jpg'];
  const fileExtension = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(new Error('Only .jpg files are allowed.'));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

UploadController.post('/', upload.single('image'), async (req: Request, res: Response): Promise<Response> => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  return res.send('SUCCESS!');
});
