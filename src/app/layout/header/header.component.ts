import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'cc-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [RouterLink, RouterLinkActive, TranslateModule, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {}
