import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubredditCard } from './subreddit-card';

describe('SubredditCard', () => {
  let component: SubredditCard;
  let fixture: ComponentFixture<SubredditCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubredditCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubredditCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
