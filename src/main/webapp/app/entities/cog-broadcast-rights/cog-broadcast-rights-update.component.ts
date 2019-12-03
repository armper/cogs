import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ICogBroadcastRights, CogBroadcastRights } from 'app/shared/model/cog-broadcast-rights.model';
import { CogBroadcastRightsService } from './cog-broadcast-rights.service';

@Component({
  selector: 'jhi-cog-broadcast-rights-update',
  templateUrl: './cog-broadcast-rights-update.component.html'
})
export class CogBroadcastRightsUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    cogId: []
  });

  constructor(
    protected cogBroadcastRightsService: CogBroadcastRightsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ cogBroadcastRights }) => {
      this.updateForm(cogBroadcastRights);
    });
  }

  updateForm(cogBroadcastRights: ICogBroadcastRights) {
    this.editForm.patchValue({
      id: cogBroadcastRights.id,
      cogId: cogBroadcastRights.cogId
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
      cogId: this.editForm.get(['cogId']).value
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
}
