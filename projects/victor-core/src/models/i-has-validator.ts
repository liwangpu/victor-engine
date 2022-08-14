export interface IHasValidator {
  onValidatedChange(errors: { [scopeName: string]: string }): Promise<void>;
}
