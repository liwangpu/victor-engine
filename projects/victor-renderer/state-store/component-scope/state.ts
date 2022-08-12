export interface ComponentScopeValue {
  value: any;
  source?: any;
}

export interface ComponentScope {
  id: string;
  title: string;
  scopes: { [scopeName: string]: ComponentScopeValue }
}