export function generateFileName(imageName: string, width: number | null, height: number | null): string {
  let name = imageName;
  if (width) name += `-w${width}`;
  if (height) name += `-h${height}`;
  return `${name}.jpg`;
}
