import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GetAbout {
  private getBaseUrl(): string {
    if (environment.production) {
      // In production: use Vercel serverless function
      return '/api/reddit';
    } else {
      // In development: use proxy
      return '/reddit';
    }
  }

  async getAbout(subreddit: string): Promise<any> {
    const baseUrl = this.getBaseUrl();
    const url = `${baseUrl}/r/${subreddit}.json`;

    try {
      const res = await fetch(url, {
        headers: {
          Accept: 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Error fetching subreddit data:', error);
      throw error;
    }
  }
}
