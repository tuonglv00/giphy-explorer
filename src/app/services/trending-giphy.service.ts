import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map, scan, switchMap, tap } from 'rxjs/operators';
import { Gif } from '../utils/model/gif';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseGiphy } from '../utils/abstracts/base-giphy.abstract';

@Injectable({
  providedIn: 'root'
})
export class TrendingGiphyService extends BaseGiphy {
  private trendingGifs$: Observable<Gif[]>;
  private fetchTrendingGifs$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public isFetchingNewTrendingGifs: boolean = false;

  constructor(private http: HttpClient) {
    super("http://api.giphy.com/v1/gifs/trending", 21);
    this.trendingGifs$ = this.fetchTrendingGifs$.pipe(
      switchMap(_ => this.fetchTrendingGifsRequest()),
      scan((acc, val: any) => acc.concat(val), []));
  }

  private fetchTrendingGifsRequest(): Observable<Gif[]> {
    let params = {
      api_key: this.apiKey,
      limit: this.pageSize,
      offset: this.offset,
    };

    return this.http.get(this.requestURL, { params }).pipe(map((value: any) => value.data), finalize(() => {
      this.isFetchingNewTrendingGifs = false
    }));
  }

  public getTrendingGifsObs(): Observable<Gif[]> {
    return this.trendingGifs$;
  }

  public fetchTrendingGifs(): void {
    this.isFetchingNewTrendingGifs = true
    this.increaseOffset();
    this.fetchTrendingGifs$.next(false);
  }
}
