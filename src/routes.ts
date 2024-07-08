import { Application, Router } from 'express';
import { ImagesController } from './controllers/ImagesController';
import { IndexController } from './controllers/IndexController';
import { UploadController } from './controllers/UploadController';
import path from 'path';

const _routes: [string, Router][] = [
  ['/', IndexController],
  ['/upload', UploadController],
  ['/images', ImagesController],
];

export const routes = (app: Application): void => {
  _routes.forEach((route) => {
    const [url, controller] = route;
    app.use(url, controller);
  });

  // Serve the frontend HTML file for all other routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
};
