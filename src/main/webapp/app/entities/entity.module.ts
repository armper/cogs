import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'cog-broadcast-rights',
        loadChildren: () => import('./cog-broadcast-rights/cog-broadcast-rights.module').then(m => m.CogsCogBroadcastRightsModule)
      },
      {
        path: 'same-code',
        loadChildren: () => import('./same-code/same-code.module').then(m => m.CogsSameCodeModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class CogsEntityModule {}
