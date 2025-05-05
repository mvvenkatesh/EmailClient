import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchPasswordValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const passwordConfirmation = group.get('passwordConfirmation')?.value;

    if (!password || !passwordConfirmation) {
      return null;
    }

    return password === passwordConfirmation ? null : { passwordsDontMatch: true };
  };
}
