import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  public isDarkTheme$: Observable<boolean> = EMPTY;

  constructor(private router: Router, private themeService: ThemeService) {
    this.isDarkTheme$ = this.themeService.getIsDarkThemeObservable();
  }

  // Navigate to page /explorer
  public onClickExploreNow(): void {
    this.router.navigate(['explorer']);
  }

  // Generate classes base on current theme mode
  public dynamicCustomCardClassesGenerator(isDarkTheme: boolean | null): string {
    let baseClasses = "container mx-auto py-40 pl-16 backdrop-blur-sm shadow-md";
    if (isDarkTheme) {
      return `${baseClasses} home-custom-card--dark`;
    }
    return `${baseClasses} home-custom-card--light`;
  }
}
