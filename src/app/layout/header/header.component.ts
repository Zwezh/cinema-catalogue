import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { NgbCollapse, NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

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
    NgbCollapse
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  isNavbarCollapsed = signal(true);

  onToggleCollapse(): void {
    this.isNavbarCollapsed.update((value) => !value);
  }
}
