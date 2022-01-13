import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DetailReceptionComponent } from '../list/detail-reception.component';
import { DetailReceptionDetailComponent } from '../detail/detail-reception-detail.component';
import { DetailReceptionUpdateComponent } from '../update/detail-reception-update.component';
import { DetailReceptionRoutingResolveService } from './detail-reception-routing-resolve.service';

const detailReceptionRoute: Routes = [
  {
    path: '',
    component: DetailReceptionComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DetailReceptionDetailComponent,
    resolve: {
      detailReception: DetailReceptionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DetailReceptionUpdateComponent,
    resolve: {
      detailReception: DetailReceptionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DetailReceptionUpdateComponent,
    resolve: {
      detailReception: DetailReceptionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(detailReceptionRoute)],
  exports: [RouterModule],
})
export class DetailReceptionRoutingModule {}
