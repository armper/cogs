import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISameCode } from 'app/shared/model/same-code.model';

@Component({
  selector: 'jhi-same-code-detail',
  templateUrl: './same-code-detail.component.html'
})
export class SameCodeDetailComponent implements OnInit {
  sameCode: ISameCode;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ sameCode }) => {
      this.sameCode = sameCode;
    });
  }

  previousState() {
    window.history.back();
  }
}
