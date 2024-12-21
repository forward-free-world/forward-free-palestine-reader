import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../models/post';

@Pipe({
  name: 'postsColumn',
  standalone: true
})
export class PostsColumnPipe implements PipeTransform {
  transform(posts: Post[] | null, columns = 1): Post[][] {
    posts ??= [];
    const postsReturn: Post[][] = [];

    for (let i = 0; i < columns; i++) {
      const currentRow = posts.filter((_, index) => index % columns === i);
      postsReturn.push(currentRow);
    }

    return postsReturn;
  }
}
