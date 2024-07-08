import request from 'supertest';
import { app } from '../app';
import config from '../config';
import { fileExist } from '../utils/fileExist';
import sizeOf from 'image-size';
import { unlinkSync } from 'fs';

describe('GET /images route', () => {
  it('Should return status code 200', async () => {
    const result = await request(app).get('/images').send();
    expect(result.status).toBe(200);
  });
});

describe('GET /images/doesnotexist route', () => {
  it('Should return status code 404 and message', async () => {
    const result = await request(app).get('/images/doesnotexist').send();
    expect(result.status).toBe(404);
    expect(result.text).toBe('Image failed to process: base file does not exists');
  });
});

describe('These are the endpoint image generation tests', () => {
  const RandomWidth = Math.floor(Math.random() * 300) + 50;
  const GeneratedFile = `${config.THUMBNAIL_IMAGES_FOLDER}/test-w${RandomWidth}.jpg`;

  beforeAll(async () => {
    if (fileExist(GeneratedFile)) {
      unlinkSync(GeneratedFile);
    }
  });

  it('GET /images/test.jpg?w=[RANDOM] to GENERATE the image - Should return 200', async () => {
    const result = await request(app).get(`/images/test.jpg?w=${RandomWidth}`).send();
    expect(result.status).toBe(200);
  });

  it('GET /images/test-w[RANDOM].jpg exists AFTER generating - Should return true', () => {
    const afterGenerating = fileExist(GeneratedFile);
    expect(afterGenerating).toBe(true);
  });

  it('GET /images/test-w[RANDOM].jpg - Compare SIZE for the requested width - Should return true', async () => {
    const dimensions = await sizeOf(GeneratedFile);
    expect(dimensions.width).toBe(RandomWidth);
  });

  afterAll(() => {
    if (fileExist(GeneratedFile)) {
      unlinkSync(GeneratedFile);
    }
  });
});
