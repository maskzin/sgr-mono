import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DetailReceptionComponent } from './list/detail-reception.component';
import { DetailReceptionDetailComponent } from './detail/detail-reception-detail.component';
import { DetailReceptionUpdateComponent } from './update/detail-reception-update.component';
import { DetailReceptionDeleteDialogComponent } from './delete/detail-reception-delete-dialog.component';
import { DetailReceptionRoutingModule } from './route/detail-reception-routing.module';

@NgModule({
  imports: [SharedModule, DetailReceptionRoutingModule],
  declarations: [
    DetailReceptionComponent,
    DetailReceptionDetailComponent,
    DetailReceptionUpdateComponent,
    DetailReceptionDeleteDialogComponent,
  ],
  entryComponents: [DetailReceptionDeleteDialogComponent],
})
export class DetailReceptionModule {}
