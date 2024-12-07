import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output
} from '@angular/core';

import { AiComponent } from '../ai.component';
import { Content } from '../../models/content';
import { MARKDOWN_CONVERTER } from '../../tokens/markdown-converter.token';
import { Post } from '../../models/post';
import { CommonModule } from '@angular/common';
import { TldrDTO } from '../../../bin/models/tldr-dto';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  imports: [CommonModule, AiComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class PostComponent implements AfterViewInit {
  @Input() content!: Content;
  @Output() tagSelected = new EventEmitter<string>();

  markdown!: string;
  summary!: string;
  private _post!: Post;
  private readonly elementRef = inject(ElementRef);
  private readonly markdownConverter = inject(MARKDOWN_CONVERTER);
  private readonly spy = inject(ChangeDetectorRef);

  @Input()
  set post(post: Post) {
    this.markdown = this.markdownToHtml(post.comment);
    this.getSummary(post.link ?? '').then(tldr => {
      const { summary } = tldr;
      this.summary = summary?.length ? summary[0] : '';
      this.spy.detectChanges();
    });
    this._post = post;
  }
  get post(): Post {
    return this._post;
  }

  ngAfterViewInit() {
    const anchors: HTMLAnchorElement[] = Array.from(this.elementRef.nativeElement.querySelectorAll('article a'));
    anchors.forEach(a => {
      a.target = '_blank';
    });
  }

  private markdownToHtml(markdown: string): string {
    const m = markdown.replace(/(#{1,4})(\s)/g, '$1### ');
    return this.markdownConverter.makeHtml(m);
  }

  private async getSummary(link: string): Promise<TldrDTO> {
    let summary: { default: TldrDTO };
    const filename = btoa(link);

    try {
      summary = await import(`../../../../out/summaries/${filename}.json`);
    } catch {
      summary = { default: { summary: [] } };
    }

    return summary.default;
  }
}
