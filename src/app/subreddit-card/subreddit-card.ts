import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SubredditPost } from '../subreddit-post/subreddit-post';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-subreddit-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    SubredditPost,
    MatListModule,
    MatIconModule,
  ],
  templateUrl: './subreddit-card.html',
  styleUrls: ['./subreddit-card.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubredditCard {
  @Input() subreddit!: string;
  @Input() data!: any[] | undefined;
  @Input() remove!: (subreddit: string) => void;
  @Input() refresh!: (subreddit: string) => void;
}
