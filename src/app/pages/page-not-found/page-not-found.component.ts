import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundComponent {
  public isDarkMode$: Observable<boolean>;

  constructor(private router: Router, private themeService: ThemeService) {
    this.isDarkMode$ = this.themeService.getIsDarkThemeObservable();
  }

  public onClickGoBackHomepage() {
    this.router.navigate(['/']);
  }

  public onClickExploreNow() {
    this.router.navigate(['/explorer']);
  }
}
