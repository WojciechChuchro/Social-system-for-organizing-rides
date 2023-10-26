import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

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

export function passengerCountValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value || isNaN(value) || value < 1 || value > 9) {
      console.log('ELO');
      return {
        invalidPassengerCount:
          'Passenger count must be a number between 1 and 9',
      };
    }

    return null;
  };
}
