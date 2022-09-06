import Logger from '../Logger/Logger';

export default abstract class StepperClass {
  protected abstract totalStep: number;

  private currentStep = 0;

  protected makeStep = <T>(stepFn: () => T, stepTitle: string) => {
    this.currentStep += 1;

    Logger.logStep(`➡️ ${this.currentStep}/${this.totalStep} - ${stepTitle}`);

    stepFn();

    Logger.logStep(
      `➡️ ${this.currentStep}/${this.totalStep} - ${stepTitle} - DONE`
    );
  };
}
