import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IMarque, Marque } from '../marque.model';
import { MarqueService } from '../service/marque.service';

@Component({
  selector: 'jhi-marque-update',
  templateUrl: './marque-update.component.html',
})
export class MarqueUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    libelle: [],
  });

  constructor(protected marqueService: MarqueService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ marque }) => {
      this.updateForm(marque);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const marque = this.createFromForm();
    if (marque.id !== undefined) {
      this.subscribeToSaveResponse(this.marqueService.update(marque));
    } else {
      this.subscribeToSaveResponse(this.marqueService.create(marque));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMarque>>): void {
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

  protected updateForm(marque: IMarque): void {
    this.editForm.patchValue({
      id: marque.id,
      libelle: marque.libelle,
    });
  }

  protected createFromForm(): IMarque {
    return {
      ...new Marque(),
      id: this.editForm.get(['id'])!.value,
      libelle: this.editForm.get(['libelle'])!.value,
    };
  }
}
