export type NamePath = {
  name: string;
  path: string;
};
export type Extension = 'js' | 'ts';

export type LoggingKind =
  | 'update'
  | 'create'
  | 'alreadyExists'
  | 'lint'
  | 'error';
