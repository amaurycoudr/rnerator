import { Extension } from '../type/type';

export default class JsTsFile {
  protected path: string;

  protected isReact: boolean;

  protected get extension() {
    return this.path.includes('.js') ? 'js' : 'ts';
  }

  constructor(path: string, isReact: boolean) {
    this.isReact = isReact;
    if (this.isExtensionInvalid(path))
      throw new Error(
        `Invalid File extension must be ${
          isReact ? '.jsx or .tsx' : '.js or .ts'
        }`
      );
    this.path = path;
  }

  private isExtensionInvalid(path: string) {
    return (
      !this.isExtensionInclude(path, 'js') &&
      !this.isExtensionInclude(path, 'ts')
    );
  }

  private isExtensionInclude(path: string, extension: Extension) {
    return path.includes(this.getCompleteExtension(extension));
  }

  private getCompleteExtension(extension: Extension) {
    return `.${extension}${this.isReact ? 'x' : ''}`;
  }
}
