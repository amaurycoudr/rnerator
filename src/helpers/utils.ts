export const getFileName = (
  name: string,
  config: { isReactFile: boolean; extension: string } = {
    isReactFile: false,
    extension: 'tsx',
  }
): string => {
  const { isReactFile, extension } = config;
  return `${name}.${extension}${isReactFile ? 'x' : ''}`;
};
export const test = '';
