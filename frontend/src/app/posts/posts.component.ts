import { Component } from '@angular/core';
import Post from '../core/models/post';
import { PostService } from '../services/post/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent {
  posts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.getPosts().subscribe((res: any) => {
      this.posts = res.data.posts;
    });
  }
}
