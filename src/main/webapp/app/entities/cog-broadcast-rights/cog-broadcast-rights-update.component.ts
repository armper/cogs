import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { ICogBroadcastRights, CogBroadcastRights } from 'app/shared/model/cog-broadcast-rights.model';
import { CogBroadcastRightsService } from './cog-broadcast-rights.service';
import { ISameCode } from 'app/shared/model/same-code.model';
import { SameCodeService } from 'app/entities/same-code/same-code.service';

@Component({
  selector: 'jhi-cog-broadcast-rights-update',
  templateUrl: './cog-broadcast-rights-update.component.html'
})
export class CogBroadcastRightsUpdateComponent implements OnInit {
  isSaving: boolean;

  samecodes: ISameCode[];

  editForm = this.fb.group({
    id: [],
    cogId: [],
    sameCodes: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected cogBroadcastRightsService: CogBroadcastRightsService,
    protected sameCodeService: SameCodeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ cogBroadcastRights }) => {
      this.updateForm(cogBroadcastRights);
    });
    this.sameCodeService
      .query()
      .subscribe((res: HttpResponse<ISameCode[]>) => (this.samecodes = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(cogBroadcastRights: ICogBroadcastRights) {
    this.editForm.patchValue({
      id: cogBroadcastRights.id,
      cogId: cogBroadcastRights.cogId,
      sameCodes: cogBroadcastRights.sameCodes
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const cogBroadcastRights = this.createFromForm();
    if (cogBroadcastRights.id !== undefined) {
      this.subscribeToSaveResponse(this.cogBroadcastRightsService.update(cogBroadcastRights));
    } else {
      this.subscribeToSaveResponse(this.cogBroadcastRightsService.create(cogBroadcastRights));
    }
  }

  private createFromForm(): ICogBroadcastRights {
    return {
      ...new CogBroadcastRights(),
      id: this.editForm.get(['id']).value,
      cogId: this.editForm.get(['cogId']).value,
      sameCodes: this.editForm.get(['sameCodes']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICogBroadcastRights>>) {
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

  trackSameCodeById(index: number, item: ISameCode) {
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
