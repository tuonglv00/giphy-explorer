import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, skip } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ThemeService implements OnDestroy {
  private isDarkTheme$ = new BehaviorSubject<boolean>(true);
  private destroy$: Subject<boolean> = new Subject<boolean>();

  private darkThemeName: string = 'soho-dark.css';
  private lightThemeName: string = 'soho-light.css';

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.isDarkTheme$.pipe(skip(1), takeUntil(this.destroy$)).subscribe((currentTheme: boolean) => {
      let themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;

      if (themeLink) {
        if (currentTheme) {
          // Switch to dark theme
          themeLink.href = this.darkThemeName;
          localStorage.setItem('themeMode', 'dark');
        } else {
          // Switch to light theme
          themeLink.href = this.lightThemeName;
          localStorage.setItem('themeMode', 'light');
        }
      }
    });

    let themeMode = localStorage.getItem('themeMode');
    if (themeMode === 'light') {
      this.isDarkTheme$.next(false);
    } else {
      this.isDarkTheme$.next(true);
    }
  }

  public switchTheme(): void {
    let tempCurrentTheme = this.isDarkTheme$.getValue();
    this.isDarkTheme$.next(!tempCurrentTheme);
  }

  public getIsDarkThemeObservable(): Observable<boolean> {
    return this.isDarkTheme$.pipe();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
