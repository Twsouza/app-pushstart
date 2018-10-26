import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-video',
  templateUrl: './post-video.component.html',
  styleUrls: ['./post-video.component.scss']
})
export class PostVideoComponent {
  @Input('data') data;
}
