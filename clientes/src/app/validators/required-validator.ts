import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { ValidationMessage } from './models';

const Required = (message: string = `Este campo es requerido`): ValidatorFn => {
  return (control: FormControl): ValidationMessage | null => {
    const validation = {
      message,
      type: 'alpha',
    };
    return Validators.required(control) ? validation : null;
  };
};

export { Required };
