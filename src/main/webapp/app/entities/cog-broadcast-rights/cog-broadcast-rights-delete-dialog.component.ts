import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICogBroadcastRights } from 'app/shared/model/cog-broadcast-rights.model';
import { CogBroadcastRightsService } from './cog-broadcast-rights.service';

@Component({
  templateUrl: './cog-broadcast-rights-delete-dialog.component.html'
})
export class CogBroadcastRightsDeleteDialogComponent {
  cogBroadcastRights: ICogBroadcastRights;

  constructor(
    protected cogBroadcastRightsService: CogBroadcastRightsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.cogBroadcastRightsService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'cogBroadcastRightsListModification',
        content: 'Deleted an cogBroadcastRights'
      });
      this.activeModal.dismiss(true);
    });
  }
}
