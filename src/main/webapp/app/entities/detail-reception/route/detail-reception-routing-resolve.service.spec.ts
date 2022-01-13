import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IDetailReception, DetailReception } from '../detail-reception.model';
import { DetailReceptionService } from '../service/detail-reception.service';

import { DetailReceptionRoutingResolveService } from './detail-reception-routing-resolve.service';

describe('DetailReception routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: DetailReceptionRoutingResolveService;
  let service: DetailReceptionService;
  let resultDetailReception: IDetailReception | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(DetailReceptionRoutingResolveService);
    service = TestBed.inject(DetailReceptionService);
    resultDetailReception = undefined;
  });

  describe('resolve', () => {
    it('should return IDetailReception returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultDetailReception = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultDetailReception).toEqual({ id: 123 });
    });

    it('should return new IDetailReception if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultDetailReception = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultDetailReception).toEqual(new DetailReception());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as DetailReception })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultDetailReception = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultDetailReception).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
