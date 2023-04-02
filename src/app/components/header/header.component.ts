import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { EMPTY, Observable } from 'rxjs';
import { map, filter, shareReplay } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { RouterModule } from '@angular/router';

// PirmeNG module
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardModule, ButtonModule, CommonModule, RouterModule, ImageModule],
})
export class HeaderComponent {
  public isDarkTheme$: Observable<boolean> = EMPTY;
  public routerChanged$: Observable<string> = EMPTY;

  constructor(private themeService: ThemeService, private router: Router) {
    this.isDarkTheme$ = this.themeService.getIsDarkThemeObservable();
    this.routerChanged$ = this.router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => (e.url)),
      shareReplay({ bufferSize: 1, refCount: true }));
  }

  // Change theme mode
  public onClickChangeTheme(): void {
    this.themeService.switchTheme();
  }

  // Navigate to homepage when click on page logo
  public onCLickPageLogo(): void {
    this.router.navigate(['home']);
  }
}
