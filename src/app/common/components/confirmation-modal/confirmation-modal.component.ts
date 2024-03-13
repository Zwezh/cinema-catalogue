import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmationModalData } from './confirmation-modal-input.type';

@Component({
  selector: 'cc-confirmation-modal',
  standalone: true,
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationModalComponent {
  @Input() data: ConfirmationModalData;
  activeModal = inject(NgbActiveModal);
}
