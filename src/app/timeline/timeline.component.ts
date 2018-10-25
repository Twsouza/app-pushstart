import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { Component, OnInit, isDevMode } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  posts;

  constructor(
    private api: ApiService,
    private route: Router) { }

  ngOnInit() {
    this.api.getPosts().subscribe(
      result => this.posts = result,
      error => this.checkPostError(error)
    );
  }

  checkPostError(error: HttpErrorResponse) {
    if (isDevMode()) {
      console.warn(error);
    }

    this.route.navigate(['/erro']);
  }

}
