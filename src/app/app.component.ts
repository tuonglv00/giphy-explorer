import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  public title = 'giphy-explorer';

  constructor(private primengConfig: PrimeNGConfig) {}

  public ngOnInit(): void {
    // Turn off the ripple effect when clicking button
    this.primengConfig.ripple = false;
  }
}
