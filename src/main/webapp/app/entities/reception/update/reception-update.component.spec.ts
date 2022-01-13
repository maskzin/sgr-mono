import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ReceptionService } from '../service/reception.service';
import { IReception, Reception } from '../reception.model';
import { IArticle } from 'app/entities/article/article.model';
import { ArticleService } from 'app/entities/article/service/article.service';
import { IEmployee } from 'app/entities/employee/employee.model';
import { EmployeeService } from 'app/entities/employee/service/employee.service';
import { IFournisseur } from 'app/entities/fournisseur/fournisseur.model';
import { FournisseurService } from 'app/entities/fournisseur/service/fournisseur.service';

import { ReceptionUpdateComponent } from './reception-update.component';

describe('Reception Management Update Component', () => {
  let comp: ReceptionUpdateComponent;
  let fixture: ComponentFixture<ReceptionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let receptionService: ReceptionService;
  let articleService: ArticleService;
  let employeeService: EmployeeService;
  let fournisseurService: FournisseurService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ReceptionUpdateComponent],
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
      .overrideTemplate(ReceptionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ReceptionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    receptionService = TestBed.inject(ReceptionService);
    articleService = TestBed.inject(ArticleService);
    employeeService = TestBed.inject(EmployeeService);
    fournisseurService = TestBed.inject(FournisseurService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Article query and add missing value', () => {
      const reception: IReception = { id: 456 };
      const articles: IArticle[] = [{ id: 3648 }];
      reception.articles = articles;

      const articleCollection: IArticle[] = [{ id: 57546 }];
      jest.spyOn(articleService, 'query').mockReturnValue(of(new HttpResponse({ body: articleCollection })));
      const additionalArticles = [...articles];
      const expectedCollection: IArticle[] = [...additionalArticles, ...articleCollection];
      jest.spyOn(articleService, 'addArticleToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ reception });
      comp.ngOnInit();

      expect(articleService.query).toHaveBeenCalled();
      expect(articleService.addArticleToCollectionIfMissing).toHaveBeenCalledWith(articleCollection, ...additionalArticles);
      expect(comp.articlesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Employee query and add missing value', () => {
      const reception: IReception = { id: 456 };
      const employee: IEmployee = { id: 57859 };
      reception.employee = employee;

      const employeeCollection: IEmployee[] = [{ id: 5209 }];
      jest.spyOn(employeeService, 'query').mockReturnValue(of(new HttpResponse({ body: employeeCollection })));
      const additionalEmployees = [employee];
      const expectedCollection: IEmployee[] = [...additionalEmployees, ...employeeCollection];
      jest.spyOn(employeeService, 'addEmployeeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ reception });
      comp.ngOnInit();

      expect(employeeService.query).toHaveBeenCalled();
      expect(employeeService.addEmployeeToCollectionIfMissing).toHaveBeenCalledWith(employeeCollection, ...additionalEmployees);
      expect(comp.employeesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Fournisseur query and add missing value', () => {
      const reception: IReception = { id: 456 };
      const fournisseur: IFournisseur = { id: 35915 };
      reception.fournisseur = fournisseur;

      const fournisseurCollection: IFournisseur[] = [{ id: 12585 }];
      jest.spyOn(fournisseurService, 'query').mockReturnValue(of(new HttpResponse({ body: fournisseurCollection })));
      const additionalFournisseurs = [fournisseur];
      const expectedCollection: IFournisseur[] = [...additionalFournisseurs, ...fournisseurCollection];
      jest.spyOn(fournisseurService, 'addFournisseurToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ reception });
      comp.ngOnInit();

      expect(fournisseurService.query).toHaveBeenCalled();
      expect(fournisseurService.addFournisseurToCollectionIfMissing).toHaveBeenCalledWith(fournisseurCollection, ...additionalFournisseurs);
      expect(comp.fournisseursSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const reception: IReception = { id: 456 };
      const articles: IArticle = { id: 60513 };
      reception.articles = [articles];
      const employee: IEmployee = { id: 45183 };
      reception.employee = employee;
      const fournisseur: IFournisseur = { id: 61658 };
      reception.fournisseur = fournisseur;

      activatedRoute.data = of({ reception });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(reception));
      expect(comp.articlesSharedCollection).toContain(articles);
      expect(comp.employeesSharedCollection).toContain(employee);
      expect(comp.fournisseursSharedCollection).toContain(fournisseur);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Reception>>();
      const reception = { id: 123 };
      jest.spyOn(receptionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reception });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: reception }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(receptionService.update).toHaveBeenCalledWith(reception);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Reception>>();
      const reception = new Reception();
      jest.spyOn(receptionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reception });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: reception }));
      saveSubject.complete();

      // THEN
      expect(receptionService.create).toHaveBeenCalledWith(reception);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Reception>>();
      const reception = { id: 123 };
      jest.spyOn(receptionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reception });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(receptionService.update).toHaveBeenCalledWith(reception);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackArticleById', () => {
      it('Should return tracked Article primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackArticleById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackEmployeeById', () => {
      it('Should return tracked Employee primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackEmployeeById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackFournisseurById', () => {
      it('Should return tracked Fournisseur primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackFournisseurById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });

  describe('Getting selected relationships', () => {
    describe('getSelectedArticle', () => {
      it('Should return option if no Article is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedArticle(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected Article for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedArticle(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this Article is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedArticle(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });
  });
});
