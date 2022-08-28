import { Extension } from '../type/type';

export const getFileName =
  (config: { extension: 'ts' | 'js'; isReactFile: boolean }) =>
  (name: string): string => {
    const { isReactFile, extension } = config;
    return `${name}.${extension}${isReactFile ? 'x' : ''}`;
  };

export const getNoTextIfJs =
  (extension: Extension) =>
  (text: string): string =>
    extension === 'js' ? '' : text;
