import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAffectation, getAffectationIdentifier } from '../affectation.model';

export type EntityResponseType = HttpResponse<IAffectation>;
export type EntityArrayResponseType = HttpResponse<IAffectation[]>;

@Injectable({ providedIn: 'root' })
export class AffectationService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/affectations');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(affectation: IAffectation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(affectation);
    return this.http
      .post<IAffectation>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(affectation: IAffectation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(affectation);
    return this.http
      .put<IAffectation>(`${this.resourceUrl}/${getAffectationIdentifier(affectation) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(affectation: IAffectation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(affectation);
    return this.http
      .patch<IAffectation>(`${this.resourceUrl}/${getAffectationIdentifier(affectation) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAffectation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAffectation[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addAffectationToCollectionIfMissing(
    affectationCollection: IAffectation[],
    ...affectationsToCheck: (IAffectation | null | undefined)[]
  ): IAffectation[] {
    const affectations: IAffectation[] = affectationsToCheck.filter(isPresent);
    if (affectations.length > 0) {
      const affectationCollectionIdentifiers = affectationCollection.map(affectationItem => getAffectationIdentifier(affectationItem)!);
      const affectationsToAdd = affectations.filter(affectationItem => {
        const affectationIdentifier = getAffectationIdentifier(affectationItem);
        if (affectationIdentifier == null || affectationCollectionIdentifiers.includes(affectationIdentifier)) {
          return false;
        }
        affectationCollectionIdentifiers.push(affectationIdentifier);
        return true;
      });
      return [...affectationsToAdd, ...affectationCollection];
    }
    return affectationCollection;
  }

  protected convertDateFromClient(affectation: IAffectation): IAffectation {
    return Object.assign({}, affectation, {
      dateAffectation: affectation.dateAffectation?.isValid() ? affectation.dateAffectation.format(DATE_FORMAT) : undefined,
      createdAt: affectation.createdAt?.isValid() ? affectation.createdAt.format(DATE_FORMAT) : undefined,
      updateAt: affectation.updateAt?.isValid() ? affectation.updateAt.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateAffectation = res.body.dateAffectation ? dayjs(res.body.dateAffectation) : undefined;
      res.body.createdAt = res.body.createdAt ? dayjs(res.body.createdAt) : undefined;
      res.body.updateAt = res.body.updateAt ? dayjs(res.body.updateAt) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((affectation: IAffectation) => {
        affectation.dateAffectation = affectation.dateAffectation ? dayjs(affectation.dateAffectation) : undefined;
        affectation.createdAt = affectation.createdAt ? dayjs(affectation.createdAt) : undefined;
        affectation.updateAt = affectation.updateAt ? dayjs(affectation.updateAt) : undefined;
      });
    }
    return res;
  }
}
