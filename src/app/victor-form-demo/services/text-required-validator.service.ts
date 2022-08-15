import { Injectable } from '@angular/core';
import { ComponentValidatorRule, DynamicValidator, ValidatorAction, ValidatorConfiguration } from 'victor-core';

@Injectable()
export class TextRequiredValidatorService implements DynamicValidator {
  validatorType: string = 'required';
  componentType: string = 'text';
  async validate(rule: ComponentValidatorRule, action: ValidatorAction, config: ValidatorConfiguration): Promise<string> {
    if (!action.scopeValue) {
      return '要填的哦';
    }
    return null;
  }

}
