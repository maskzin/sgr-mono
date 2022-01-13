import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDetailReception, getDetailReceptionIdentifier } from '../detail-reception.model';

export type EntityResponseType = HttpResponse<IDetailReception>;
export type EntityArrayResponseType = HttpResponse<IDetailReception[]>;

@Injectable({ providedIn: 'root' })
export class DetailReceptionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/detail-receptions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(detailReception: IDetailReception): Observable<EntityResponseType> {
    return this.http.post<IDetailReception>(this.resourceUrl, detailReception, { observe: 'response' });
  }

  update(detailReception: IDetailReception): Observable<EntityResponseType> {
    return this.http.put<IDetailReception>(
      `${this.resourceUrl}/${getDetailReceptionIdentifier(detailReception) as number}`,
      detailReception,
      { observe: 'response' }
    );
  }

  partialUpdate(detailReception: IDetailReception): Observable<EntityResponseType> {
    return this.http.patch<IDetailReception>(
      `${this.resourceUrl}/${getDetailReceptionIdentifier(detailReception) as number}`,
      detailReception,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDetailReception>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDetailReception[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addDetailReceptionToCollectionIfMissing(
    detailReceptionCollection: IDetailReception[],
    ...detailReceptionsToCheck: (IDetailReception | null | undefined)[]
  ): IDetailReception[] {
    const detailReceptions: IDetailReception[] = detailReceptionsToCheck.filter(isPresent);
    if (detailReceptions.length > 0) {
      const detailReceptionCollectionIdentifiers = detailReceptionCollection.map(
        detailReceptionItem => getDetailReceptionIdentifier(detailReceptionItem)!
      );
      const detailReceptionsToAdd = detailReceptions.filter(detailReceptionItem => {
        const detailReceptionIdentifier = getDetailReceptionIdentifier(detailReceptionItem);
        if (detailReceptionIdentifier == null || detailReceptionCollectionIdentifiers.includes(detailReceptionIdentifier)) {
          return false;
        }
        detailReceptionCollectionIdentifiers.push(detailReceptionIdentifier);
        return true;
      });
      return [...detailReceptionsToAdd, ...detailReceptionCollection];
    }
    return detailReceptionCollection;
  }
}
