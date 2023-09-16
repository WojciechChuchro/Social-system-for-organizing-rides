import { AbstractControl, ValidationErrors } from '@angular/forms';

export function zipCodeValidator(
  control: AbstractControl,
): ValidationErrors | null {
  const value = control.value;
  const zipCodeFormat = /^[0-9]{2}-[0-9]{3}$/;
  if (!zipCodeFormat.test(value)) {
    return { invalidZipCode: true };
  }
  return null;
}

export function cityValidator(
  allowedCities: string[],
): (control: AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!allowedCities.includes(value)) {
      return { cityNotInList: true };
    }
    return null;
  };
}
