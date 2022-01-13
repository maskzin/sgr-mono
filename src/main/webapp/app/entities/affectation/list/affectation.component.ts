import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAffectation } from '../affectation.model';
import { AffectationService } from '../service/affectation.service';
import { AffectationDeleteDialogComponent } from '../delete/affectation-delete-dialog.component';

@Component({
  selector: 'jhi-affectation',
  templateUrl: './affectation.component.html',
})
export class AffectationComponent implements OnInit {
  affectations?: IAffectation[];
  isLoading = false;

  constructor(protected affectationService: AffectationService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.affectationService.query().subscribe({
      next: (res: HttpResponse<IAffectation[]>) => {
        this.isLoading = false;
        this.affectations = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IAffectation): number {
    return item.id!;
  }

  delete(affectation: IAffectation): void {
    const modalRef = this.modalService.open(AffectationDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.affectation = affectation;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
