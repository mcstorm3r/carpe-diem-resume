import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginForm: FormGroup;

  constructor() { }

  private initForm(): void {
    this.loginForm = new FormGroup(
      {
        email: new FormControl(null, [Validators.email, Validators.required]),
        password: new FormControl(null, [Validators.minLength(8), Validators.required])
      }
    );
  }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    console.log(this.loginForm.value);
  }

  onSignup() {

  }

}
