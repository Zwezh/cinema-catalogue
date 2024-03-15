import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IsAuthenticatedDirective } from '@appDirectives';
import { AuthService } from '@appServices';

import { take } from 'rxjs';

import { NgbCollapse, NgbModal, NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { LanguageBarComponent } from '../language-bar';
import { LoadingBarComponent } from '../loading-bar';
import { LogoComponent } from '../logo';

@Component({
  selector: 'cc-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    RouterLink,
    RouterLinkActive,
    TranslateModule,
    NgOptimizedImage,
    LogoComponent,
    LoadingBarComponent,
    NgbNav,
    NgbCollapse,
    IsAuthenticatedDirective,
    LanguageBarComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  isNavbarCollapsed = signal(true);
  #modalService = inject(NgbModal);
  #authService = inject(AuthService);

  onToggleCollapse(): void {
    this.isNavbarCollapsed.update((value) => !value);
  }

  async onSignIn(): Promise<void> {
    const authModalComponent = await import('../auth-modal').then(({ AuthModalComponent }) => AuthModalComponent);
    this.#modalService
      .open(authModalComponent)
      .closed.pipe(take(1))
      .subscribe((res) => this.#authService.authenticate(res));
  }

  onSignOut(): void {
    this.#authService.signOut();
  }
}
