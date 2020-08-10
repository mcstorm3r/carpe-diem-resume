import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})
export class LoggingService {

  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string) {
    this.snackBar.open(message, 'X')._dismissAfter(3000);
  }

  showError(message: string) {
    this.snackBar.open(message, 'X', {panelClass: ['error']})._dismissAfter(3000);
  }
}
