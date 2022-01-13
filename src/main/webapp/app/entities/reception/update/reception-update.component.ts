import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IReception, Reception } from '../reception.model';
import { ReceptionService } from '../service/reception.service';
import { IArticle } from 'app/entities/article/article.model';
import { ArticleService } from 'app/entities/article/service/article.service';
import { IEmployee } from 'app/entities/employee/employee.model';
import { EmployeeService } from 'app/entities/employee/service/employee.service';
import { IFournisseur } from 'app/entities/fournisseur/fournisseur.model';
import { FournisseurService } from 'app/entities/fournisseur/service/fournisseur.service';

@Component({
  selector: 'jhi-reception-update',
  templateUrl: './reception-update.component.html',
})
export class ReceptionUpdateComponent implements OnInit {
  isSaving = false;

  articlesSharedCollection: IArticle[] = [];
  employeesSharedCollection: IEmployee[] = [];
  fournisseursSharedCollection: IFournisseur[] = [];

  editForm = this.fb.group({
    id: [],
    numContrat: [],
    caracteristique: [],
    quantiteArticle: [],
    numeroSerie: [],
    status: [],
    dateContrat: [],
    dateReception: [],
    createdAt: [],
    updateAt: [],
    articles: [],
    employee: [],
    fournisseur: [],
  });

  constructor(
    protected receptionService: ReceptionService,
    protected articleService: ArticleService,
    protected employeeService: EmployeeService,
    protected fournisseurService: FournisseurService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reception }) => {
      this.updateForm(reception);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const reception = this.createFromForm();
    if (reception.id !== undefined) {
      this.subscribeToSaveResponse(this.receptionService.update(reception));
    } else {
      this.subscribeToSaveResponse(this.receptionService.create(reception));
    }
  }

  trackArticleById(index: number, item: IArticle): number {
    return item.id!;
  }

  trackEmployeeById(index: number, item: IEmployee): number {
    return item.id!;
  }

  trackFournisseurById(index: number, item: IFournisseur): number {
    return item.id!;
  }

  getSelectedArticle(option: IArticle, selectedVals?: IArticle[]): IArticle {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReception>>): void {
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

  protected updateForm(reception: IReception): void {
    this.editForm.patchValue({
      id: reception.id,
      numContrat: reception.numContrat,
      caracteristique: reception.caracteristique,
      quantiteArticle: reception.quantiteArticle,
      numeroSerie: reception.numeroSerie,
      status: reception.status,
      dateContrat: reception.dateContrat,
      dateReception: reception.dateReception,
      createdAt: reception.createdAt,
      updateAt: reception.updateAt,
      articles: reception.articles,
      employee: reception.employee,
      fournisseur: reception.fournisseur,
    });

    this.articlesSharedCollection = this.articleService.addArticleToCollectionIfMissing(
      this.articlesSharedCollection,
      ...(reception.articles ?? [])
    );
    this.employeesSharedCollection = this.employeeService.addEmployeeToCollectionIfMissing(
      this.employeesSharedCollection,
      reception.employee
    );
    this.fournisseursSharedCollection = this.fournisseurService.addFournisseurToCollectionIfMissing(
      this.fournisseursSharedCollection,
      reception.fournisseur
    );
  }

  protected loadRelationshipsOptions(): void {
    this.articleService
      .query()
      .pipe(map((res: HttpResponse<IArticle[]>) => res.body ?? []))
      .pipe(
        map((articles: IArticle[]) =>
          this.articleService.addArticleToCollectionIfMissing(articles, ...(this.editForm.get('articles')!.value ?? []))
        )
      )
      .subscribe((articles: IArticle[]) => (this.articlesSharedCollection = articles));

    this.employeeService
      .query()
      .pipe(map((res: HttpResponse<IEmployee[]>) => res.body ?? []))
      .pipe(
        map((employees: IEmployee[]) =>
          this.employeeService.addEmployeeToCollectionIfMissing(employees, this.editForm.get('employee')!.value)
        )
      )
      .subscribe((employees: IEmployee[]) => (this.employeesSharedCollection = employees));

    this.fournisseurService
      .query()
      .pipe(map((res: HttpResponse<IFournisseur[]>) => res.body ?? []))
      .pipe(
        map((fournisseurs: IFournisseur[]) =>
          this.fournisseurService.addFournisseurToCollectionIfMissing(fournisseurs, this.editForm.get('fournisseur')!.value)
        )
      )
      .subscribe((fournisseurs: IFournisseur[]) => (this.fournisseursSharedCollection = fournisseurs));
  }

  protected createFromForm(): IReception {
    return {
      ...new Reception(),
      id: this.editForm.get(['id'])!.value,
      numContrat: this.editForm.get(['numContrat'])!.value,
      caracteristique: this.editForm.get(['caracteristique'])!.value,
      quantiteArticle: this.editForm.get(['quantiteArticle'])!.value,
      numeroSerie: this.editForm.get(['numeroSerie'])!.value,
      status: this.editForm.get(['status'])!.value,
      dateContrat: this.editForm.get(['dateContrat'])!.value,
      dateReception: this.editForm.get(['dateReception'])!.value,
      createdAt: this.editForm.get(['createdAt'])!.value,
      updateAt: this.editForm.get(['updateAt'])!.value,
      articles: this.editForm.get(['articles'])!.value,
      employee: this.editForm.get(['employee'])!.value,
      fournisseur: this.editForm.get(['fournisseur'])!.value,
    };
  }
}
