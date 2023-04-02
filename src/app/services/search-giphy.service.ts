import { Injectable } from '@angular/core';
import { BaseGiphy } from '../utils/abstracts/base-giphy.abstract';
import { BehaviorSubject, Observable, finalize, map, scan, switchMap, tap } from 'rxjs';
import { Gif } from '../utils/model/gif';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchGiphyService extends BaseGiphy {
  private isSearching$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private searchGifsResults$: Observable<Gif[]>;
  private searchGifs$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  private isFetchMoreGifsResults: boolean = false;
  public isFetchingGifsResults: boolean = false;

  constructor(private http: HttpClient) {
    super("https://api.giphy.com/v1/gifs/search", 21);
    this.searchGifsResults$ = this.searchGifs$.pipe(
      switchMap((value: string) => this.searchGifsRequest(value)),
      scan((acc, val: any) => {
        if (this.isFetchMoreGifsResults) return acc.concat(val);
        this.resetSearchResultTabScrollbarPosition()
        return val;
      }, []));
  }

  private searchGifsRequest(searchKeyword: string): Observable<Gif[]> {
    let params = {
      api_key: this.apiKey,
      limit: this.pageSize,
      offset: this.offset,
      q: searchKeyword
    };

    return this.http.get(this.requestURL, { params }).pipe(
      tap(() => {
        this.isFetchingGifsResults = true;
      }),
      map((value: any) => value.data),
      finalize(() => {
        this.isSearching$.next(false);
        this.isFetchingGifsResults = false;
      }));
  }

  public loadMoreSearchGifsResults(): void {
    this.isFetchMoreGifsResults = true;
    let currentInputValue = this.searchGifs$.getValue();
    this.increaseOffset();
    this.searchGifs$.next(currentInputValue);
  }

  public changeSearchKeyword(searchKeyword: string) {
    this.isFetchMoreGifsResults = false;
    this.resetOffset();
    this.searchGifs$.next(searchKeyword);
  }

  public getSearchGifsResultsObs(): Observable<Gif[]> {
    return this.searchGifsResults$;
  }

  public getIsSearchingStatusObs(): Observable<boolean> {
    return this.isSearching$;
  }

  public setIsSearching(stat: boolean): void {
    this.isSearching$.next(stat);
  }

  // Reset scrollbar position to the top when searching the next keyword
  public resetSearchResultTabScrollbarPosition(): void {
    let searchResultTabDOM = document.getElementById('searchResultTab');
    if (searchResultTabDOM) searchResultTabDOM.scrollTop = 0;
  }
}
