import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appInteger]'
})
export class IntegerDirective {

  constructor(
  ) {

  }
  @HostListener('keydown', ['$event']) onKeydown(event: any) {
    let x = event.keyCode;

    if (!(
      (x > 47 && x < 58)
      || (x > 95 && x < 106)
      || x === 9
      || x === 8
    ))
      event.preventDefault()
  }
}
