import { NzNotificationService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  feedbackForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private api: ApiService) { }

  ngOnInit() {
    this.feedbackForm = this.fb.group({
      name: ['', [ Validators.required, Validators.minLength(3), Validators.maxLength(255) ]],
      email: ['', [ Validators.required, Validators.email ]],
      message: ['', [ Validators.required, Validators.minLength(10), Validators.maxLength(2014) ]]
    });
  }

  get name() {
    return this.feedbackForm.get('name');
  }

  get email() {
    return this.feedbackForm.get('email');
  }

  get message() {
    return this.feedbackForm.get('message');
  }

  submitFeedbackForm() {
    if (this.feedbackForm.invalid) {
      this.checkForm();
      this.notification.blank('Formulário incompleto!', 'Atente-se a todos os campos');
      return;
    }

    this.api.feedback(this.name.value, this.email.value, this.message.value).subscribe(
      result => this.feedbackSubmited(result),
      error => this.checkErrorFeedback(error)
    );
  }

  checkForm() {
    // tslint:disable-next-line:forin
    for (const i in this.feedbackForm.controls) {
      this.feedbackForm.controls[i].markAsDirty();
      this.feedbackForm.controls[i].updateValueAndValidity();
    }
  }

  feedbackSubmited(result) {
    console.log('result: ', result);
    this.notification.success('Enviado!', 'Feedback enviado com sucesso.');

    // reset form
    this.feedbackForm.reset();
  }

  checkErrorFeedback(response: HttpErrorResponse) {
    console.log(response);
    console.warn(response.error.code);
    this.notification.error('Erro!', response.error.message);

    // check for name field error
    if (response.error.fields && response.error.fields.name) {
      response.error.fields.name.forEach(element => {
        this.notification.error('Nome', element);
      });
    }

    // check for email field error
    if (response.error.fields && response.error.fields.email) {
      response.error.fields.email.forEach(element => {
        this.notification.error('E-mail', element);
      });
    }

    // check for message field error
    if (response.error.fields && response.error.fields.message) {
      response.error.fields.message.forEach(element => {
        this.notification.error('Mensagem', element);
      });
    }
  }
}
