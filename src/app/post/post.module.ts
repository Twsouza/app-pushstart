import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { PostBannerComponent } from './post-banner/post-banner.component';
import { PostHeaderComponent } from './post-header/post-header.component';
import { PostImageComponent } from './post-image/post-image.component';
import { PostComponent } from './post/post.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ],
  exports: [
    ReactiveFormsModule,
    NgZorroAntdModule,
    PostComponent,
  ],
  declarations: [
    PostHeaderComponent,
    PostComponent,
    PostImageComponent,
    PostBannerComponent
  ],
})
export class PostModule { }
