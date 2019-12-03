import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CogsSharedModule } from 'app/shared/shared.module';
import { SameCodeComponent } from './same-code.component';
import { SameCodeDetailComponent } from './same-code-detail.component';
import { SameCodeUpdateComponent } from './same-code-update.component';
import { SameCodeDeleteDialogComponent } from './same-code-delete-dialog.component';
import { sameCodeRoute } from './same-code.route';

@NgModule({
  imports: [CogsSharedModule, RouterModule.forChild(sameCodeRoute)],
  declarations: [SameCodeComponent, SameCodeDetailComponent, SameCodeUpdateComponent, SameCodeDeleteDialogComponent],
  entryComponents: [SameCodeDeleteDialogComponent]
})
export class CogsSameCodeModule {}
