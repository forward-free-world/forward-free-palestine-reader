import { ChangeDetectorRef, Component, HostBinding, HostListener, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { filter, map } from 'rxjs';
import { Content } from './models/content';
import { FilterComponent } from './components/filter.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header.component';
import { POST_READER } from './tokens/post-reader.token';
import { PostComponent } from './components/post/post.component';
import { PostQuery } from './models/post-query';
import { PostsColumnPipe } from './pipes/post-column.pipe';
import { Toggle } from './models/toggle';
import { SkeletonPostComponent } from './components/skeleton-post/skeleton-post.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FilterComponent,
    FooterComponent,
    HeaderComponent,
    PostComponent,
    PostsColumnPipe,
    SkeletonPostComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  columns = 1;
  content: Content = 'human';
  loading = true;
  postQuery: PostQuery = {};
  posts = inject(POST_READER);
  spy = inject(ChangeDetectorRef);
  toggled: Toggle = 'off';
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly platformId = inject(PLATFORM_ID);

  ngOnInit() {
    this.breakpointObserver
      .observe(['(min-width: 1366px)'])
      .pipe(
        map(({ matches }) => (matches ? 2 : 1)),
        filter(() => isPlatformBrowser(this.platformId))
      )
      .subscribe(columns => {
        this.columns = columns;
        this.loading = false;
        this.spy.detectChanges();
      });
  }

  @HostBinding('class.scrolled') scrolled = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let scrollPosition = 0;
    if (isPlatformBrowser(this.platformId)) {
      scrollPosition = window.scrollY || document.documentElement.scrollTop;
    }
    this.scrolled = scrollPosition > 40;
  }

  clickTag(tag: string) {
    const { tags = [] } = this.postQuery;

    if (tags?.includes(tag)) {
      const tagIndex = tags.findIndex(t => t === tag);
      tags.splice(tagIndex, 1);
      if (tags.length === 0) {
        delete this.postQuery.tags;
      }
    } else {
      tags.push(tag);
    }

    if (tags.length) {
      this.postQuery.tags = tags;
    }

    this.spy.detectChanges();
  }

  tagSelected(tag: string): boolean {
    return this.postQuery.tags?.includes(tag) ?? false;
  }

  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  updateContent(toggle: Toggle) {
    this.toggled = toggle;
    switch (toggle) {
      case 'off':
        this.content = 'human';
        break;
      case 'blend':
        this.content = 'both';
        break;
      case 'on':
        this.content = 'machine';
        break;
    }
  }
}
