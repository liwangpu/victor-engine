import { Injectable } from '@angular/core';
import { ComponentValidatorRule, DynamicValidator, ValidatorAction, ValidatorConfiguration } from 'victor-core';

@Injectable()
export class RequiredValidatorService implements DynamicValidator {
  validatorType: string = 'required';
  async validate(rule: ComponentValidatorRule, action: ValidatorAction, config: ValidatorConfiguration): Promise<string> {
    if (!action.scopeValue) {
      return '该字段为必填信息';
    }
    // return errors;
    return null;
  }

}
