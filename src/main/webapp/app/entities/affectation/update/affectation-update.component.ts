import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IAffectation, Affectation } from '../affectation.model';
import { AffectationService } from '../service/affectation.service';
import { IArticle } from 'app/entities/article/article.model';
import { ArticleService } from 'app/entities/article/service/article.service';
import { IEmployee } from 'app/entities/employee/employee.model';
import { EmployeeService } from 'app/entities/employee/service/employee.service';

@Component({
  selector: 'jhi-affectation-update',
  templateUrl: './affectation-update.component.html',
})
export class AffectationUpdateComponent implements OnInit {
  isSaving = false;

  articlesCollection: IArticle[] = [];
  employeesSharedCollection: IEmployee[] = [];

  editForm = this.fb.group({
    id: [],
    dateAffectation: [],
    quantite: [],
    nom: [],
    prenom: [],
    createdAt: [],
    updateAt: [],
    article: [],
    employee: [],
  });

  constructor(
    protected affectationService: AffectationService,
    protected articleService: ArticleService,
    protected employeeService: EmployeeService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ affectation }) => {
      this.updateForm(affectation);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const affectation = this.createFromForm();
    if (affectation.id !== undefined) {
      this.subscribeToSaveResponse(this.affectationService.update(affectation));
    } else {
      this.subscribeToSaveResponse(this.affectationService.create(affectation));
    }
  }

  trackArticleById(index: number, item: IArticle): number {
    return item.id!;
  }

  trackEmployeeById(index: number, item: IEmployee): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAffectation>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(affectation: IAffectation): void {
    this.editForm.patchValue({
      id: affectation.id,
      dateAffectation: affectation.dateAffectation,
      quantite: affectation.quantite,
      nom: affectation.nom,
      prenom: affectation.prenom,
      createdAt: affectation.createdAt,
      updateAt: affectation.updateAt,
      article: affectation.article,
      employee: affectation.employee,
    });

    this.articlesCollection = this.articleService.addArticleToCollectionIfMissing(this.articlesCollection, affectation.article);
    this.employeesSharedCollection = this.employeeService.addEmployeeToCollectionIfMissing(
      this.employeesSharedCollection,
      affectation.employee
    );
  }

  protected loadRelationshipsOptions(): void {
    this.articleService
      .query({ filter: 'affectation-is-null' })
      .pipe(map((res: HttpResponse<IArticle[]>) => res.body ?? []))
      .pipe(
        map((articles: IArticle[]) => this.articleService.addArticleToCollectionIfMissing(articles, this.editForm.get('article')!.value))
      )
      .subscribe((articles: IArticle[]) => (this.articlesCollection = articles));

    this.employeeService
      .query()
      .pipe(map((res: HttpResponse<IEmployee[]>) => res.body ?? []))
      .pipe(
        map((employees: IEmployee[]) =>
          this.employeeService.addEmployeeToCollectionIfMissing(employees, this.editForm.get('employee')!.value)
        )
      )
      .subscribe((employees: IEmployee[]) => (this.employeesSharedCollection = employees));
  }

  protected createFromForm(): IAffectation {
    return {
      ...new Affectation(),
      id: this.editForm.get(['id'])!.value,
      dateAffectation: this.editForm.get(['dateAffectation'])!.value,
      quantite: this.editForm.get(['quantite'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      prenom: this.editForm.get(['prenom'])!.value,
      createdAt: this.editForm.get(['createdAt'])!.value,
      updateAt: this.editForm.get(['updateAt'])!.value,
      article: this.editForm.get(['article'])!.value,
      employee: this.editForm.get(['employee'])!.value,
    };
  }
}
