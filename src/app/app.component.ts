import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent, ToastsComponent } from '@appLayout';

import { SettingsEffects } from './features/settings';

@Component({
  selector: 'cc-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, HeaderComponent, ToastsComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor() {
    inject(SettingsEffects).load();
  }
}
