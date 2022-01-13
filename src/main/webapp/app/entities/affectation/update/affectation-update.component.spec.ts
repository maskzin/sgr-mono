import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AffectationService } from '../service/affectation.service';
import { IAffectation, Affectation } from '../affectation.model';
import { IArticle } from 'app/entities/article/article.model';
import { ArticleService } from 'app/entities/article/service/article.service';
import { IEmployee } from 'app/entities/employee/employee.model';
import { EmployeeService } from 'app/entities/employee/service/employee.service';

import { AffectationUpdateComponent } from './affectation-update.component';

describe('Affectation Management Update Component', () => {
  let comp: AffectationUpdateComponent;
  let fixture: ComponentFixture<AffectationUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let affectationService: AffectationService;
  let articleService: ArticleService;
  let employeeService: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AffectationUpdateComponent],
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
      .overrideTemplate(AffectationUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AffectationUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    affectationService = TestBed.inject(AffectationService);
    articleService = TestBed.inject(ArticleService);
    employeeService = TestBed.inject(EmployeeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call article query and add missing value', () => {
      const affectation: IAffectation = { id: 456 };
      const article: IArticle = { id: 94850 };
      affectation.article = article;

      const articleCollection: IArticle[] = [{ id: 89030 }];
      jest.spyOn(articleService, 'query').mockReturnValue(of(new HttpResponse({ body: articleCollection })));
      const expectedCollection: IArticle[] = [article, ...articleCollection];
      jest.spyOn(articleService, 'addArticleToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ affectation });
      comp.ngOnInit();

      expect(articleService.query).toHaveBeenCalled();
      expect(articleService.addArticleToCollectionIfMissing).toHaveBeenCalledWith(articleCollection, article);
      expect(comp.articlesCollection).toEqual(expectedCollection);
    });

    it('Should call Employee query and add missing value', () => {
      const affectation: IAffectation = { id: 456 };
      const employee: IEmployee = { id: 10776 };
      affectation.employee = employee;

      const employeeCollection: IEmployee[] = [{ id: 40700 }];
      jest.spyOn(employeeService, 'query').mockReturnValue(of(new HttpResponse({ body: employeeCollection })));
      const additionalEmployees = [employee];
      const expectedCollection: IEmployee[] = [...additionalEmployees, ...employeeCollection];
      jest.spyOn(employeeService, 'addEmployeeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ affectation });
      comp.ngOnInit();

      expect(employeeService.query).toHaveBeenCalled();
      expect(employeeService.addEmployeeToCollectionIfMissing).toHaveBeenCalledWith(employeeCollection, ...additionalEmployees);
      expect(comp.employeesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const affectation: IAffectation = { id: 456 };
      const article: IArticle = { id: 27090 };
      affectation.article = article;
      const employee: IEmployee = { id: 81278 };
      affectation.employee = employee;

      activatedRoute.data = of({ affectation });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(affectation));
      expect(comp.articlesCollection).toContain(article);
      expect(comp.employeesSharedCollection).toContain(employee);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Affectation>>();
      const affectation = { id: 123 };
      jest.spyOn(affectationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ affectation });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: affectation }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(affectationService.update).toHaveBeenCalledWith(affectation);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Affectation>>();
      const affectation = new Affectation();
      jest.spyOn(affectationService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ affectation });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: affectation }));
      saveSubject.complete();

      // THEN
      expect(affectationService.create).toHaveBeenCalledWith(affectation);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Affectation>>();
      const affectation = { id: 123 };
      jest.spyOn(affectationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ affectation });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(affectationService.update).toHaveBeenCalledWith(affectation);
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
  });
});
