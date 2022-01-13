import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IReception, getReceptionIdentifier } from '../reception.model';

export type EntityResponseType = HttpResponse<IReception>;
export type EntityArrayResponseType = HttpResponse<IReception[]>;

@Injectable({ providedIn: 'root' })
export class ReceptionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/receptions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(reception: IReception): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reception);
    return this.http
      .post<IReception>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(reception: IReception): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reception);
    return this.http
      .put<IReception>(`${this.resourceUrl}/${getReceptionIdentifier(reception) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(reception: IReception): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reception);
    return this.http
      .patch<IReception>(`${this.resourceUrl}/${getReceptionIdentifier(reception) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IReception>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IReception[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addReceptionToCollectionIfMissing(
    receptionCollection: IReception[],
    ...receptionsToCheck: (IReception | null | undefined)[]
  ): IReception[] {
    const receptions: IReception[] = receptionsToCheck.filter(isPresent);
    if (receptions.length > 0) {
      const receptionCollectionIdentifiers = receptionCollection.map(receptionItem => getReceptionIdentifier(receptionItem)!);
      const receptionsToAdd = receptions.filter(receptionItem => {
        const receptionIdentifier = getReceptionIdentifier(receptionItem);
        if (receptionIdentifier == null || receptionCollectionIdentifiers.includes(receptionIdentifier)) {
          return false;
        }
        receptionCollectionIdentifiers.push(receptionIdentifier);
        return true;
      });
      return [...receptionsToAdd, ...receptionCollection];
    }
    return receptionCollection;
  }

  protected convertDateFromClient(reception: IReception): IReception {
    return Object.assign({}, reception, {
      dateContrat: reception.dateContrat?.isValid() ? reception.dateContrat.format(DATE_FORMAT) : undefined,
      dateReception: reception.dateReception?.isValid() ? reception.dateReception.format(DATE_FORMAT) : undefined,
      createdAt: reception.createdAt?.isValid() ? reception.createdAt.format(DATE_FORMAT) : undefined,
      updateAt: reception.updateAt?.isValid() ? reception.updateAt.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateContrat = res.body.dateContrat ? dayjs(res.body.dateContrat) : undefined;
      res.body.dateReception = res.body.dateReception ? dayjs(res.body.dateReception) : undefined;
      res.body.createdAt = res.body.createdAt ? dayjs(res.body.createdAt) : undefined;
      res.body.updateAt = res.body.updateAt ? dayjs(res.body.updateAt) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((reception: IReception) => {
        reception.dateContrat = reception.dateContrat ? dayjs(reception.dateContrat) : undefined;
        reception.dateReception = reception.dateReception ? dayjs(reception.dateReception) : undefined;
        reception.createdAt = reception.createdAt ? dayjs(reception.createdAt) : undefined;
        reception.updateAt = reception.updateAt ? dayjs(reception.updateAt) : undefined;
      });
    }
    return res;
  }
}
