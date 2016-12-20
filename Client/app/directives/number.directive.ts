import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumber]'
})
export class NumberDirective {

  constructor() { }

  @HostListener('keydown', ['$event']) onKeydown(event: any) {
    let x = event.keyCode;
    let value = event.target.value as string;
    if (!(
      (x > 47 && x < 58)
      || (x > 95 && x < 106)
      || x === 9
      || x === 8
      || (x === 110 && value.indexOf('.') === -1)
    ))
      event.preventDefault()
  }
}
