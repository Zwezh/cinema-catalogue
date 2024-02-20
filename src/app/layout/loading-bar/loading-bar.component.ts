import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { LoadingBarStore } from './store';

@Component({
  selector: 'cc-loading-bar',
  standalone: true,
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss'],
  imports: [NgbProgressbar, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingBarComponent {
  showing = inject(LoadingBarStore).loading;
}
