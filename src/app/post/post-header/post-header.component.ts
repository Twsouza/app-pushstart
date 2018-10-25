import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-header',
  templateUrl: './post-header.component.html',
  styleUrls: ['./post-header.component.scss']
})
export class PostHeaderComponent  {
  @Input('post') post;

  get createdAt(): Date {
    return new Date(this.post.createdAt * 1000);
  }
}
