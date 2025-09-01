import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { InputDialog } from './input-dialog/input-dialog';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SubredditCard } from './subreddit-card/subreddit-card';
import { CommonModule } from '@angular/common';
import { GetAbout } from './get-about';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    SubredditCard,
    CommonModule,
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  protected readonly title = signal('reddit-client');
  readonly subreddits: WritableSignal<Record<string, any>> = signal({});
  subredditNames = computed(() => Object.keys(this.subreddits()));
  readonly dialog = inject(MatDialog);

  constructor(private service: GetAbout) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedSubreddits = localStorage.getItem('subreddits');
      if (storedSubreddits) {
        this.subreddits.set(JSON.parse(storedSubreddits));
      }
    }
  }

  removeSubreddit = (subreddit: string): void => {
    this.subreddits.update((currentData) => {
      const { [subreddit]: removed, ...rest } = currentData;
      return rest;
    });
    this.subredditNames = computed(() => Object.keys(this.subreddits()));
    localStorage.setItem('subreddits', JSON.stringify(this.subreddits()));
  };

  refreshSubreddit = async (subreddit: string): Promise<void> => {
    try {
      const res = await this.service.getAbout(subreddit);
      this.subreddits.update((currentData) => {
        const updated = {
          ...currentData,
          [subreddit]: res.data.children,
        };

        // Save the updated data directly
        localStorage.setItem('subreddits', JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      console.error('Error refreshing subreddit:', error);
    }
  };

  openDialog(): void {
    const dialogRef = this.dialog.open(InputDialog, {
      data: {
        subreddit: '',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.key && result.data) {
        const key = result.key;
        const val = result.data;

        this.subreddits.update((currentData) => ({
          ...currentData,
          [key]: val,
        }));
        localStorage.setItem('subreddits', JSON.stringify(this.subreddits()));
      }
    });
  }
}
