import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { ISameCode, SameCode } from 'app/shared/model/same-code.model';
import { SameCodeService } from './same-code.service';
import { ICogBroadcastRights } from 'app/shared/model/cog-broadcast-rights.model';
import { CogBroadcastRightsService } from 'app/entities/cog-broadcast-rights/cog-broadcast-rights.service';

@Component({
  selector: 'jhi-same-code-update',
  templateUrl: './same-code-update.component.html'
})
export class SameCodeUpdateComponent implements OnInit {
  isSaving: boolean;

  cogbroadcastrights: ICogBroadcastRights[];

  editForm = this.fb.group({
    id: [],
    sameCode: [],
    cogBroadcastRights: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected sameCodeService: SameCodeService,
    protected cogBroadcastRightsService: CogBroadcastRightsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ sameCode }) => {
      this.updateForm(sameCode);
    });
    this.cogBroadcastRightsService
      .query()
      .subscribe(
        (res: HttpResponse<ICogBroadcastRights[]>) => (this.cogbroadcastrights = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(sameCode: ISameCode) {
    this.editForm.patchValue({
      id: sameCode.id,
      sameCode: sameCode.sameCode,
      cogBroadcastRights: sameCode.cogBroadcastRights
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const sameCode = this.createFromForm();
    if (sameCode.id !== undefined) {
      this.subscribeToSaveResponse(this.sameCodeService.update(sameCode));
    } else {
      this.subscribeToSaveResponse(this.sameCodeService.create(sameCode));
    }
  }

  private createFromForm(): ISameCode {
    return {
      ...new SameCode(),
      id: this.editForm.get(['id']).value,
      sameCode: this.editForm.get(['sameCode']).value,
      cogBroadcastRights: this.editForm.get(['cogBroadcastRights']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISameCode>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackCogBroadcastRightsById(index: number, item: ICogBroadcastRights) {
    return item.id;
  }

  getSelected(selectedVals: any[], option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
