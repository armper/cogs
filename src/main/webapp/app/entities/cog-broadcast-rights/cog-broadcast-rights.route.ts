import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CogBroadcastRights } from 'app/shared/model/cog-broadcast-rights.model';
import { CogBroadcastRightsService } from './cog-broadcast-rights.service';
import { CogBroadcastRightsComponent } from './cog-broadcast-rights.component';
import { CogBroadcastRightsDetailComponent } from './cog-broadcast-rights-detail.component';
import { CogBroadcastRightsUpdateComponent } from './cog-broadcast-rights-update.component';
import { ICogBroadcastRights } from 'app/shared/model/cog-broadcast-rights.model';

@Injectable({ providedIn: 'root' })
export class CogBroadcastRightsResolve implements Resolve<ICogBroadcastRights> {
  constructor(private service: CogBroadcastRightsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICogBroadcastRights> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((cogBroadcastRights: HttpResponse<CogBroadcastRights>) => cogBroadcastRights.body));
    }
    return of(new CogBroadcastRights());
  }
}

export const cogBroadcastRightsRoute: Routes = [
  {
    path: '',
    component: CogBroadcastRightsComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CogBroadcastRights'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CogBroadcastRightsDetailComponent,
    resolve: {
      cogBroadcastRights: CogBroadcastRightsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CogBroadcastRights'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CogBroadcastRightsUpdateComponent,
    resolve: {
      cogBroadcastRights: CogBroadcastRightsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CogBroadcastRights'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CogBroadcastRightsUpdateComponent,
    resolve: {
      cogBroadcastRights: CogBroadcastRightsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CogBroadcastRights'
    },
    canActivate: [UserRouteAccessService]
  }
];
