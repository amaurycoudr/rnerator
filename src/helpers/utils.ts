export const curryFileName =
  (config: { extension: 'ts' | 'js'; isReactFile: boolean }) =>
  (name: string): string => {
    const { isReactFile, extension } = config;
    return `${name}.${extension}${isReactFile ? 'x' : ''}`;
  };

export const getNoTextIfJs =
  (isJs: boolean) =>
  (text: string): string =>
    isJs ? '' : text;
