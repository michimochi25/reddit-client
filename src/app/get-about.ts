import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetAbout {
  async getAbout(subreddit: string): Promise<any> {
    console.log('Calling getAbout...');
    const res = await fetch(`/reddit/r/${subreddit}.json`, {
      headers: {
        Accept: 'application/json',
      },
    });
    return res.json();
  }
}
