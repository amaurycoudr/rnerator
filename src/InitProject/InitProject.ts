import FolderCreator from '../Folder/FolderCreator/FolderCreator';
import FolderHandler from '../Folder/FolderHandler/FolderHandler';
import SandboxHandler from '../Sandbox/SandboxHandler/SandboxHandler';
import StepperClass from '../StepperClass/StepperClass';
import { Extension } from '../type/type';
import { COMPONENTS, ENTRY, SANDBOX, TEMPLATES } from '../utils/const';
import { getPath } from '../utils/path';
import getSandboxContent from './sandboxContent';
import getTemplateContent from './templateContent';

export default class InitProject extends StepperClass {
  protected totalStep: number = 4;

  constructor(private extension: Extension) {
    super();
  }

  setUpProject = () => {
    this.makeStep(() => InitProject.initSrcFolder(), 'SETUP SRC FOLDER');
    this.makeStep(() => this.initTemplateFolder(), 'SET UP TEMPLATE FOLDER');
    this.makeStep(
      () => InitProject.initComponentFolder(),
      'SET UP COMPONENT FOLDER'
    );
    this.makeStep(() => this.initSandBoxFolder(), 'SET UP SANDBOX FOLDER');
  };

  private static initSrcFolder(): void {
    new FolderCreator(getPath(ENTRY)).createFolder();
  }

  private initTemplateFolder(): void {
    new FolderHandler(
      getPath(ENTRY, TEMPLATES),
      getTemplateContent(this.extension)
    ).setUpFolder();
  }

  private static initComponentFolder(): void {
    new FolderCreator(getPath(ENTRY, COMPONENTS)).createFolder();
  }

  private initSandBoxFolder(): void {
    new FolderHandler(
      getPath(ENTRY, SANDBOX),
      getSandboxContent(this.extension)
    ).setUpFolder();
    SandboxHandler.generateSandboxFiles();
  }
}
