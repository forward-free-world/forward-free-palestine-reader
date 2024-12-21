import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-skeleton-post',
  standalone: true,
  imports: [],
  template: '<span></span><span></span><span></span><span>',
  styleUrl: './skeleton-post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonPostComponent {}
