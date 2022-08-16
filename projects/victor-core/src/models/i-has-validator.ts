import { IHasScopeData } from './i-has-scope-data';

export interface IHasValidator extends IHasScopeData {
  onValidatedChange(errors: { [scopeName: string]: string }): Promise<void>;
}
