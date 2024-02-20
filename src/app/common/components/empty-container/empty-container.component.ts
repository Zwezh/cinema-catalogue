import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'cc-empty-container',
  standalone: true,
  templateUrl: './empty-container.component.html',
  imports: [NgbAlert],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyContainerComponent {}
