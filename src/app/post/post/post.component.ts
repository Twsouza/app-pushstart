import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  @Input('post') post;
  @Output('likedEvent') likedEvent = new EventEmitter();
  liked = false;

  likePost(post) {
    this.liked = true;
    this.likedEvent.emit(post);
  }
}
