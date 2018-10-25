import { NzNotificationService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit, isDevMode } from '@angular/core';

@Component({
  selector: 'app-post-banner',
  templateUrl: './post-banner.component.html',
  styleUrls: ['./post-banner.component.scss']
})
export class PostBannerComponent implements OnInit {
  @Input('data') data;
  pollForm: FormGroup;
  private showPoll = false;

  constructor(
    private notification: NzNotificationService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.pollForm = this.fb.group({
      option: ['', [ Validators.required ] ]
    });
  }

  get option() {
    return this.pollForm.get('option');
  }

  // sum all votes
  get total() {
    return this.data.options.reduce((a, b) => (a.votes | a) + b.votes);
  }

  getPercent(votes: number): number {
    return (100 / this.total) * votes;
  }

  submitPollForm() {
    if (this.pollForm.invalid) {
      this.checkForm();
      this.notification.warning('Atenção!', 'Selecione uma opção');
      return;
    }

    if (isDevMode()) {
      console.log(this.option);
    }

    if (this.vote(this.option.value)) {
      this.showPoll = true;
    } else {
      this.notification.error('Ops!', 'Aconteceu um erro na votação, sua opção escolhida não foi encontrada! Tente novamente');
    }
  }

  vote(value: string): boolean {
    const selected = this.data.options.find((option) => option.value === value);

    if (isDevMode()) {
      console.log(selected);
    }

    // if find the option selected, it'll increase
    if (selected) {
      selected.votes++;
      return true;
    }
    return false;
  }

  checkForm() {
    // tslint:disable-next-line:forin
    for (const i in this.pollForm.controls) {
      this.pollForm.controls[i].markAsDirty();
      this.pollForm.controls[i].updateValueAndValidity();
    }
  }
}
