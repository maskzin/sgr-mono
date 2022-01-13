import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IArticle, Article } from '../article.model';

import { ArticleService } from './article.service';

describe('Article Service', () => {
  let service: ArticleService;
  let httpMock: HttpTestingController;
  let elemDefault: IArticle;
  let expectedResult: IArticle | IArticle[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ArticleService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      libelleArticle: 'AAAAAAA',
      stock: 'AAAAAAA',
      createdAt: currentDate,
      updateAt: currentDate,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          createdAt: currentDate.format(DATE_FORMAT),
          updateAt: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Article', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          createdAt: currentDate.format(DATE_FORMAT),
          updateAt: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          createdAt: currentDate,
          updateAt: currentDate,
        },
        returnedFromService
      );

      service.create(new Article()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Article', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          libelleArticle: 'BBBBBB',
          stock: 'BBBBBB',
          createdAt: currentDate.format(DATE_FORMAT),
          updateAt: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          createdAt: currentDate,
          updateAt: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Article', () => {
      const patchObject = Object.assign(
        {
          stock: 'BBBBBB',
          updateAt: currentDate.format(DATE_FORMAT),
        },
        new Article()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          createdAt: currentDate,
          updateAt: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Article', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          libelleArticle: 'BBBBBB',
          stock: 'BBBBBB',
          createdAt: currentDate.format(DATE_FORMAT),
          updateAt: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          createdAt: currentDate,
          updateAt: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Article', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addArticleToCollectionIfMissing', () => {
      it('should add a Article to an empty array', () => {
        const article: IArticle = { id: 123 };
        expectedResult = service.addArticleToCollectionIfMissing([], article);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(article);
      });

      it('should not add a Article to an array that contains it', () => {
        const article: IArticle = { id: 123 };
        const articleCollection: IArticle[] = [
          {
            ...article,
          },
          { id: 456 },
        ];
        expectedResult = service.addArticleToCollectionIfMissing(articleCollection, article);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Article to an array that doesn't contain it", () => {
        const article: IArticle = { id: 123 };
        const articleCollection: IArticle[] = [{ id: 456 }];
        expectedResult = service.addArticleToCollectionIfMissing(articleCollection, article);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(article);
      });

      it('should add only unique Article to an array', () => {
        const articleArray: IArticle[] = [{ id: 123 }, { id: 456 }, { id: 36266 }];
        const articleCollection: IArticle[] = [{ id: 123 }];
        expectedResult = service.addArticleToCollectionIfMissing(articleCollection, ...articleArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const article: IArticle = { id: 123 };
        const article2: IArticle = { id: 456 };
        expectedResult = service.addArticleToCollectionIfMissing([], article, article2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(article);
        expect(expectedResult).toContain(article2);
      });

      it('should accept null and undefined values', () => {
        const article: IArticle = { id: 123 };
        expectedResult = service.addArticleToCollectionIfMissing([], null, article, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(article);
      });

      it('should return initial array if no Article is added', () => {
        const articleCollection: IArticle[] = [{ id: 123 }];
        expectedResult = service.addArticleToCollectionIfMissing(articleCollection, undefined, null);
        expect(expectedResult).toEqual(articleCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
