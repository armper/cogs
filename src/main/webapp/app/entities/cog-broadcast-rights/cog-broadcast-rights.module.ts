import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CogsSharedModule } from 'app/shared/shared.module';
import { CogBroadcastRightsComponent } from './cog-broadcast-rights.component';
import { CogBroadcastRightsDetailComponent } from './cog-broadcast-rights-detail.component';
import { CogBroadcastRightsUpdateComponent } from './cog-broadcast-rights-update.component';
import { CogBroadcastRightsDeleteDialogComponent } from './cog-broadcast-rights-delete-dialog.component';
import { cogBroadcastRightsRoute } from './cog-broadcast-rights.route';

@NgModule({
  imports: [CogsSharedModule, RouterModule.forChild(cogBroadcastRightsRoute)],
  declarations: [
    CogBroadcastRightsComponent,
    CogBroadcastRightsDetailComponent,
    CogBroadcastRightsUpdateComponent,
    CogBroadcastRightsDeleteDialogComponent
  ],
  entryComponents: [CogBroadcastRightsDeleteDialogComponent]
})
export class CogsCogBroadcastRightsModule {}
