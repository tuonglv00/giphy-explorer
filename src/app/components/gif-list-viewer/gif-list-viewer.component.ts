import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { TrendingGiphyService } from 'src/app/services/trending-giphy.service';
import { Gif } from 'src/app/utils/model/gif';
import { SearchGiphyService } from 'src/app/services/search-giphy.service';
import { ThemeService } from 'src/app/services/theme.service';

// PrimeNG module
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AccordionModule } from 'primeng/accordion';
import { DataViewModule } from 'primeng/dataview';
import { TabViewModule } from 'primeng/tabview';

@Component({
  standalone: true,
  selector: 'gif-list-viewer',
  templateUrl: './gif-list-viewer.component.html',
  styleUrls: ['./gif-list-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TabViewModule, CommonModule, AccordionModule, DataViewModule, ProgressSpinnerModule]
})
export class GifListViewerComponent {
  public trendingGifs$!: Observable<Gif[]>;
  public searchGifs$!: Observable<Gif[]>;
  public activeIndex: number = 0;
  public isSearching$!: Observable<boolean>;
  public isDarkMode$!: Observable<boolean>;
  public pTabPanel0DOM: any;
  public pTabPanel1DOM: any;

  constructor(private trendingGiphyService: TrendingGiphyService,
    private searchGiphyService: SearchGiphyService,
    private themeService: ThemeService) {
    this.trendingGifs$ = this.trendingGiphyService.getTrendingGifsObs();
    this.searchGifs$ = this.searchGiphyService.getSearchGifsResultsObs();
    this.isSearching$ = this.searchGiphyService.getIsSearchingStatusObs().pipe(tap((value) => { if (value) this.activeIndex = 1; }));
    this.isDarkMode$ = this.themeService.getIsDarkThemeObservable();
  }

  public loadTrendingGifsLazy(): void {
    this.trendingGiphyService.fetchTrendingGifs();
  }

  public loadMoreGifsResultLazy(): void {
    this.searchGiphyService.loadMoreSearchGifsResults();
  }

  public onInfiniteScrollTrendingTab(event: any) {
    event.stopPropagation();
    let {
      scrollTop,
      scrollHeight,
      clientHeight
    } = event.target;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      if (!this.trendingGiphyService.isFetchingNewTrendingGifs) {
        this.loadTrendingGifsLazy();
      }
    }
  }

  public onInfiniteScrollSearchResultTab(event: any) {
    event.stopPropagation();
    let {
      scrollTop,
      scrollHeight,
      clientHeight
    } = event.target;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      if (!this.searchGiphyService.isFetchingGifsResults) {
        this.loadMoreGifsResultLazy();
      }
    }
  }
}
