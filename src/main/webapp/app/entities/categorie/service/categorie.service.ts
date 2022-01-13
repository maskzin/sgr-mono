import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICategorie, getCategorieIdentifier } from '../categorie.model';

export type EntityResponseType = HttpResponse<ICategorie>;
export type EntityArrayResponseType = HttpResponse<ICategorie[]>;

@Injectable({ providedIn: 'root' })
export class CategorieService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/categories');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(categorie: ICategorie): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(categorie);
    return this.http
      .post<ICategorie>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(categorie: ICategorie): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(categorie);
    return this.http
      .put<ICategorie>(`${this.resourceUrl}/${getCategorieIdentifier(categorie) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(categorie: ICategorie): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(categorie);
    return this.http
      .patch<ICategorie>(`${this.resourceUrl}/${getCategorieIdentifier(categorie) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICategorie>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICategorie[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCategorieToCollectionIfMissing(
    categorieCollection: ICategorie[],
    ...categoriesToCheck: (ICategorie | null | undefined)[]
  ): ICategorie[] {
    const categories: ICategorie[] = categoriesToCheck.filter(isPresent);
    if (categories.length > 0) {
      const categorieCollectionIdentifiers = categorieCollection.map(categorieItem => getCategorieIdentifier(categorieItem)!);
      const categoriesToAdd = categories.filter(categorieItem => {
        const categorieIdentifier = getCategorieIdentifier(categorieItem);
        if (categorieIdentifier == null || categorieCollectionIdentifiers.includes(categorieIdentifier)) {
          return false;
        }
        categorieCollectionIdentifiers.push(categorieIdentifier);
        return true;
      });
      return [...categoriesToAdd, ...categorieCollection];
    }
    return categorieCollection;
  }

  protected convertDateFromClient(categorie: ICategorie): ICategorie {
    return Object.assign({}, categorie, {
      createdAt: categorie.createdAt?.isValid() ? categorie.createdAt.format(DATE_FORMAT) : undefined,
      updateAt: categorie.updateAt?.isValid() ? categorie.updateAt.format(DATE_FORMAT) : undefined,
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
      res.body.forEach((categorie: ICategorie) => {
        categorie.createdAt = categorie.createdAt ? dayjs(categorie.createdAt) : undefined;
        categorie.updateAt = categorie.updateAt ? dayjs(categorie.updateAt) : undefined;
      });
    }
    return res;
  }
}
