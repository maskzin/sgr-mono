import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDetailReception, DetailReception } from '../detail-reception.model';

import { DetailReceptionService } from './detail-reception.service';

describe('DetailReception Service', () => {
  let service: DetailReceptionService;
  let httpMock: HttpTestingController;
  let elemDefault: IDetailReception;
  let expectedResult: IDetailReception | IDetailReception[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DetailReceptionService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      caracteristique: 'AAAAAAA',
      quantiteArticle: 0,
      numeroSerie: 'AAAAAAA',
      status: 0,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a DetailReception', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new DetailReception()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DetailReception', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          caracteristique: 'BBBBBB',
          quantiteArticle: 1,
          numeroSerie: 'BBBBBB',
          status: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DetailReception', () => {
      const patchObject = Object.assign(
        {
          caracteristique: 'BBBBBB',
          quantiteArticle: 1,
          numeroSerie: 'BBBBBB',
          status: 1,
        },
        new DetailReception()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DetailReception', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          caracteristique: 'BBBBBB',
          quantiteArticle: 1,
          numeroSerie: 'BBBBBB',
          status: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a DetailReception', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addDetailReceptionToCollectionIfMissing', () => {
      it('should add a DetailReception to an empty array', () => {
        const detailReception: IDetailReception = { id: 123 };
        expectedResult = service.addDetailReceptionToCollectionIfMissing([], detailReception);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(detailReception);
      });

      it('should not add a DetailReception to an array that contains it', () => {
        const detailReception: IDetailReception = { id: 123 };
        const detailReceptionCollection: IDetailReception[] = [
          {
            ...detailReception,
          },
          { id: 456 },
        ];
        expectedResult = service.addDetailReceptionToCollectionIfMissing(detailReceptionCollection, detailReception);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DetailReception to an array that doesn't contain it", () => {
        const detailReception: IDetailReception = { id: 123 };
        const detailReceptionCollection: IDetailReception[] = [{ id: 456 }];
        expectedResult = service.addDetailReceptionToCollectionIfMissing(detailReceptionCollection, detailReception);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(detailReception);
      });

      it('should add only unique DetailReception to an array', () => {
        const detailReceptionArray: IDetailReception[] = [{ id: 123 }, { id: 456 }, { id: 8851 }];
        const detailReceptionCollection: IDetailReception[] = [{ id: 123 }];
        expectedResult = service.addDetailReceptionToCollectionIfMissing(detailReceptionCollection, ...detailReceptionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const detailReception: IDetailReception = { id: 123 };
        const detailReception2: IDetailReception = { id: 456 };
        expectedResult = service.addDetailReceptionToCollectionIfMissing([], detailReception, detailReception2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(detailReception);
        expect(expectedResult).toContain(detailReception2);
      });

      it('should accept null and undefined values', () => {
        const detailReception: IDetailReception = { id: 123 };
        expectedResult = service.addDetailReceptionToCollectionIfMissing([], null, detailReception, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(detailReception);
      });

      it('should return initial array if no DetailReception is added', () => {
        const detailReceptionCollection: IDetailReception[] = [{ id: 123 }];
        expectedResult = service.addDetailReceptionToCollectionIfMissing(detailReceptionCollection, undefined, null);
        expect(expectedResult).toEqual(detailReceptionCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
