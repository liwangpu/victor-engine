export class DynamicValidatorRegistry {
}
import { InjectionToken } from '@angular/core';
import 'reflect-metadata';
import { ComponentMetadataDescription, ComponentValidatorRule, DynamicComponentMetadata } from 'victor-core';

export interface ValidatorConfiguration {
  pageId: string;
  metadata: DynamicComponentMetadata;
  description: ComponentMetadataDescription;
}

export interface ValidatorAction {
  scopeName: string;
  scopeValue: any;
  scopeSource?: any;
}

export interface DynamicValidator {
  validatorType: string;
  componentType?: string;
  componentId?: string;
  validate(rule: ComponentValidatorRule, action: ValidatorAction, config: ValidatorConfiguration): Promise<string>;
}

export const DYNAMIC_VALIDATOR = new InjectionToken<DynamicValidator>('dynamic validator');
