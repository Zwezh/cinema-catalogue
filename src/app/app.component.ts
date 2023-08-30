import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '@appLayout';

import { filter } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import { SettingsActionsService, SettingsStateService } from './features/settings';

@Component({
  selector: 'cc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterModule, HeaderComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  #settingsActionService = inject(SettingsActionsService);
  #settingsStateService = inject(SettingsStateService);
  #translateService = inject(TranslateService);
  #destroyRef = inject(DestroyRef);
  ngOnInit(): void {
    this.#settingsActionService.loadData();
    this.#settingsStateService
      .select(({ settings }) => settings?.language)
      .pipe(takeUntilDestroyed(this.#destroyRef), filter(Boolean))
      .subscribe((language) => this.#translateService.use(language));
  }
}
