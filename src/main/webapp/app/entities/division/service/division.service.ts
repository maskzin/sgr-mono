import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDivision, getDivisionIdentifier } from '../division.model';

export type EntityResponseType = HttpResponse<IDivision>;
export type EntityArrayResponseType = HttpResponse<IDivision[]>;

@Injectable({ providedIn: 'root' })
export class DivisionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/divisions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(division: IDivision): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(division);
    return this.http
      .post<IDivision>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(division: IDivision): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(division);
    return this.http
      .put<IDivision>(`${this.resourceUrl}/${getDivisionIdentifier(division) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(division: IDivision): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(division);
    return this.http
      .patch<IDivision>(`${this.resourceUrl}/${getDivisionIdentifier(division) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDivision>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDivision[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addDivisionToCollectionIfMissing(divisionCollection: IDivision[], ...divisionsToCheck: (IDivision | null | undefined)[]): IDivision[] {
    const divisions: IDivision[] = divisionsToCheck.filter(isPresent);
    if (divisions.length > 0) {
      const divisionCollectionIdentifiers = divisionCollection.map(divisionItem => getDivisionIdentifier(divisionItem)!);
      const divisionsToAdd = divisions.filter(divisionItem => {
        const divisionIdentifier = getDivisionIdentifier(divisionItem);
        if (divisionIdentifier == null || divisionCollectionIdentifiers.includes(divisionIdentifier)) {
          return false;
        }
        divisionCollectionIdentifiers.push(divisionIdentifier);
        return true;
      });
      return [...divisionsToAdd, ...divisionCollection];
    }
    return divisionCollection;
  }

  protected convertDateFromClient(division: IDivision): IDivision {
    return Object.assign({}, division, {
      createdAt: division.createdAt?.isValid() ? division.createdAt.format(DATE_FORMAT) : undefined,
      updateAt: division.updateAt?.isValid() ? division.updateAt.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdAt = res.body.createdAt ? dayjs(res.body.createdAt) : undefined;
      res.body.updateAt = res.body.updateAt ? dayjs(res.body.updateAt) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((division: IDivision) => {
        division.createdAt = division.createdAt ? dayjs(division.createdAt) : undefined;
        division.updateAt = division.updateAt ? dayjs(division.updateAt) : undefined;
      });
    }
    return res;
  }
}
