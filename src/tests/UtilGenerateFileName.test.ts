import { generateFileName } from '../utils/generateFileName';

describe('Should return nice.jpg', () => {
  it('Should return nice.jpg', () => {
    const result = generateFileName('nice', null, null);

    expect(result).toBe('nice.jpg');
  });
});

describe('Test for proper nameing', () => {
  it('Should return nice-w200.jpg', () => {
    const result = generateFileName('nice', 200, null);

    expect(result).toBe('nice-w200.jpg');
  });
});

describe('Test for proper nameing', () => {
  it('Should return nice-h200.jpg', () => {
    const result = generateFileName('nice', null, 200);

    expect(result).toBe('nice-h200.jpg');
  });
});

describe('Test for proper nameing', () => {
  it('Should return nice-w200-h200.jpg', () => {
    const result = generateFileName('nice', 200, 200);

    expect(result).toBe('nice-w200-h200.jpg');
  });
});
