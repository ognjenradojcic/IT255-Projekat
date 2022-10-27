import { AbstractControl } from "@angular/forms";

export function emailValidator(control: AbstractControl): { [key: string]: any } | null {
    var pattern = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      return pattern.test(control.value) ? null : { invalidEmail: true};
  }