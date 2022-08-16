export interface IHasScopeData {
  onScopeDataChange(scope: { [scopeName: string]: any }): Promise<void>;
}
