import { Injectable } from '@angular/core';
import { ComponentValidatorRule, DynamicValidator, ValidatorAction, ValidatorConfiguration } from 'victor-core';

@Injectable()
export class WeakPasswordCheckValidatorService implements DynamicValidator {

  validatorType: string = 'weak-password-check';
  componentType?: string = 'my-password';
  async validate(rule: ComponentValidatorRule, action: ValidatorAction, config: ValidatorConfiguration): Promise<string> {
    if (action.scopeValue && (action.scopeValue as string).length <= 6) {
      return '密码长度不能小于6位数';
    }
    return null;
  }
}
