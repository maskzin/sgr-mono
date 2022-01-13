import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMarque } from '../marque.model';
import { MarqueService } from '../service/marque.service';
import { MarqueDeleteDialogComponent } from '../delete/marque-delete-dialog.component';

@Component({
  selector: 'jhi-marque',
  templateUrl: './marque.component.html',
})
export class MarqueComponent implements OnInit {
  marques?: IMarque[];
  isLoading = false;

  constructor(protected marqueService: MarqueService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.marqueService.query().subscribe({
      next: (res: HttpResponse<IMarque[]>) => {
        this.isLoading = false;
        this.marques = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IMarque): number {
    return item.id!;
  }

  delete(marque: IMarque): void {
    const modalRef = this.modalService.open(MarqueDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.marque = marque;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
