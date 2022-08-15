import { Injectable } from '@angular/core';
import { ComponentValidatorRule, DynamicValidator, ValidatorAction, ValidatorConfiguration } from 'victor-core';

@Injectable()
export class SpecifyTextRequiredValidatorService implements DynamicValidator {
  validatorType: string = 'required';
  componentType: string = 'text';
  componentId: string = 'T2fqJM6S9';
  async validate(rule: ComponentValidatorRule, action: ValidatorAction, config: ValidatorConfiguration): Promise<string> {
    if (!action.scopeValue) {
      return '我是T2fqJM6S9必填校验提示';
    }
    return null;
  }

}
