import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubredditPost } from './subreddit-post';

describe('SubredditPost', () => {
  let component: SubredditPost;
  let fixture: ComponentFixture<SubredditPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubredditPost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubredditPost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
