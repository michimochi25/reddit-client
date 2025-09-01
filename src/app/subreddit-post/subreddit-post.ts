import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-subreddit-post',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './subreddit-post.html',
  styleUrls: ['./subreddit-post.css'],
})
export class SubredditPost {
  @Input() title!: string;
  @Input() upvotes!: number;
}
