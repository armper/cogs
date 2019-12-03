import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICogBroadcastRights } from 'app/shared/model/cog-broadcast-rights.model';

@Component({
  selector: 'jhi-cog-broadcast-rights-detail',
  templateUrl: './cog-broadcast-rights-detail.component.html'
})
export class CogBroadcastRightsDetailComponent implements OnInit {
  cogBroadcastRights: ICogBroadcastRights;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ cogBroadcastRights }) => {
      this.cogBroadcastRights = cogBroadcastRights;
    });
  }

  previousState() {
    window.history.back();
  }
}
