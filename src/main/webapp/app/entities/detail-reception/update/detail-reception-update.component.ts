import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IDetailReception, DetailReception } from '../detail-reception.model';
import { DetailReceptionService } from '../service/detail-reception.service';
import { IReception } from 'app/entities/reception/reception.model';
import { ReceptionService } from 'app/entities/reception/service/reception.service';

@Component({
  selector: 'jhi-detail-reception-update',
  templateUrl: './detail-reception-update.component.html',
})
export class DetailReceptionUpdateComponent implements OnInit {
  isSaving = false;

  receptionsSharedCollection: IReception[] = [];

  editForm = this.fb.group({
    id: [],
    caracteristique: [],
    quantiteArticle: [],
    numeroSerie: [],
    status: [],
    reception: [],
  });

  constructor(
    protected detailReceptionService: DetailReceptionService,
    protected receptionService: ReceptionService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ detailReception }) => {
      this.updateForm(detailReception);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const detailReception = this.createFromForm();
    if (detailReception.id !== undefined) {
      this.subscribeToSaveResponse(this.detailReceptionService.update(detailReception));
    } else {
      this.subscribeToSaveResponse(this.detailReceptionService.create(detailReception));
    }
  }

  trackReceptionById(index: number, item: IReception): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDetailReception>>): void {
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

  protected updateForm(detailReception: IDetailReception): void {
    this.editForm.patchValue({
      id: detailReception.id,
      caracteristique: detailReception.caracteristique,
      quantiteArticle: detailReception.quantiteArticle,
      numeroSerie: detailReception.numeroSerie,
      status: detailReception.status,
      reception: detailReception.reception,
    });

    this.receptionsSharedCollection = this.receptionService.addReceptionToCollectionIfMissing(
      this.receptionsSharedCollection,
      detailReception.reception
    );
  }

  protected loadRelationshipsOptions(): void {
    this.receptionService
      .query()
      .pipe(map((res: HttpResponse<IReception[]>) => res.body ?? []))
      .pipe(
        map((receptions: IReception[]) =>
          this.receptionService.addReceptionToCollectionIfMissing(receptions, this.editForm.get('reception')!.value)
        )
      )
      .subscribe((receptions: IReception[]) => (this.receptionsSharedCollection = receptions));
  }

  protected createFromForm(): IDetailReception {
    return {
      ...new DetailReception(),
      id: this.editForm.get(['id'])!.value,
      caracteristique: this.editForm.get(['caracteristique'])!.value,
      quantiteArticle: this.editForm.get(['quantiteArticle'])!.value,
      numeroSerie: this.editForm.get(['numeroSerie'])!.value,
      status: this.editForm.get(['status'])!.value,
      reception: this.editForm.get(['reception'])!.value,
    };
  }
}
