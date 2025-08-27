import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetAbout {
  constructor(private http: HttpClient) {}

  getAbout(subreddit: string): Observable<any> {
    return this.http.get(`https://www.reddit.com/r/${subreddit}/about.json`, {
      headers: { Accept: 'application/json' },
    });
  }
}
