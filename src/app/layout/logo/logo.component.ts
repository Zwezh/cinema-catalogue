import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cc-logo',
  standalone: true,
  templateUrl: './logo.component.svg',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoComponent {}
