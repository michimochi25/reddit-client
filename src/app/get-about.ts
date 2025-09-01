import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GetAbout {
  async getAbout(subreddit: string): Promise<any> {
    console.log('🔍 Environment check:');
    console.log('  environment.production:', environment.production);
    console.log('  window.location.hostname:', window.location.hostname);
    console.log('  NODE_ENV:', (window as any).NODE_ENV);

    let baseUrl = `/api/reddit/r/${subreddit}.json`;
    // if (environment.production) {
    //   // Production: use query parameter
    //   baseUrl = `/api/reddit?path=r/${subreddit}.json`;
    // } else {
    //   // Development: use proxy
    //   baseUrl = `/reddit/r/${subreddit}.json`;
    // }

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
