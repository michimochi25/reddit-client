import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetAbout {
  async getAbout(subreddit: string): Promise<any> {
    let baseUrl = `https://reddit.com/r/${subreddit}.json`;

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
