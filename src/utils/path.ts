import { ENTRY } from '../const';

export const getPath = (...name: string[]) => `${ENTRY}/${name.join('/')}`;
