import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService]
})
export class AppComponent implements OnInit {
  public title = 'giphy-explorer';

  constructor(private primengConfig: PrimeNGConfig) {}

  public ngOnInit(): void {
    this.primengConfig.ripple = false;
  }
}
