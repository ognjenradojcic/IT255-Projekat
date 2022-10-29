import { AbstractControl } from "@angular/forms";

export function emailValidator(control: AbstractControl): { [key: string]: any } | null {
  var pattern = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
  return pattern.test(control.value) ? null : { invalidEmail: true };
}

export function linkValidator(control: AbstractControl): { [key: string]: any } | null {
  var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return pattern.test(control.value) ? null : { invalidLink: true };
}