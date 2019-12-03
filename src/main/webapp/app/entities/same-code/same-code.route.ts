import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SameCode } from 'app/shared/model/same-code.model';
import { SameCodeService } from './same-code.service';
import { SameCodeComponent } from './same-code.component';
import { SameCodeDetailComponent } from './same-code-detail.component';
import { SameCodeUpdateComponent } from './same-code-update.component';
import { ISameCode } from 'app/shared/model/same-code.model';

@Injectable({ providedIn: 'root' })
export class SameCodeResolve implements Resolve<ISameCode> {
  constructor(private service: SameCodeService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISameCode> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((sameCode: HttpResponse<SameCode>) => sameCode.body));
    }
    return of(new SameCode());
  }
}

export const sameCodeRoute: Routes = [
  {
    path: '',
    component: SameCodeComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SameCodes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SameCodeDetailComponent,
    resolve: {
      sameCode: SameCodeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SameCodes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SameCodeUpdateComponent,
    resolve: {
      sameCode: SameCodeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SameCodes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SameCodeUpdateComponent,
    resolve: {
      sameCode: SameCodeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SameCodes'
    },
    canActivate: [UserRouteAccessService]
  }
];
