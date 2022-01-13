import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDetailReception, DetailReception } from '../detail-reception.model';
import { DetailReceptionService } from '../service/detail-reception.service';

@Injectable({ providedIn: 'root' })
export class DetailReceptionRoutingResolveService implements Resolve<IDetailReception> {
  constructor(protected service: DetailReceptionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDetailReception> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((detailReception: HttpResponse<DetailReception>) => {
          if (detailReception.body) {
            return of(detailReception.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DetailReception());
  }
}
