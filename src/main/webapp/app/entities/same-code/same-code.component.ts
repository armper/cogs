import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISameCode } from 'app/shared/model/same-code.model';
import { SameCodeService } from './same-code.service';
import { SameCodeDeleteDialogComponent } from './same-code-delete-dialog.component';

@Component({
  selector: 'jhi-same-code',
  templateUrl: './same-code.component.html'
})
export class SameCodeComponent implements OnInit, OnDestroy {
  sameCodes: ISameCode[];
  eventSubscriber: Subscription;

  constructor(protected sameCodeService: SameCodeService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.sameCodeService.query().subscribe((res: HttpResponse<ISameCode[]>) => {
      this.sameCodes = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInSameCodes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISameCode) {
    return item.id;
  }

  registerChangeInSameCodes() {
    this.eventSubscriber = this.eventManager.subscribe('sameCodeListModification', () => this.loadAll());
  }

  delete(sameCode: ISameCode) {
    const modalRef = this.modalService.open(SameCodeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.sameCode = sameCode;
  }
}
