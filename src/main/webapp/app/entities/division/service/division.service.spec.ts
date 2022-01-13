import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IDivision, Division } from '../division.model';

import { DivisionService } from './division.service';

describe('Division Service', () => {
  let service: DivisionService;
  let httpMock: HttpTestingController;
  let elemDefault: IDivision;
  let expectedResult: IDivision | IDivision[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DivisionService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      nom: 'AAAAAAA',
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

    it('should create a Division', () => {
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

      service.create(new Division()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Division', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nom: 'BBBBBB',
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

    it('should partial update a Division', () => {
      const patchObject = Object.assign(
        {
          updateAt: currentDate.format(DATE_FORMAT),
        },
        new Division()
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

    it('should return a list of Division', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nom: 'BBBBBB',
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

    it('should delete a Division', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addDivisionToCollectionIfMissing', () => {
      it('should add a Division to an empty array', () => {
        const division: IDivision = { id: 123 };
        expectedResult = service.addDivisionToCollectionIfMissing([], division);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(division);
      });

      it('should not add a Division to an array that contains it', () => {
        const division: IDivision = { id: 123 };
        const divisionCollection: IDivision[] = [
          {
            ...division,
          },
          { id: 456 },
        ];
        expectedResult = service.addDivisionToCollectionIfMissing(divisionCollection, division);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Division to an array that doesn't contain it", () => {
        const division: IDivision = { id: 123 };
        const divisionCollection: IDivision[] = [{ id: 456 }];
        expectedResult = service.addDivisionToCollectionIfMissing(divisionCollection, division);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(division);
      });

      it('should add only unique Division to an array', () => {
        const divisionArray: IDivision[] = [{ id: 123 }, { id: 456 }, { id: 73619 }];
        const divisionCollection: IDivision[] = [{ id: 123 }];
        expectedResult = service.addDivisionToCollectionIfMissing(divisionCollection, ...divisionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const division: IDivision = { id: 123 };
        const division2: IDivision = { id: 456 };
        expectedResult = service.addDivisionToCollectionIfMissing([], division, division2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(division);
        expect(expectedResult).toContain(division2);
      });

      it('should accept null and undefined values', () => {
        const division: IDivision = { id: 123 };
        expectedResult = service.addDivisionToCollectionIfMissing([], null, division, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(division);
      });

      it('should return initial array if no Division is added', () => {
        const divisionCollection: IDivision[] = [{ id: 123 }];
        expectedResult = service.addDivisionToCollectionIfMissing(divisionCollection, undefined, null);
        expect(expectedResult).toEqual(divisionCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
