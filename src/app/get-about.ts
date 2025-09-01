import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GetAbout {
  async getAbout(subreddit: string): Promise<any> {
    let baseUrl = '';
    if (environment.production) {
      // Production: use query parameter
      baseUrl = `/api/reddit?path=r/${subreddit}.json`;
    } else {
      // Development: use proxy
      baseUrl = `/reddit/r/${subreddit}.json`;
    }

    try {
      const res = await fetch(baseUrl, {
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
