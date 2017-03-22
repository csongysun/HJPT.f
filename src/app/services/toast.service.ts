import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class ToastService {

  constructor(
    private snackBar: MdSnackBar
  ) { }

  info(msg: string) {
    this.snackBar.open(msg, null, { duration: 2000 });
  }

  warn(msg: string, err?: any) {
    console.log(err);
    this.snackBar.open(msg, null, { duration: 2000 });
  }


}
