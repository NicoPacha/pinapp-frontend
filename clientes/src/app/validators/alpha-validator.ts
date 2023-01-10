import { FormControl, ValidatorFn } from '@angular/forms';
import { ValidationMessage } from './models';

const Alpha = (message: string = `Ingresar solo letras`): ValidatorFn => {
  return (control: FormControl): ValidationMessage | null => {
    if (control.value) {
      const validation = {
        message,
        type: 'alpha',
      };
      return !new RegExp('^[zA-zA ñÑ.]*$').test(control.value)
        ? validation
        : null;
    } else {
      return null;
    }
  };
};

export { Alpha };
