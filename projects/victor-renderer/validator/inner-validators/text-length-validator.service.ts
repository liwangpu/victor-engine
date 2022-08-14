import { Injectable } from '@angular/core';
import { ComponentValidatorRule, DynamicValidator, ValidatorAction, ValidatorConfiguration } from 'victor-core';

@Injectable()
export class TextLengthValidatorService implements DynamicValidator {

  validatorType: string = 'text-length';
  async validate(rule: ComponentValidatorRule, action: ValidatorAction, config: ValidatorConfiguration): Promise<string> {

    if (action.scopeValue) {
      if (rule.min) {
        if (action.scopeValue.length < rule.min) {
          return `该字段长度不能小于${rule.min}个字符`;
        }
      }

      if (rule.max) {
        if (action.scopeValue.length > rule.max) {
          return `该字段长度不能大于${rule.max}个字符`;
        }
      }
    }
    return null;
  }
}
