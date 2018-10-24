import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd';

import { ApiService } from './../service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private api: ApiService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [ Validators.required, Validators.minLength(3), Validators.maxLength(256)]],
      password: ['', [ Validators.required, Validators.minLength(3), Validators.maxLength(256)]]
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  submitLoginForm() {
    if (this.loginForm.invalid) {
      this.checkForm();
      this.notification.blank('Formulário incompleto!', 'Atente-se a todos os campos');
      return;
    }

    console.log(this.username.value, this.password.value);
    this.api.login(this.username.value, this.password.value).subscribe(
      result => this.api.authUser((result as any).token),
      error => this.checkError(error)
    );
  }

  checkForm() {
    // tslint:disable-next-line:forin
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }
  }

  checkError(response) {
    console.warn(`error code: ${response.error.code}`);
    this.notification.error('Erro', response.error.message);

    // check for username field error
    if (response.error.fields && response.error.fields.username) {
      response.error.fields.username.forEach(element => {
        this.notification.error('Usuário', element);
      });
    }

    // check for password field error
    if (response.error.fields && response.error.fields.password) {
      response.error.fields.password.forEach(element => {
        this.notification.error('Senha', element);
      });
    }
  }
}
