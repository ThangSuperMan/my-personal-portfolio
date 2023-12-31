import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { PostsComponent } from './posts.component';

describe('PostComponent', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [PostsComponent],
      imports: [HttpClientModule],
      providers: [],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(PostsComponent);
    const postsComponent = fixture.componentInstance;
    expect(postsComponent).toBeTruthy();
  });

  it('should diplsay a correct message when there are no posts', () => {
    const fixture = TestBed.createComponent(PostsComponent);
    fixture.detectChanges();

    const postsComponent = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;

    if (postsComponent.posts.length === 0) {
      expect(compiled.querySelector('h4.posts__no-posts-message')?.textContent).toContain(
        'There are no posts',
      );
    }
  });
});
