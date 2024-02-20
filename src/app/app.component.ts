import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent, ToastsComponent } from '@appLayout';

import { TranslateService } from '@ngx-translate/core';

import { SettingsEffects, SettingsState, SettingsStore } from './features/settings';

@Component({
  selector: 'cc-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, HeaderComponent, ToastsComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  #translateService = inject(TranslateService);
  #settingsStore = inject(SettingsStore);

  constructor() {
    inject(SettingsEffects).load();
    effect(() => {
      const settings = this.#settingsStore.select((state: SettingsState) => state.settings);
      if (settings()?.language) {
        this.#translateService.use(settings()?.language);
      }
    });
  }
}
