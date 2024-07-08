import { unlinkSync } from 'fs';
import config from '../config';
import { fileExist } from '../utils/fileExist';
import { resizeImage } from '../utils/resizeImage';

describe('resizeImage utility creates the file', () => {
  it('Should create the file', async () => {
    const fileToCheck = config.THUMBNAIL_IMAGES_FOLDER + '/test-w200-h200.jpg';

    if (fileExist(fileToCheck)) {
      unlinkSync(fileToCheck);
    }

    await resizeImage('test', 200, 200);

    expect(fileExist(fileToCheck)).toBe(true);
  });
});
