import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IDivision, Division } from '../division.model';
import { DivisionService } from '../service/division.service';

@Component({
  selector: 'jhi-division-update',
  templateUrl: './division-update.component.html',
})
export class DivisionUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nom: [],
    createdAt: [],
    updateAt: [],
  });

  constructor(protected divisionService: DivisionService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ division }) => {
      this.updateForm(division);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const division = this.createFromForm();
    if (division.id !== undefined) {
      this.subscribeToSaveResponse(this.divisionService.update(division));
    } else {
      this.subscribeToSaveResponse(this.divisionService.create(division));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDivision>>): void {
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

  protected updateForm(division: IDivision): void {
    this.editForm.patchValue({
      id: division.id,
      nom: division.nom,
      createdAt: division.createdAt,
      updateAt: division.updateAt,
    });
  }

  protected createFromForm(): IDivision {
    return {
      ...new Division(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      createdAt: this.editForm.get(['createdAt'])!.value,
      updateAt: this.editForm.get(['updateAt'])!.value,
    };
  }
}
