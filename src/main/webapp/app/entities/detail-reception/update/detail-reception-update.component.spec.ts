import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DetailReceptionService } from '../service/detail-reception.service';
import { IDetailReception, DetailReception } from '../detail-reception.model';
import { IReception } from 'app/entities/reception/reception.model';
import { ReceptionService } from 'app/entities/reception/service/reception.service';

import { DetailReceptionUpdateComponent } from './detail-reception-update.component';

describe('DetailReception Management Update Component', () => {
  let comp: DetailReceptionUpdateComponent;
  let fixture: ComponentFixture<DetailReceptionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let detailReceptionService: DetailReceptionService;
  let receptionService: ReceptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DetailReceptionUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(DetailReceptionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DetailReceptionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    detailReceptionService = TestBed.inject(DetailReceptionService);
    receptionService = TestBed.inject(ReceptionService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Reception query and add missing value', () => {
      const detailReception: IDetailReception = { id: 456 };
      const reception: IReception = { id: 69455 };
      detailReception.reception = reception;

      const receptionCollection: IReception[] = [{ id: 7298 }];
      jest.spyOn(receptionService, 'query').mockReturnValue(of(new HttpResponse({ body: receptionCollection })));
      const additionalReceptions = [reception];
      const expectedCollection: IReception[] = [...additionalReceptions, ...receptionCollection];
      jest.spyOn(receptionService, 'addReceptionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ detailReception });
      comp.ngOnInit();

      expect(receptionService.query).toHaveBeenCalled();
      expect(receptionService.addReceptionToCollectionIfMissing).toHaveBeenCalledWith(receptionCollection, ...additionalReceptions);
      expect(comp.receptionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const detailReception: IDetailReception = { id: 456 };
      const reception: IReception = { id: 33954 };
      detailReception.reception = reception;

      activatedRoute.data = of({ detailReception });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(detailReception));
      expect(comp.receptionsSharedCollection).toContain(reception);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<DetailReception>>();
      const detailReception = { id: 123 };
      jest.spyOn(detailReceptionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ detailReception });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: detailReception }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(detailReceptionService.update).toHaveBeenCalledWith(detailReception);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<DetailReception>>();
      const detailReception = new DetailReception();
      jest.spyOn(detailReceptionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ detailReception });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: detailReception }));
      saveSubject.complete();

      // THEN
      expect(detailReceptionService.create).toHaveBeenCalledWith(detailReception);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<DetailReception>>();
      const detailReception = { id: 123 };
      jest.spyOn(detailReceptionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ detailReception });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(detailReceptionService.update).toHaveBeenCalledWith(detailReception);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackReceptionById', () => {
      it('Should return tracked Reception primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackReceptionById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
