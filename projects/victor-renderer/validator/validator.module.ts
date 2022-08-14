import { NgModule } from '@angular/core';
import { DYNAMIC_VALIDATOR } from 'victor-core';
import { RequiredValidatorService } from './inner-validators/required-validator.service';
import { TextLengthValidatorService } from './inner-validators/text-length-validator.service';

@NgModule({
  providers: [
    { provide: DYNAMIC_VALIDATOR, useClass: RequiredValidatorService, multi: true },
    { provide: DYNAMIC_VALIDATOR, useClass: TextLengthValidatorService, multi: true },
  ]
})
export class ValidatorModule { }
