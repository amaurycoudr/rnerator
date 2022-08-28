import { pipe } from 'ramda';
import { ENTRY, SANDBOX } from '../const';
import { NamePath } from '../type/type';
import JsTsFile from '../utils/JsTsFile';

class SandboxString extends JsTsFile {
  constructor(path: string) {
    if (!path.includes(SANDBOX)) throw new Error('Invalid sandbox path');
    super(path, true);
  }

  get string() {
    return pipe(this.getInfo, SandboxString.getStringFromInfo)();
  }

  private static getStringFromInfo = ({ name, path }: NamePath) =>
    '{' +
    `name:"${name}",` +
    `location:"${path}",` +
    `component: require("${path}").default` +
    '}';

  private getInfo = (): NamePath => ({
    name: this.getName(),
    path: this.getRelativePath(),
  });

  private getName = () =>
    this.path.replace(`.${SANDBOX}.${this.extension}x`, '').split('/')[
      this.path.split('/').length - 1
    ];

  private getRelativePath = () => this.path.replace(ENTRY, '..');

  static new = (path: string) => new SandboxString(path);
}

export default SandboxString;
