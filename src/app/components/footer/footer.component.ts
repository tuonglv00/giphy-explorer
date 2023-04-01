import { ChangeDetectionStrategy, Component } from '@angular/core';

// PrimeNG module
import { CardModule } from 'primeng/card';

@Component({
  standalone: true,
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardModule]
})
export class FooterComponent {

}
