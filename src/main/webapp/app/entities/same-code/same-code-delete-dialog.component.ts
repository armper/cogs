import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISameCode } from 'app/shared/model/same-code.model';
import { SameCodeService } from './same-code.service';

@Component({
  templateUrl: './same-code-delete-dialog.component.html'
})
export class SameCodeDeleteDialogComponent {
  sameCode: ISameCode;

  constructor(protected sameCodeService: SameCodeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.sameCodeService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'sameCodeListModification',
        content: 'Deleted an sameCode'
      });
      this.activeModal.dismiss(true);
    });
  }
}
