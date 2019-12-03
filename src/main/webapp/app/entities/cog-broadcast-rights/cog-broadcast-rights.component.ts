import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICogBroadcastRights } from 'app/shared/model/cog-broadcast-rights.model';
import { CogBroadcastRightsService } from './cog-broadcast-rights.service';
import { CogBroadcastRightsDeleteDialogComponent } from './cog-broadcast-rights-delete-dialog.component';

@Component({
  selector: 'jhi-cog-broadcast-rights',
  templateUrl: './cog-broadcast-rights.component.html'
})
export class CogBroadcastRightsComponent implements OnInit, OnDestroy {
  cogBroadcastRights: ICogBroadcastRights[];
  eventSubscriber: Subscription;

  constructor(
    protected cogBroadcastRightsService: CogBroadcastRightsService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll() {
    this.cogBroadcastRightsService.query().subscribe((res: HttpResponse<ICogBroadcastRights[]>) => {
      this.cogBroadcastRights = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInCogBroadcastRights();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICogBroadcastRights) {
    return item.id;
  }

  registerChangeInCogBroadcastRights() {
    this.eventSubscriber = this.eventManager.subscribe('cogBroadcastRightsListModification', () => this.loadAll());
  }

  delete(cogBroadcastRights: ICogBroadcastRights) {
    const modalRef = this.modalService.open(CogBroadcastRightsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cogBroadcastRights = cogBroadcastRights;
  }
}
