import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { SearchGiphyService } from 'src/app/services/search-giphy.service';
import { TrendingGiphyService } from 'src/app/services/trending-giphy.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExplorerComponent implements OnDestroy {
  public searchInput!: FormControl;
  public input$: Observable<any>;
  public isSearchingGifs$: Observable<boolean>;

  constructor(private formBuilder: FormBuilder, private trendingGiphyService: TrendingGiphyService, private searchGiphyService: SearchGiphyService) {
    this.searchInput = this.formBuilder.control('');
    this.isSearchingGifs$ = this.searchGiphyService.getIsSearchingStatusObs();

    this.input$ = this.searchInput.valueChanges.pipe(
      tap(() => { this.searchGiphyService.setIsSearching(true); }),
      debounceTime(400),
      switchMap((value: string) => {
        this.searchGiphyService.changeSearchKeyword(value)
        return of(null);
      })
    );
  }

  public onClickClearInput(): void {
    this.trendingGiphyService.fetchTrendingGifs();
    let currentValue = this.searchInput.getRawValue();
    if (currentValue?.length > 0) {
      this.searchInput.setValue("");
    }
  }

  public ngOnDestroy(): void {
    this.trendingGiphyService.resetOffset();
    this.searchGiphyService.resetOffset();
  }
}
